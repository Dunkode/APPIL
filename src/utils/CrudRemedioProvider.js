import { initializeApp } from 'firebase/app'
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, getFirestore } from 'firebase/firestore'

import firebaseConfig from "../config/firebase-auth.json"

export const createRemedio = (remedioInfo, uid) => {
    return new Promise(async (resolve, reject) => {
        try {
            initializeApp(firebaseConfig)
            const db = getFirestore()

            remedioInfo.userId = uid

            const docId = await addDoc(collection(db, "tblremedio"), remedioInfo)
            resolve(docId)
        } catch (error) {
            reject(error)
        }

    })
}

export const getRemediosByUserAndFarmacia = (idFarmacia, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let remedios = []

            initializeApp(firebaseConfig)
            const db = getFirestore()

            const q = query(collection(db, "tblremedio"), where("userId", "==", userId), where("idFarmacia", "==", idFarmacia))
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach((doc) => {
                remedios.push(doc)
            })
            resolve(remedios)
        } catch (error) {
            reject(error)
        }
    })
}