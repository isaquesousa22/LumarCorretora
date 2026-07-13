import { auth, db } from "./firebase.js";

import {
    updatePassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    deleteUser
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

let usuario = null;

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    usuario = user;

});

document.getElementById("formSenha").addEventListener("submit", async (e) => {

    e.preventDefault();

    const senha = document.getElementById("novaSenha").value;

    const confirmar = document.getElementById("confirmarSenha").value;

    if (senha.length < 6) {

        alert("A senha deve possuir pelo menos 6 caracteres.");

        return;

    }

    if (senha !== confirmar) {

        alert("As senhas não coincidem.");

        return;

    }

    try {

        await updatePassword(usuario, senha);

        alert("Senha alterada com sucesso!");

        window.location.href = "perfil.html";

    } catch (erro) {

        console.error(erro);

        if (erro.code === "auth/requires-recent-login") {

            alert("Por segurança, faça login novamente para alterar sua senha.");

            return;

        }

        alert("Erro ao alterar a senha.");

    }

});

document.getElementById("btnExcluir").addEventListener("click", async () => {

    const confirmar = confirm(
        "Tem certeza que deseja excluir sua conta?\n\nEsta ação não poderá ser desfeita."
    );

    if (!confirmar) return;

    try {

        
        await deleteDoc(doc(db, "usuarios", auth.currentUser.uid));

       
        await deleteUser(auth.currentUser);

        alert("Conta excluída com sucesso!");

        window.location.href = "../index.html";

    } catch (erro) {

        console.error(erro);

        if (erro.code === "auth/requires-recent-login") {

            alert(
                "Por segurança, faça login novamente antes de excluir sua conta."
            );

            return;

        }

        alert("Erro ao excluir a conta.");

    }

});