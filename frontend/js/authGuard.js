import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


onAuthStateChanged(auth, (user) => {


    if (!user) {
        window.location.href = "/frontend/login.html";

        return;

    }


    console.log("Usuário autenticado:", user.email);


});