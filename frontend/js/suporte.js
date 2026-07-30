import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const form = document.getElementById("formSuporte");


form.addEventListener("submit", async (e) => {

    e.preventDefault();


    const chamado = {

        nome: document.getElementById("nome").value,

        email: document.getElementById("email").value,

        assunto: document.getElementById("assunto").value,

        mensagem: document.getElementById("mensagem").value,

        status: "Aberto",

        resposta: "",

        data: serverTimestamp()

    };


    try {

        await addDoc(
            collection(db, "suporte"),
            chamado
        );


        alert("Solicitação enviada com sucesso!");

        form.reset();


    } catch (error) {

        console.error(error);

        alert("Erro ao enviar solicitação");

    }


});