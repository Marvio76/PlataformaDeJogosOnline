const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");

// ... o resto do código até o final igual ao que você postou

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://Marvio00:40028922mA$@cluster0.9ydcy8t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
let db, usersCollection, termosCollection, resultadosCollection;

client.connect().then(() => {
    db = client.db("meuBanco");
    usersCollection = db.collection("usuarios");
    termosCollection = db.collection("termos");
    resultadosCollection = db.collection("resultados");
    console.log("✅ Backend conectado ao MongoDB");
});

// Alteração de Senha
app.put("/usuarios/:email/senha", async (req, res) => {
    const { email } = req.params;
    const { novaSenha } = req.body;
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    const resultado = await usersCollection.updateOne(
        { email },
        { $set: { senha: senhaCriptografada } }
    );
    if (resultado.modifiedCount > 0) {
        res.json({ mensagem: "Senha alterada com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Usuário não encontrado." });
    }
});

// Cadastro de Termos
app.post("/termos", async (req, res) => {
    const { termo, definicao } = req.body;
    await termosCollection.insertOne({ termo, definicao });
    res.status(201).json({ mensagem: "Termo cadastrado!" });
});

// Listar Termos
app.get("/termos", async (req, res) => {
    const termos = await termosCollection.find().toArray();
    res.json(termos);
});

// Jogos
app.get("/jogos/memoria", async (req, res) => {
    const termos = await termosCollection.find().toArray();
    const pares = termos.map(item => ({ termo: item.termo, definicao: item.definicao }));
    res.json(pares);
});

app.get("/jogos/associacao", async (req, res) => {
    const termos = await termosCollection.find().toArray();
    res.json(termos);
});

app.get("/jogos/quiz", async (req, res) => {
    const termos = await termosCollection.find().toArray();
    const perguntas = termos.map(item => ({
        pergunta: item.termo,
        alternativas: termos
            .map(t => t.definicao)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4),
        respostaCorreta: item.definicao
    }));
    res.json(perguntas);
});

// Compartilhamento de Jogo (gerando código simples)
app.get("/compartilhar/:tipoJogo", (req, res) => {
    const codigo = Math.random().toString(36).substring(2, 8);
    res.json({ codigo, mensagem: "Jogo compartilhado!" });
});

// Registro de Resultado
app.post("/resultados", async (req, res) => {
    const resultado = req.body;
    await resultadosCollection.insertOne({ ...resultado, data: new Date() });
    res.status(201).json({ mensagem: "Resultado salvo!" });
});

app.get("/resultados", async (req, res) => {
    const resultados = await resultadosCollection.find().toArray();
    res.json(resultados);
});

app.listen(port, () => {
    console.log(`🚀 Backend rodando em http://localhost:${port}`);
});
