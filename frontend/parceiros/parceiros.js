import { db } from "../js/firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const cardsContainer = document.getElementById("cardsContainer");

const pesquisa = document.getElementById("pesquisa");

let parceiros = [];

async function carregarParceiros() {

    const snapshot = await getDocs(collection(db, "usuarios"));

    parceiros = [];

    snapshot.forEach(doc => {

        parceiros.push(doc.data());

    });

    mostrarParceiros();

}

function mostrarParceiros() {

    cardsContainer.innerHTML = "";

    const texto = pesquisa.value.toLowerCase();

    parceiros
    .filter(p => {

        return (

            p.nome.toLowerCase().includes(texto)

            ||

            p.endereco.toLowerCase().includes(texto)

        );

    })

    .forEach(p => {

        cardsContainer.innerHTML += `

        <div class="card bg-base-200 shadow-xl">

            <div class="card-body">

                <h2 class="card-title">

                    ${p.nome}

                </h2>

                <p>

                    📍 ${p.endereco}

                </p>

                <p>

                    📞 ${p.telefone}

                </p>

                <p>
                   <h2>Descrição:</h2>

                    ${p.descricao}

                </p>

                <div class="card-actions">

                    <button
                        class="btn  bg-gradient-to-r from-cyan-500 to-blue-500"
                        onclick="abrirMapa('${p.endereco}')">

                        Ver no mapa

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

window.abrirMapa = function(endereco){

    window.open(

        "https://www.google.com/maps/search/?api=1&query="

        + encodeURIComponent(endereco),

        "_blank"

    );

}

pesquisa.addEventListener("input", mostrarParceiros);

carregarParceiros();