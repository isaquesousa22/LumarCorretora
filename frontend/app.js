'use strict';

const switcher = document.getElementById('themeToggle');

switcher.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');

  if (document.body.classList.contains('dark-theme')) {
    switcher.textContent = 'Claro';
  } else {
    switcher.textContent = 'Escuro';
  }
});


const form = document.getElementById("formcontato");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.send(
        "service_uwcfqf8",      // Service ID
        "template_ilzzb1v",      // Template ID
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

    alert(JSON.stringify(erro));

});

});