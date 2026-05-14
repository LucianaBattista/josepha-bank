from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import certifi
from pydantic import BaseModel

app = FastAPI()

MONGO_URL = "mongodb+srv://josephabank:josepha2026@cluster0.qol7ke8.mongodb.net/?appName=Cluster0"

client = MongoClient(
    MONGO_URL,
    tls=True,
    tlsCAFile=certifi.where()
)
db = client["josepha_bank"]
colecao_alunos = db["alunos"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

if colecao_alunos.count_documents({}) == 0:
    colecao_alunos.insert_many([
        {"nome": "João", "saldo": 100.0, "usuario": "joao", "senha": "123"},
        {"nome": "Maria", "saldo": 200.0, "usuario": "maria", "senha": "123"},
    ])

colecao_alunos.update_one(
    {"nome": "João"},
    {"$set": {"usuario": "joao", "senha": "123"}}
)

colecao_alunos.update_one(
    {"nome": "Maria"},
    {"$set": {"usuario": "maria", "senha": "123"}}
)


class LoginData(BaseModel):
    usuario: str
    senha: str


class PixData(BaseModel):
    nome: str
    valor: float


@app.get("/alunos")
def listar_alunos():
    alunos = list(colecao_alunos.find({}, {"_id": 0}))
    return alunos


@app.post("/alunos/{nome}/saldo")
def adicionar_saldo(nome: str, valor: float):
    resultado = colecao_alunos.update_one(
        {"nome": nome},
        {"$inc": {"saldo": valor}}
    )

    if resultado.modified_count > 0:
        aluno = colecao_alunos.find_one({"nome": nome}, {"_id": 0})
        return {"mensagem": "Saldo atualizado com sucesso", "aluno": aluno}

    return {"erro": "Aluno não encontrado"}


@app.post("/login")
def login(dados: LoginData):
    aluno = colecao_alunos.find_one({
        "usuario": dados.usuario,
        "senha": dados.senha
    }, {"_id": 0})

    if aluno:
        return aluno

    return {"erro": "Usuário ou senha inválidos"}


@app.post("/pix")
def fazer_pix(dados: PixData):
    aluno = colecao_alunos.find_one({"nome": dados.nome}, {"_id": 0})

    if not aluno:
        return {"erro": "Aluno não encontrado"}

    if aluno["saldo"] < dados.valor:
        return {"erro": "Saldo insuficiente"}

    colecao_alunos.update_one(
        {"nome": dados.nome},
        {"$inc": {"saldo": -dados.valor}}
    )

    aluno_atualizado = colecao_alunos.find_one({"nome": dados.nome}, {"_id": 0})

    return {
        "mensagem": "Pix realizado com sucesso",
        "aluno": aluno_atualizado
    }