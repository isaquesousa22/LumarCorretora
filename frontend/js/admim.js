import { db } from "../../js/firebase.js";

import {
    collection,
    getDocs,
    getDoc,
    updateDoc,
    doc

} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
const lista = document.getElementById("listaParceiros");

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

${dados.status}

</p>

<div class="card-actions justify-end">

<button
class="btn btn-success"
onclick="aprovar('${documento.id}')">

Aprovar

</button>

<button
class="btn btn-error"
onclick="rejeitar('${documento.id}')">

Rejeitar

</button>

</div>

</div>

</div>

`;

});

window.aprovar = async function (id) {

    try {

        const referencia = doc(db, "usuarios", id);

        const documento = await getDoc(referencia);

        const dados = documento.data();

        await updateDoc(referencia, {

            status: "aprovado"

        });

        await emailjs.send("service_uwcfqf8", "template_ewwcde6", {
            nome: dados.nome,
            to_email: dados.email,
            titulo: "Cadastro aprovado!",
            mensagem: "Seu cadastro foi aprovado. Agora você já pode acessar a plataforma."
        });

        alert("Parceiro aprovado e e-mail enviado!");

        location.reload();

    }

    catch (erro) {

        console.log(erro);

        alert("Erro ao aprovar.");

    }

}

window.rejeitar = async function (id) {

    try {

        const referencia = doc(db, "usuarios", id);

        const documento = await getDoc(referencia);

        const dados = documento.data();

        await updateDoc(referencia, {

            status: "rejeitado"

        });

        await emailjs.send("service_uwcfqf8", "template_ewwcde6", {
            nome: dados.nome,
            to_email: dados.email,
            titulo: "Cadastro não aprovado",
            mensagem: "Após análise, seu cadastro não foi aprovado. Entre em contato com a Lumar Corretora para mais informações."
        });

        alert("Parceiro rejeitado e e-mail enviado!");

        location.reload();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao rejeitar parceiro.");

    }

}