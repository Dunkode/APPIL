import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebaseConfig from "../config/firebase-auth.json"

export function validateUser(email, pass) {

    return new Promise((resolve, reject) => {

        try {
            const app = initializeApp(firebaseConfig);
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, pass)
                .then((userCredencials) => {
                    resolve(userCredencials.user)
                })
                .catch((error) => {
                    console.log(error)
                    if (error.code === "auth/user-not-found")
                        reject({ "erro": "Usuário não encontrado!" })
                    else
                        reject({ "erro": "Usuário ou senha inválidos!" })
                })

        } catch (error) {
            console.log(error)
            reject({ "erro": "Erro no processamento da requisição" })
        }

    })
}

export function createUser(email, pass) {
    return new Promise((resolve, reject) => {
        try {
            const app = initializeApp(firebaseConfig)
            const auth = getAuth();

            createUserWithEmailAndPassword(auth, email, pass)
                .then(() => {
                    resolve("Usuário cadastrado com sucesso!")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode)
                    if (errorCode === "auth/invalid-email")
                        reject("E-mail inválido!")
                    else if (error.code === "auth/email-already-in-use"){
                        reject({ "erro": "Email já registrado!!" })
                            
                    } else {
                        reject("Verifique as informações inseridas e tente novamente!")
                    }
                });
        } catch (error) {
            reject(error)
        }
    })
}

export const logoff = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        console.log(auth)
        signOut(auth).then(() => {
            resolve()
        }).catch((error) => {
            reject(error)
        });

    })
}
