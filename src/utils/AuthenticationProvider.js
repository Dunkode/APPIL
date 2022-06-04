// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../config/firebase-auth.json"

export default function validateUser(email, pass) {

    return new Promise(() => {

        try {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, pass)
                .then((userCredencials) => {
                    resolve(userCredencials.user)
                })
                .catch((error) => {
                    if (error.code === "auth/user-not-found")
                        reject({ "erro": "Usuário não encontrado!" })
                    else
                        reject({ "erro": "Usuário ou senha inválidos!" })
                })

        } catch (error) {
            reject({ "erro": "Erro no processamento da requisição" })
        }

    })
}
