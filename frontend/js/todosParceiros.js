import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    getDocs,
    getDoc,
    doc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const tabela = document.getElementById("tabelaParceiros");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        location.href = "../login.html";
        return;
    }

    const documento = await getDoc(doc(db, "usuarios", user.uid));

    if (!documento.exists()) {
        location.href = "../login.html";
        return;
    }

    if (documento.data().tipo !== "admin") {

        await signOut(auth);

        location.href = "../login.html";

        return;

    }

    carregarParceiros();

});

async function carregarParceiros() {

    tabela.innerHTML = "";

    const consulta = await getDocs(collection(db, "usuarios"));

    consulta.forEach((usuario) => {

        const dados = usuario.data();

        let badge = "";

        switch (dados.status) {

            case "aprovado":
                badge = `<div class="badge badge-success">Aprovado</div>`;
                break;

            case "pendente":
                badge = `<div class="badge badge-warning">Pendente</div>`;
                break;

            case "rejeitado":
                badge = `<div class="badge badge-error">Rejeitado</div>`;
                break;
        }

        tabela.innerHTML += `

        <tr>

            <td>${dados.nome}</td>

            <td>${dados.email}</td>

            <td>${dados.telefone}</td>

            <td>${dados.cpfCnpj}</td>

            <td>${badge}</td>

            <td>

                ${
                    dados.status === "aprovado"
                    ? `<button
                        class="btn btn-info btn-sm"
                        onclick="resetarSenha('${dados.email}')">
                        🔑 Senha
                    </button>`
                    : ""
                }

                <button
                    class="btn btn-error btn-sm"
                    onclick="excluirParceiro('${usuario.id}')">

                    🗑 Excluir

                </button>

            </td>

        </tr>

        `;

    });

}

window.resetarSenha = async function(email){

    try{

        await sendPasswordResetEmail(auth,email);

        alert("E-mail enviado!");

    }catch(erro){

        console.log(erro);

        alert("Erro ao enviar.");

    }

}

window.excluirParceiro = async function(id){

    if(!confirm("Deseja excluir este parceiro?")) return;

    await deleteDoc(doc(db,"usuarios",id));

    alert("Parceiro excluído!");

    carregarParceiros();

}