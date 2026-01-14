import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/", async (_, res) => {
  try {
    const [data] = await db.query("SELECT * FROM usuarios");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar usuários");
  }
});


app.post("/register", async (req, res) => {
  const { nome, telefone, endereco, senha, email, cpfCnpj, descricao } = req.body;

  try {

    const senhaCriptografada = await bcrypt.hash(senha, 10);

 
    const sql = `
      INSERT INTO usuarios (nome, telefone, endereco, senha, email, "cpfCnpj", descricao)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [data] = await db.query(sql, [
      nome,
      telefone,
      endereco,
      senhaCriptografada,
      email,
      cpfCnpj,
      descricao
    ]);

  
    if (!data) throw new Error("Erro ao inserir dados");

    return res.status(201).json({ mensagem: "Empresa cadastrada com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao processar cadastro");
  }
});


app.post("/login", async (req, res) => {
  const { email, cpfCnpj, senha } = req.body;

  try {
    const sql = "SELECT * FROM usuarios WHERE email = ? AND `cpf/cnpj` = ?";
    const [result] = await db.query(sql, [email, cpfCnpj]);
    if (result.length === 0)
      return res.status(400).json({ erro: "Usuário não encontrado" });

    const user = result[0];

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta)
      return res.status(401).json({ erro: "Senha incorreta" });


    // 🔥 devolve dados do usuário (sem senha)
    return res.json({
      id: user.id,
      nome: user.nome,
      telefone: user.telefone,
      email: user.email,
      endereco: user.endereco,
      cpfCnpj: user.cpfCnpj,
      descricao: user.descricao
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao processar login" });
  }
});

app.put("/editar_usuario", async (req, res) => {
  const { id, nome, telefone, endereco, descricao } = req.body;

  if (!id) {
    return res.status(400).send("ID do usuário é obrigatório");
  }

  try {
    const sql = `
      UPDATE usuarios
      SET nome = ?, telefone = ?, endereco = ?, descricao = ?
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [nome, telefone, endereco, descricao, id]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Usuário não encontrado");
    }

    return res.status(200).send("Usuário atualizado com sucesso");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro ao atualizar usuário");
  }
});


app.put("/update-password", async (req, res) => {
  const { email, senhaAtual, novaSenha } = req.body;

  try {
    //  Busca o usuário
    const sql = "SELECT senha FROM usuarios WHERE email = ?";
    const [result] = await db.query(sql, [email]);

    if (result.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    const hashAtual = result[0].senha;

    //  Compara senha atual
    const confereSenha = await bcrypt.compare(senhaAtual, hashAtual);
    if (!confereSenha)
      return res.status(401).json({ erro: "Senha atual incorreta" });

    //  Criptografa nova senha
    const novaHash = await bcrypt.hash(novaSenha, 10);

    //  Atualiza no MySQL
    const sqlUpdate = `
      UPDATE usuarios
      SET senha = ?
      WHERE email = ?
    `;
    await db.query(sqlUpdate, [novaHash, email]);

    return res.json({ mensagem: "Senha atualizada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao alterar a senha" });
  }
});



app.listen(3001, () =>
  console.log("🚀 Servidor rodando em http://localhost:3000")
);