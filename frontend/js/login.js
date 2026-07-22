import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

window.logar = async function (event) {

    event.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value;

    const mensagem = document.getElementById("mensagem");

    try {

        // Faz o login
        const credencial = await signInWithEmailAndPassword(auth, email, senha);

        // Busca os dados do usuário no Firestore
        const documento = await getDoc(
            doc(db, "usuarios", credencial.user.uid)
        );

        if (!documento.exists()) {

            await signOut(auth);

            mensagem.innerHTML = `
                <span class="text-error">
                    Usuário não encontrado.
                </span>
            `;

            return;
        }

        const dados = documento.data();

        // Cadastro pendente
        if (dados.status === "pendente") {

            await signOut(auth);

            mensagem.innerHTML = `
                <span class="text-warning">
                    ⏳ Seu cadastro está em análise.<br>
                    Aguarde até 24 horas para aprovação.
                </span>
            `;

            return;
        }

        // Cadastro rejeitado
        if (dados.status === "rejeitado") {

            await signOut(auth);

            mensagem.innerHTML = `
                <span class="text-error">
                    ❌ Seu cadastro foi rejeitado. Verifique se já paasou as 24h ou<br>
                    Entre em contato com a Lumar Corretora.
                </span>
            `;

            return;
        }

        // Login permitido
        mensagem.innerHTML = `
            <span class="text-success">
                ✅ Login realizado com sucesso!
            </span>
        `;

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1000);

    } catch (erro) {

        console.error(erro);

        mensagem.innerHTML = `
            <span class="text-error">
                Email ou senha inválidos.
            </span>
        `;

    }

};

// =======================
// RECUPERAR SENHA
// =======================

window.recuperarSenha = async function () {

    const email = document.getElementById("emailLogin").value.trim();

    if (!email) {

        alert("Digite seu e-mail primeiro.");

        return;

    }

    try {

        await sendPasswordResetEmail(auth, email);

        alert("Enviamos um link para redefinição de senha.\n\nVerifique sua caixa de entrada e também a pasta Spam.");

    } catch (erro) {

        switch (erro.code) {

            case "auth/user-not-found":

                alert("Nenhuma conta encontrada com este e-mail.");

                break;

            case "auth/invalid-email":

                alert("E-mail inválido.");

                break;

            default:

                console.error(erro);

                alert("Erro ao enviar o e-mail de recuperação.");

        }

    }

};