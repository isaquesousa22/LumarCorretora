const API_URL = "http://localhost:3000";

async function registrar() {
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const senha = document.getElementById("senha").value;
  const email = document.getElementById("email").value;
  const cpfCnpj = document.getElementById("cpfCnpj").value;
  const descricao = document.getElementById("descricao").value;

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nome, telefone, endereco, senha, email, cpfCnpj, descricao })
  });

  document.getElementById("mensagem").innerText = await res.text();
}
  const senha = document.getElementById("senha").value;
  const email = document.getElementById("email").value;
  const cpfCnpj = document.getElementById("cpfCnpj").value;
  const descricao = document.getElementById("descricao").value;

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nome, telefone, endereco, senha, email, cpfCnpj, descricao })
  });

  document.getElementById("mensagem").innerText = await res.text();
}