import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    verifyBeforeUpdateEmail
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

let usuario = null;

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    usuario = user;

    const documento = await getDoc(doc(db, "usuarios", user.uid));

    if (documento.exists()) {

        document.getElementById("emailAtual").value =
            documento.data().email;

    }

});

document.getElementById("formEmail").addEventListener("submit", async (e) => {

    e.preventDefault();

    const novoEmail =
        document.getElementById("novoEmail").value.trim();

    try {

        
        await verifyBeforeUpdateEmail(usuario, novoEmail);

        
        await updateDoc(doc(db, "usuarios", usuario.uid), {

            email: novoEmail

        });

        alert(
            "Enviamos um link de confirmação para o novo e-mail. Após confirmar, ele será atualizado. por favor, verifique sua caixa de entrada e spam."
        );

        window.location.href = "/frontend/profile/index.html";

    } catch (erro) {

        console.error(erro);

        switch (erro.code) {

            case "auth/requires-recent-login":

                alert("Faça login novamente para alterar o e-mail.");

                break;

            case "auth/email-already-in-use":

                alert("Este e-mail já está sendo utilizado.");

                break;

            case "auth/invalid-email":

                alert("E-mail inválido.");

                break;

            default:

                alert("Erro ao alterar o e-mail.");

        }

    }

});