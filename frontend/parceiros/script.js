const API_URL = "http://localhost:3000/register";

document.addEventListener("DOMContentLoaded", () => {
  carregarParceiros();

  const form = document.getElementById("formregister");

  if (form) {
    form.addEventListener("submit", cadastrarParceiro);
  }
});

/* ================== CARREGAR ================== */
async function carregarParceiros() {
  const res = await fetch(API_URL);
  const parceiros = await res.json();

  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  parceiros.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <p><strong>Endereço:</strong> ${p.endereco}</p>
      <p><strong>Telefone:</strong> ${p.telefone}</p>
      <p><strong>Horário:</strong> ${p.horario}</p>
      <p>${p.descricao}</p>
      <button onclick="localizar('${p.endereco}')">📍 Mapa</button>
      <button onclick="deletar(${p.id})">🗑️ Deletar</button>
    `;

    container.appendChild(card);
  });
}

/* ================== CADASTRAR ================== */
async function cadastrarParceiro(e) {
  e.preventDefault();

  const parceiro = {
    nome: nome.value,
    telefone: telefone.value,
    endereco: endereco.value,
    horario: horario.value,
    descricao: descricao.value,
    bairro: bairro.value
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parceiro)
  });

  document.getElementById("formParceiro").reset();
  carregarParceiros();
}

/* ================== DELETAR ================== */
async function deletar(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  carregarParceiros();
}

/* ================== MAPA ================== */
function localizar(endereco) {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
  window.open(url, "_blank");
}