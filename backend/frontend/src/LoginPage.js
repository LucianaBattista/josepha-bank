import React, { useState } from "react";

export default function AlunoLogin({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = () => {
    fetch(`http://localhost:8000/login?usuario=${usuario}&senha=${senha}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          alert(data.erro);
        } else {
          onLogin(data);
        }
      })
      .catch((err) => {
        console.error("Erro no login:", err);
        alert("Erro ao conectar com o servidor.");
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login do Aluno</h2>

      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />

      <button onClick={fazerLogin}>Entrar</button>
    </div>
  );
}