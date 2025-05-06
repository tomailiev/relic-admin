import { collection, addDoc, getDocs, query, where, orderBy, getDoc, doc, Timestamp, setDoc, deleteDoc, updateDoc, deleteField, writeBatch, limit, WhereFilterOp, OrderByDirection } from "firebase/firestore";
import { ref, uploadBytes, deleteObject, getBlob, listAll } from "firebase/storage";
import { db, functions, storage } from './firebase-init';
import { httpsCallable } from "firebase/functions";
import { ItemTypeMap } from "../../types/DB";

function uploadDoc(data: object, col: string, id?: string, merge?: boolean) {
    return id
        ? setDoc(doc(db, col, id), data, { merge })
        : addDoc(collection(db, col), data)
}

function getLink(url: string) {
    return getBlob(ref(storage, url));
}

function uploadFile(file: Blob | Uint8Array | ArrayBuffer, path: string) {
    const pathRef = ref(storage, path)
    return uploadBytes(pathRef, file)
        .then(_snap => {
            return pathRef.fullPath;
        })
}

// function downloadDocs(col: string, condition, sorting) {
//     const q = sorting
//         ? query(collection(db, col), where(...condition), orderBy(...sorting))
//         : condition
//             ? query(collection(db, col), where(...condition))
//             : query(collection(db, col));
//     return getDocs(q)
//         .then(qSnap => {
//             const docs = [];
//             qSnap.forEach(doc => {
//                 docs.push(Object.assign({ id: doc.id }, doc.data()));
//             });
//             return docs;
//         })
// }

interface ConditionOption {
    type: 'condition',
    value: [string, WhereFilterOp, unknown]
};

interface SortingOption {
    type: 'sorting',
    value: [string, OrderByDirection]
};

interface LimitOption {
    type: 'limit',
    value: number
}


function downloadDocsV2<K extends keyof ItemTypeMap>(
    col: K, 
    options?: (ConditionOption | SortingOption | LimitOption)[]
): Promise<ItemTypeMap[K][] | null> 

function downloadDocsV2(col: string, options?: (ConditionOption | SortingOption | LimitOption)[]) {
    const queryConditions = options?.map(c => (
        c.type === 'condition'
            ? where(...c.value)
            : c.type === 'sorting'
                ? orderBy(...c.value)
                : limit(c.value)
    )) || [];
    const q = query(collection(db, col), ...queryConditions);

    return getDocs(q)
        .then((qSnap) => {
            const docs: any[] = [];
            qSnap.forEach(doc => {
                const data = doc.data();
                if (data) {
                    docs.push(Object.assign({ id: doc.id }, data));
                }
            });
            return docs.length ? docs : null;
        })
}

function downloadOneDoc<K extends keyof ItemTypeMap>(col: K, id: string): Promise<ItemTypeMap[K]>

function downloadOneDoc(col: string, id: string) {
    // REVISE!!!
    return getDoc(doc(db, col, id))
        .then(item => {
            if (!item.data()) return null;

            return Object.assign({ id: item.id }, item.data());
        })
        .catch(e => console.error(e));
}

function deleteOneDoc(collection: string, docId: string) {
    return deleteDoc(doc(db, collection, docId))
}

function deleteOneField(collection: string, docId: string, field: string) {
    return updateDoc(doc(db, collection, docId), {
        [field]: deleteField()
    });
}

function deleteDocs(col: string, condition: [string, WhereFilterOp, string]) {
    const q = condition
        ? query(collection(db, col), where(...condition))
        : query(collection(db, col));
    return getDocs(q)
        .then(qSnap => {
            const batch = writeBatch(db);
            qSnap.forEach(doc => {
                batch.delete(doc.ref);
            });
            return batch.commit();
            // return docs;
        });
}

function deleteFile(path: string) {
    return deleteObject(ref(storage, path));
}

function getFileList(path: string) {
    const listRef = ref(storage, path);
    return listAll(listRef);
}

const getVideoInfo = httpsCallable(functions, 'getVideoInfoV2');
const registerUser = httpsCallable(functions, 'registerUserV2');
const checkEmailVerificationStatus = httpsCallable(functions, 'checkEmailVerificationStatusV2');
const verifyOrReset = httpsCallable(functions, 'verifyOrResetV2');
const getMjml = httpsCallable(functions, 'getMjmlV2');
const sendCampaign = httpsCallable(functions, process.env.NODE_ENV === 'development' ? 'sendMockCampaignV2' : 'sendCampaignV2');
const acknowledgeDonor = httpsCallable(functions, process.env.NODE_ENV === 'development' ? 'acknowledgeMockDonor' : 'acknowledgeDonor');

// function analyze(eventType, eventParams) {
//     logEvent(analytics, eventType, eventParams);
// }

export {
    uploadDoc,
    getLink,
    // downloadDocs,
    downloadDocsV2,
    downloadOneDoc,
    uploadFile,
    deleteDocs,
    deleteOneDoc,
    deleteFile,
    deleteOneField,
    getFileList,
    getVideoInfo,
    Timestamp,
    registerUser,
    checkEmailVerificationStatus,
    verifyOrReset,
    getMjml,
    sendCampaign,
    acknowledgeDonor
};