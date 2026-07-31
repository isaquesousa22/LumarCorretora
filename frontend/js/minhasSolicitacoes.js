import { auth, db } from "./firebase.js";

import {
    collection,
    query,
    where,
    orderBy,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


const lista = document.getElementById("listaChamados");


onAuthStateChanged(auth, async(usuario)=>{

    if(!usuario){

        location.href="login.html";

        return;

    }

    const q = query(

        collection(db,"suporte"),

        where("uid","==",usuario.uid),

        orderBy("data","desc")

    );


    const snapshot = await getDocs(q);

    if(snapshot.empty){

        lista.innerHTML=`

        <div class="alert alert-info">

            Você ainda não possui solicitações.

        </div>

        `;

        return;

    }


    snapshot.forEach((doc)=>{

        const chamado=doc.data();

        let badge="badge-error";

        if(chamado.status==="Em andamento"){

            badge="badge-warning";

        }

        if(chamado.status==="Resolvido"){

            badge="badge-success";

        }


        lista.innerHTML+=`

        <div class="card bg-base-100 shadow-xl">

            <div class="card-body">

                <div class="flex justify-between items-center">

                    <h2 class="card-title">

                        ${chamado.assunto}

                    </h2>

                    <span class="badge ${badge}">

                        ${chamado.status}

                    </span>

                </div>

                <p>

                    <strong>Mensagem enviada:</strong>

                </p>

                <p>

                    ${chamado.mensagem}

                </p>

                <div class="divider"></div>

                <p>

                    <strong>Resposta da Lumar:</strong>

                </p>

                <div class="bg-base-200 rounded-xl p-4">

                    ${chamado.resposta || "Nossa equipe ainda não respondeu sua solicitação."}

                </div>

            </div>

        </div>

        `;

    });

});