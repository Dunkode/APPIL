import { initializeApp } from 'firebase/app'
import { collection, addDoc, getDocs, query, where, getFirestore, updateDoc, doc, deleteDoc } from 'firebase/firestore'

import firebaseConfig from "../config/firebase-auth.json"

export const saveRemedio = (remedioInfo, uid) => {
    return new Promise(async (resolve, reject) => {
        try {

            initializeApp(firebaseConfig)
            const db = getFirestore()
            
            if (remedioInfo.id) {

                const dados = {
                    id: remedioInfo.id,
                    nomeGenerico: remedioInfo.nomeGenerico,
                    nomeComercial: remedioInfo.nomeComercial,
                    valor: remedioInfo.valor,
                    quantidade: remedioInfo.quantidade,
                    promocao: remedioInfo.promocao,
                    farmacia: remedioInfo.farmacia,
                    idFarmacia: remedioInfo.idFarmacia
                }

                const docId = await updateDoc(doc(db, "tblremedio", remedioInfo.id), dados)
                resolve(docId)
            } else {
                remedioInfo.userId = uid

                const docId = await addDoc(collection(db, "tblremedio"), remedioInfo)
                await updateDoc(doc(db, "tblremedio", docId.id), { id: docId.id })
                resolve(docId)

            }
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

export const getRemediosByUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let remedios = []

            initializeApp(firebaseConfig)
            const db = getFirestore()

            const q = query(collection(db, "tblremedio"), where("userId", "==", userId))
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach((docs) => {
                remedios.push(docs.data())
            })
            resolve(remedios)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteRemedio = (remedio) => {
    return new Promise(async (resolve, reject) => {
        try {
            initializeApp(firebaseConfig)
            const db = getFirestore()

            const docId = await deleteDoc(doc(db, "tblremedio", remedio.id))
            resolve(docId)
        } catch (error) {
            reject(error)
        }

    })
}