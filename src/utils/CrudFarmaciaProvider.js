import { initializeApp } from 'firebase/app'
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, getFirestore, setDoc } from 'firebase/firestore'

import firebaseConfig from "../config/firebase-auth.json"

export const createFarmacia = (farmaciaData) => {
    return new Promise (async (resolve, reject) => {
        try {
            initializeApp(firebaseConfig)
            const db = getFirestore()
            const farmacia = await addDoc(collection(db, "tblfarmacia"), farmaciaData)
            resolve(farmacia) 
        } catch (error) {
            reject(error)
        }
    })
}

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