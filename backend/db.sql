create database lumar_corretora;
use lumar_corretora;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco TEXT NOT NULL, 
    senha TEXT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpfCnpj VARCHAR(45) NOT NULL,
    descricao VARCHAR(500)
);