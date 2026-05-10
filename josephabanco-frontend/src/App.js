import React, { useState } from "react";
import ProfessorPage from "./ProfessorPage";
import AlunoLogin from "./AlunoLogin";
import AlunoPage from "./AlunoPage";
import LojaPage from "./LojaPage";

export default function App() {
  const alunoSalvo = localStorage.getItem("alunoLogado");

  const [pagina, setPagina] = useState(
    window.location.pathname === "/loja" ? "loja" : "inicio"
  );

  const [alunoLogado, setAlunoLogado] = useState(
    alunoSalvo ? JSON.parse(alunoSalvo) : null
  );

  const [professorLogado, setProfessorLogado] = useState(false);

  const handleLogin = (aluno) => {
    setAlunoLogado(aluno);
    localStorage.setItem("alunoLogado", JSON.stringify(aluno));
    setPagina("aluno");
    window.history.pushState({}, "", "/");
  };

  const loginProfessor = () => {
    const usuario = prompt("Usuário:");
    const senha = prompt("Senha:");

    if (usuario === "professora" && senha === "123") {
      setProfessorLogado(true);
      setPagina("professor");
      window.history.pushState({}, "", "/");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  if (pagina === "professor") {
    if (!professorLogado) {
      return <p>Acesso negado</p>;
    }
    return <ProfessorPage />;
  }

  if (pagina === "aluno") {
    return <AlunoPage aluno={alunoLogado} />;
  }

  if (pagina === "loja") {
    return <LojaPage aluno={alunoLogado} setPagina={setPagina} />
  }

  if (pagina === "login") {
    return <AlunoLogin onLogin={handleLogin} />;
  }

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#ffe6f2",
        paddingTop: "120px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          color: "#d63384",
          fontSize: "48px",
          marginBottom: "20px",
        }}
      >
        💖 Josepha Bank 💖
      </h1>

      <p
        style={{
          color: "#c2185b",
          fontSize: "22px",
          marginBottom: "30px",
        }}
      >
        Seu banco escolar inteligente ✨
      </p>

      <button
        onClick={loginProfessor}
        style={{
          backgroundColor: "#ff4fa3",
          color: "white",
          border: "none",
          borderRadius: "15px",
          padding: "15px 30px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          marginRight: "20px",
          boxShadow: "0 6px 15px rgba(214, 51, 132, 0.35)",
        }}
      >
        👩‍🏫 Sou Professor(a)
      </button>

      <button
        onClick={() => setPagina("login")}
        style={{
          backgroundColor: "#f26db3",
          color: "white",
          border: "none",
          borderRadius: "15px",
          padding: "15px 30px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(214, 51, 132, 0.35)",
        }}
      >
        👩‍🎓 Sou Aluno(a)
      </button>
    </div>
  );
}