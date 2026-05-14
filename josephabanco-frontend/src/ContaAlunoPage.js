// src/ContaAlunoPage.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ContaAlunoPage() {
  const location = useLocation();
  const nomeAluno = location.state?.nomeAluno;
  const [aluno, setAluno] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!nomeAluno) {
      setErro("Nome do aluno não fornecido.");
      return;
    }

    fetch(`https://josepha-bank.onrender.com/aluno/${nomeAluno}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          setErro(data.erro);
        } else {
          setAluno(data);
        }
      })
      .catch(() => setErro("Erro ao conectar com o servidor."));
  }, [nomeAluno]);

  if (erro) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        <h2>{erro}</h2>
        <p>Volte para a tela inicial e tente novamente.</p>
      </div>
    );
  }

  if (!aluno) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Carregando...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bem-vindo(a), {aluno.nome}!</h2>
      <p>Seu saldo atual é:</p>
      <h3 style={{ fontSize: "24px", color: "green" }}>R$ {aluno.saldo.toFixed(2)}</h3>
    </div>
  );
}
