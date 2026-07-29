'use strict';

const switcher = document.getElementById('themeToggle');

if (switcher) {
    switcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        if (document.body.classList.contains('dark-theme')) {
            switcher.textContent = 'Claro';
        } else {
            switcher.textContent = 'Escuro';
        }
    });
}


// FORMULÁRIO
const form = document.getElementById("formcontato");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.send(
            "service_uwcfqf8",
            "template_ilzzb1v",
            {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                mensagem: document.getElementById("mensagem").value
            }
        )

        .then(() => {

            alert("Mensagem enviada com sucesso!");
            form.reset();

        })

        .catch((erro) => {

            console.error("Erro:", erro);
            alert("Erro ao enviar mensagem");

        });

    });

}


// MENU HAMBÚRGUER
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");


if (menuToggle && menu) {

    menuToggle.addEventListener("click", () => {

        menu.classList.toggle("active");

    });

}