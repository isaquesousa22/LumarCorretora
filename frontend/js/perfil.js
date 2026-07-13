import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href="login.html";

        return;

    }

    const documento = await getDoc(doc(db,"usuarios",user.uid));

    if(!documento.exists()){

        alert("Perfil não encontrado.");

        return;

    }

    const dados = documento.data();

    document.getElementById("nome").textContent = dados.nome;

    document.getElementById("nomeTitulo").textContent = dados.nome;

    document.getElementById("email").textContent = dados.email;

    document.getElementById("telefone").textContent = dados.telefone;

    document.getElementById("cpf").textContent = dados.cpfCnpj;

    document.getElementById("endereco").textContent = dados.endereco;

    document.getElementById("descricao").textContent = dados.descricao;

    const iniciais = dados.nome
        .split(" ")
        .map(n=>n[0])
        .join("")
        .substring(0,2)
        .toUpperCase();

    document.getElementById("iniciais").textContent = iniciais;

});