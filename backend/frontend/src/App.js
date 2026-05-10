import React, { useState } from "react";
import TeacherDashboard from "./TeacherDashboard";
import AlunoLogin from "./LoginPage";
import AlunoPage from "./AlunoPage";
import LojaPage from "./LojaPage.js";

export default function App() {
  const [pagina, setPagina] = useState("inicio");
  const [alunoLogado, setAlunoLogado] = useState(null);
  const [professorLogado, setProfessorLogado] = useState(false);

  const handleLogin = (aluno) => {
    setAlunoLogado(aluno);
    setPagina("aluno");
  };

  const loginProfessor = () => {
    const usuario = prompt("Usuário:");
    const senha = prompt("Senha:");

    if (usuario === "professora" && senha === "1234") {
      setProfessorLogado(true);
      setPagina("professor");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  const handleCompra = (produto) => {
    if (!alunoLogado || alunoLogado.saldo < produto.preco) {
      alert("Saldo insuficiente para comprar " + produto.nome);
      return;
    }

    const novoSaldo = alunoLogado.saldo - produto.preco;
    const alunoAtualizado = { ...alunoLogado, saldo: novoSaldo };
    setAlunoLogado(alunoAtualizado);

    fetch(`http://localhost:8000/alunos/${alunoLogado.nome}/saldo?valor=-${produto.preco}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log("Compra registrada:", data))
      .catch((err) => console.error("Erro ao registrar compra:", err));
  };

  if (pagina === "professor") {
    if (!professorLogado) {
      return <p>Acesso negado</p>;
    }

    return <TeacherDashboard />;
  }

  if (pagina === "aluno") {
    return (
      <>
        <AlunoPage aluno={alunoLogado} />
        <button onClick={() => setPagina("loja")}>Ir para a loja</button>
      </>
    );
  }

  if (pagina === "loja") {
    return <LojaPage aluno={alunoLogado} handleCompra={handleCompra} />;
  }

  if (pagina === "login") {
    return <AlunoLogin onLogin={handleLogin} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-vinda ao Josepha Bank!</h1>
      <button onClick={loginProfessor}>Sou Professor(a)</button>
      <button onClick={() => setPagina("login")}>Sou Aluno(a)</button>
    </div>
  );
}