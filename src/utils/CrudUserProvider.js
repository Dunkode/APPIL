import { initializeApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

import firebaseConfig from "../config/firebase-auth.json"

export const createUserDocument = (userData) => {
    return new Promise( async (resolve, reject) => {
        try {
            const app = initializeApp(firebaseConfig)
            const db = getFirestore()

            const email = await setDoc(doc(db, "tblusuario", userData.email), userData)
            resolve(email) 
        } catch (error) {
            reject(error)
        }
    })
}