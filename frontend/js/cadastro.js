import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

window.registrar = async function () {

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const cpfCnpj = document.getElementById("cpfCnpj").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    const mensagem = document.getElementById("mensagem");

    try {

        const credencial = await createUserWithEmailAndPassword(
            auth,
            email,
            senha
        );

        await setDoc(doc(db, "usuarios", credencial.user.uid), {

            nome,
            telefone,
            endereco,
            email,
            cpfCnpj,
            descricao,
            status: "pendente",
            criadoEm: serverTimestamp()

        });

        mensagem.innerHTML =
            "<span class='text-success'>Cadastro realizado com sucesso!<br>Seu cadastro será analisado em até 24 horas.</span>";

        await signOut(auth);

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2500);

    } catch (erro) {

        console.log(erro);

        mensagem.innerHTML =
            "<span class='text-error'>" + erro.message + "</span>";

    }

}