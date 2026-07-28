import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    collection,
    getDocs,
    getDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const lista = document.getElementById("listaParceiros");

// ==============================
// VERIFICA SE É ADMIN
// ==============================

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        location.href = "../../login.html";
        return;
    }

    const documento = await getDoc(doc(db, "usuarios", user.uid));

    if (!documento.exists()) {

        await signOut(auth);

        location.href = "../../login.html";

        return;
    }

    const dados = documento.data();

    if (dados.tipo !== "admin") {

        alert("Acesso permitido apenas para administradores.");

        await signOut(auth);

        location.href = "../../login.html";

        return;
    }

    carregarParceiros();
    carregarEstatisticas();

});

// ==============================
// CARREGAR PARCEIROS PENDENTES
// ==============================

async function carregarParceiros() {

    lista.innerHTML = "";

    const consulta = await getDocs(collection(db, "usuarios"));

    consulta.forEach((documento) => {

        const dados = documento.data();

        if (dados.status !== "pendente") return;

        lista.innerHTML += `

        <div class="card bg-base-100 shadow-xl">

            <div class="card-body">

                <h2 class="card-title">
                    ${dados.nome}
                </h2>

                <p>
                    <strong>Email:</strong>
                    ${dados.email}
                </p>

                <p>
                    <strong>Telefone:</strong>
                    ${dados.telefone}
                </p>

                <p>
                    <strong>CPF/CNPJ:</strong>
                    ${dados.cpfCnpj}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="badge badge-warning">
                        ${dados.status}
                    </span>
                </p>

                <div class="card-actions justify-end mt-4">

                    <button
                        class="btn btn-success"
                        onclick="aprovar('${documento.id}')">

                        ✅ Aprovar

                    </button>

                    <button
                        class="btn btn-error"
                        onclick="rejeitar('${documento.id}')">

                        ❌ Rejeitar

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ==============================
// ESTATÍSTICAS
// ==============================

async function carregarEstatisticas() {

    const consulta = await getDocs(collection(db, "usuarios"));

    let pendentes = 0;
    let aprovados = 0;
    let rejeitados = 0;
    let total = 0;

    consulta.forEach((usuario) => {

        total++;

        const dados = usuario.data();

        if (dados.status === "pendente") pendentes++;
        if (dados.status === "aprovado") aprovados++;
        if (dados.status === "rejeitado") rejeitados++;

    });

    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("aprovados").textContent = aprovados;
    document.getElementById("rejeitados").textContent = rejeitados;
    document.getElementById("total").textContent = total;

}

// ==============================
// APROVAR
// ==============================

window.aprovar = async function (id) {

    try {

        const referencia = doc(db, "usuarios", id);

        const documento = await getDoc(referencia);

        const dados = documento.data();

        await updateDoc(referencia, {

            status: "aprovado"

        });

        await emailjs.send(

            "service_uwcfqf8",
            "template_ewwcde6",

            {

                nome: dados.nome,
                to_email: dados.email,
                titulo: "Cadastro aprovado!",
                mensagem: "Seu cadastro foi aprovado. Agora você já pode acessar a plataforma."

            }

        );

        alert("Parceiro aprovado com sucesso!");

        carregarParceiros();
        carregarEstatisticas();

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao aprovar parceiro.");

    }

};

// ==============================
// REJEITAR
// ==============================

window.rejeitar = async function (id) {

    try {

        const referencia = doc(db, "usuarios", id);

        const documento = await getDoc(referencia);

        const dados = documento.data();

        await updateDoc(referencia, {

            status: "rejeitado"

        });

        await emailjs.send(

            "service_uwcfqf8",
            "template_ewwcde6",

            {

                nome: dados.nome,
                to_email: dados.email,
                titulo: "Cadastro não aprovado",
                mensagem: "Após análise, seu cadastro não foi aprovado. Entre em contato com a Lumar Corretora para mais informações."

            }

        );

        alert("Parceiro rejeitado com sucesso!");

        carregarParceiros();
        carregarEstatisticas();

    }

    catch (erro) {

        console.error(erro);

        alert("Erro ao rejeitar parceiro.");

    }

};

// ==============================
// LOGOUT
// ==============================

window.logout = async function () {

    await signOut(auth);

    location.href = "../../login.html";

};