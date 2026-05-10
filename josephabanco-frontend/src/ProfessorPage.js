import React, { useState, useEffect } from "react";

export default function ProfessorPage() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/alunos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Alunos do backend:", data);
        setAlunos(data);
      })
      .catch((err) => console.error("Erro ao buscar alunos:", err));
  }, []);

  function adicionarSaldo(nome, valor) {
    setAlunos((alunosAntigos) =>
      alunosAntigos.map((aluno) =>
        aluno.nome === nome
          ? { ...aluno, saldo: aluno.saldo + valor }
          : aluno
      )
    );

    fetch(`http://localhost:8000/alunos/${nome}/saldo?valor=${valor}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => console.log("Saldo atualizado no backend:", data))
      .catch((err) => console.error("Erro ao atualizar saldo:", err));
  }

  return (
    <div style={{ 
      textAlign: "center", 
      padding: "40px",
      minHeight: "100vh",
      backgroundColor: "#fff0f7",
      fontFamily: "Arial"
     }}
    >   
      
      <h1
  style={{
    color: "#d63384",
    fontSize: "42px",
  }}
>
  💖 Josepha Bank Professor
</h1>

<p
  style={{
    color: "#ff4fa3",
    fontSize: "18px",
  }}
>
  Gerencie os saldos dos alunos ✨
</p>

      <p>Aqui você poderá visualizar os alunos e adicionar saldo.</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {alunos.map((aluno) => (
          <li key={aluno.nome} style={{ marginBottom: "15px" }}>
            <strong>{aluno.nome}</strong> - Saldo: R$ {aluno.saldo.toFixed(2)}
            <button
              onClick={() => adicionarSaldo(aluno.nome, 10)}
              style={{ marginLeft: "10px", padding: "5px 10px" }}
            >
              Adicionar R$10
            </button>
          </li>
        ))}
      </ul>
      <br /><br />

<button
  onClick={() => {
    window.location.href = "/";
  }}
  style={{
    backgroundColor: "#ff9acb",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "10px 25px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  🚪 Sair da conta
</button>
    </div>
  );
}