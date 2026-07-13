import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href="login.html";

        return;

    }

    const documento = await getDoc(doc(db,"usuarios",user.uid));

    if(documento.exists()){

        document.getElementById("nomeUsuario").textContent =
        documento.data().nome;

    }

});