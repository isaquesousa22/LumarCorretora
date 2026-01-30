const API_URL = "http://localhost:3000";


// ================== CADASTRO ==================
async function registrar() {

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const endereco = document.getElementById("endereco").value;
  const senha = document.getElementById("senha").value;
  const email = document.getElementById("email").value;
  const cpfCnpj = document.getElementById("cpfCnpj").value;
  const descricao = document.getElementById("descricao").value;

  const mensagem = document.getElementById("mensagem");

  try {

    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome,
        telefone,
        endereco,
        senha,
        email,
        cpfCnpj,
        descricao
      })
    });

    const data = await res.json();

    if (!res.ok) {
      mensagem.innerText = data.erro;
      mensagem.className = "text-red-500";
      return;
    }

    mensagem.innerText = data.mensagem;
    mensagem.className = "text-green-500";

    document.querySelector("form").reset();

  } catch (error) {

    console.error(error);

    mensagem.innerText = "Erro ao conectar com o servidor";
    mensagem.className = "text-red-500";
  }
}


// ================== LOGIN ==================
async function logar(event) {

  event.preventDefault();

  const email = document.getElementById("emailLogin").value;
  const cpfCnpj = document.getElementById("cpfCnpjLogin").value;
  const senha = document.getElementById("senhaLogin").value;

  const mensagem = document.getElementById("mensagem");

  try {

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        cpfCnpj,
        senha
      })
    });

    const data = await res.json();

    if (!res.ok) {
      mensagem.innerText = data.erro;
      mensagem.className = "text-red-500";
      return;
    }

    mensagem.innerText = "Login realizado com sucesso!";
    mensagem.className = "text-green-500";

    console.log("Usuário:", data);

  } catch (error) {

    console.error(error);

    mensagem.innerText = "Erro ao conectar com o servidor";
    mensagem.className = "text-red-500";
  }
}
