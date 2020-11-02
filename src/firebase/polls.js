import {firestore} from "./config";

export const createPoll = (poll)=>{
    const docRef = firestore.doc(`/polls/${poll.id}`);
    return docRef.set(poll);
}

export const updatePoll = (poll)=>{
    const docRef = firestore.doc(`/polls/${poll.id}`);
    return docRef.update(poll);
}