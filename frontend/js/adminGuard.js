import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {

    console.log("USER:", user);

    if (!user) {
        window.location.href = "/frontend/login.html";
        return;
    }

    try {

        const usuarioRef = doc(db, "usuarios", user.uid);

        const usuarioSnap = await getDoc(usuarioRef);


        if (!usuarioSnap.exists()) {

            console.log("Usuário não existe no Firestore");

            window.location.href = "/frontend/403.html";
            return;

        }


        const dados = usuarioSnap.data();

        console.log("Dados:", dados);
        console.log("Tipo:", dados.tipo);


        if (dados.tipo !== "admin") {

            console.log("Usuário não é admin");

            window.location.href = "/frontend/403.html";
            return;

        } else {
    console.log("Administrador autorizado");
}


    } catch (error) {

        console.error("Erro ao verificar administrador:", error);

        window.location.href = "/frontend/403.html";

    }

});