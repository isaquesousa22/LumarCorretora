import { auth } from "./firebase.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

window.sair = async () => {

    await signOut(auth);

    window.location.href = "login.html";

}