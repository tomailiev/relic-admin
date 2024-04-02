import { collection, addDoc, getDocs, query, where, orderBy, getDoc, doc, Timestamp, setDoc, deleteDoc, updateDoc, deleteField, writeBatch } from "firebase/firestore";
import { ref, uploadBytes, deleteObject, getBlob, listAll } from "firebase/storage";
import { db, functions, storage } from './firebase-init';
import { httpsCallable } from "firebase/functions";

function uploadDoc(data, col, id, merge) {
    return id
        ? setDoc(doc(db, col, id), data, { merge })
        // .then(docRef => console.log("Document written with ID: ", docRef.id))
        // .catch(e => console.error("Error adding document: ", e))
        : addDoc(collection(db, col), data)
}

function getLink(url) {
    // return getDownloadURL(ref(storage, url));
    return getBlob(ref(storage, url));
}

function uploadFile(file, path) {
    const pathRef = ref(storage, path)
    return uploadBytes(pathRef, file)
        .then(snap => {
            console.log(snap);
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

function downloadOneDoc(col, id) {
    // REVISE!!!
    return getDoc(doc(db, col, id))
        .then(item => {
            if (!item) console.log('Problem loading');
            return Object.assign({ id: item.id }, item.data());
        })
        .catch(_e => console.error('no data'));
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