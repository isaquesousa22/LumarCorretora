import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


const tabela = document.getElementById("listaChamados");

const q = query(
    collection(db, "suporte"),
    orderBy("data", "desc")
);

const snapshot = await getDocs(q);

snapshot.forEach((doc) => {

    const chamado = doc.data();

    tabela.innerHTML += `
        <tr>

            <td>${chamado.nome}</td>

            <td>${chamado.assunto}</td>

            <td>

                <span class="badge badge-primary">

                    ${chamado.status}

                </span>

            </td>

            <td>

                ${chamado.data?.toDate().toLocaleDateString("pt-BR") ?? "-"}

            </td>

            <td>

                <button
                    class="btn btn-sm btn-primary"
                    onclick="location.href='/frontend/admim/visualizarChamado.html?id=${doc.id}'">

                    Ver

                </button>

            </td>

        </tr>
    `;

});