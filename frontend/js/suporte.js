import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form = document.getElementById("formSuporte");

onAuthStateChanged(auth, (usuario) => {

    if (!usuario) {
        location.href = "login.html";
        return;
    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const chamado = {

            uid: usuario.uid,
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            assunto: document.getElementById("assunto").value,
            mensagem: document.getElementById("mensagem").value,
            status: "Aberto",

            resposta: "",

            data: serverTimestamp()

        };

        try {

            await addDoc(collection(db, "suporte"), chamado);

            alert("Solicitação enviada com sucesso!");

            form.reset();

        } catch (erro) {

            console.error(erro);

            alert("Erro ao enviar solicitação.");

        }

    });

});