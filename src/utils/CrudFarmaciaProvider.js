import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

import firebaseConfig from "../config/firebase-auth.json"

export const getAllFarmacias = () =>{
    return new Promise ( async (resolve, reject) => {
        try {
            let farmacias = []
            initializeApp(firebaseConfig)
            const db = getFirestore()
            const querySnapshot = await getDocs(collection(db, "tblfarmacia"))

            querySnapshot.forEach((doc) => {
                farmacias.push(doc)
            })

            resolve(farmacias)
        } catch (error) {
            reject(error)
        }
    })
}