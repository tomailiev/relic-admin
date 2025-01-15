import { collection, addDoc, getDocs, query, where, orderBy, getDoc, doc, Timestamp, setDoc, deleteDoc, updateDoc, deleteField, writeBatch, limit } from "firebase/firestore";
import { ref, uploadBytes, deleteObject, getBlob, listAll } from "firebase/storage";
import { db, functions, storage } from './firebase-init';
import { httpsCallable } from "firebase/functions";

function uploadDoc(data, col, id, merge) {
    return id
        ? setDoc(doc(db, col, id), data, { merge })
        : addDoc(collection(db, col), data)
}

function getLink(url) {
    return getBlob(ref(storage, url));
}

function uploadFile(file, path) {
    const pathRef = ref(storage, path)
    return uploadBytes(pathRef, file)
        .then(_snap => {
            return pathRef.fullPath;
        })
}

function downloadDocs(col, condition, sorting) {
    const q = sorting
        ? query(collection(db, col), where(...condition), orderBy(...sorting))
        : condition
            ? query(collection(db, col), where(...condition))
            : query(collection(db, col));
    return getDocs(q)
        .then(qSnap => {
            const docs = [];
            qSnap.forEach(doc => {
                docs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return docs;
        })
}

function downloadDocsV2(col, options = []) {
    const queryConditions = options?.map(c => (
        c.type === 'condition'
            ? where(...c.value)
            : c.type === 'sorting'
                ? orderBy(...c.value)
                : limit(...c.value)
    ));
    const q = query(collection(db, col), ...queryConditions);

    return getDocs(q)
        .then(qSnap => {
            const docs = [];
            qSnap.forEach(doc => {
                docs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return docs;
        })
}

function downloadOneDoc(col, id) {
    // REVISE!!!
    return getDoc(doc(db, col, id))
        .then(item => {
            if (!item.data()) return null;

            return Object.assign({ id: item.id }, item.data());
        })
        .catch(e => console.error(e));
}

function deleteOneDoc(collection, docId) {
    return deleteDoc(doc(db, collection, docId))
}

function deleteOneField(collection, docId, field) {
    return updateDoc(doc(db, collection, docId), {
        [field]: deleteField()
    });
}

function deleteDocs(col, condition) {
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

function deleteFile(path) {
    return deleteObject(ref(storage, path));
}

function getFileList(path) {
    const listRef = ref(storage, path);
    return listAll(listRef);
}

const getVideoInfo = httpsCallable(functions, 'getVideoInfoV2');
const registerUser = httpsCallable(functions, 'registerUserV2');
const checkEmailVerificationStatus = httpsCallable(functions, 'checkEmailVerificationStatusV2');
const verifyOrReset = httpsCallable(functions, 'verifyOrResetV2');
const getMjml = httpsCallable(functions, 'getMjmlV2');
const sendCampaign = httpsCallable(functions, 'sendCampaignV2');
const acknowledgeDonor = httpsCallable(functions, 'acknowledgeDonor');

// function analyze(eventType, eventParams) {
//     logEvent(analytics, eventType, eventParams);
// }

export {
    uploadDoc,
    getLink,
    downloadDocs,
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