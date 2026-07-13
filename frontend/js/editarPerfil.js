import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

let uid = "";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    uid = user.uid;

    const documento = await getDoc(doc(db, "usuarios", uid));

    if (!documento.exists()) {

        alert("Perfil não encontrado.");

        return;

    }

    const dados = documento.data();

    document.getElementById("nome").value = dados.nome;
    document.getElementById("email").value = dados.email;
    document.getElementById("telefone").value = dados.telefone;
    document.getElementById("cpf").value = dados.cpfCnpj;
    document.getElementById("endereco").value = dados.endereco;
    document.getElementById("descricao").value = dados.descricao;

});

document.getElementById("formEditar").addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await updateDoc(doc(db, "usuarios", uid), {

            nome: document.getElementById("nome").value.trim(),

            telefone: document.getElementById("telefone").value.trim(),

            endereco: document.getElementById("endereco").value.trim(),

            descricao: document.getElementById("descricao").value.trim()

        });

        alert("Perfil atualizado com sucesso!");

        window.location.href = "/frontend/dashboard.html";

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar o perfil.");

    }

});