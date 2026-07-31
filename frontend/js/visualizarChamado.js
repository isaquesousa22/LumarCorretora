import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const ref = doc(db, "suporte", id);

const snap = await getDoc(ref);

const chamado = snap.data();


document.getElementById("nome").textContent = chamado.nome;
document.getElementById("email").textContent = chamado.email;
document.getElementById("assunto").textContent = chamado.assunto;
document.getElementById("mensagem").textContent = chamado.mensagem;
document.getElementById("status").textContent = chamado.status;
document.getElementById("resposta").value = chamado.resposta || "";


document.getElementById("statusSelect").value = chamado.status;

document.getElementById("salvar").onclick = async () => {

    await updateDoc(ref, {

        resposta: document.getElementById("resposta").value,

        status: document.getElementById("statusSelect").value

    });

    alert("Atendimento atualizado com sucesso!");

};
