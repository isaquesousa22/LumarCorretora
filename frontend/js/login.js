import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

window.logar = async function (event) {

    event.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const senha = document.getElementById("senhaLogin").value;

    const mensagem = document.getElementById("mensagem");

    try {

        await signInWithEmailAndPassword(auth, email, senha);

        mensagem.innerHTML =
            "<span class='text-success'>Login realizado!</span>";

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1000);

    } catch (erro) {

        mensagem.innerHTML =
            "<span class='text-error'>Email ou senha inválidos.</span>";

    }

}

window.recuperarSenha = async function () {

    const email = document.getElementById("emailLogin").value.trim();

    if (!email) {
        alert("Digite seu e-mail primeiro.");
        return;
    }

    try {

        await sendPasswordResetEmail(auth, email);

        alert("Enviamos um link para redefinição de senha para seu e-mail.");

    } catch (erro) {

        switch (erro.code) {

            case "auth/user-not-found":
                alert("Nenhuma conta encontrada com este e-mail.");
                break;

            case "auth/invalid-email":
                alert("E-mail inválido.");
                break;

            default:
                alert("Erro ao enviar o e-mail de recuperação.");
                console.error(erro);

        }

    }

}