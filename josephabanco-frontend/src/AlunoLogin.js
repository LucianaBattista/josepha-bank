import React, { useState } from "react";

export default function AlunoLogin({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = () => {
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: usuario,
        senha: senha
      })
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
        alert("Erro ao conectar com o servidor");
      });
  };

  return (
  <div
    style={{
      backgroundColor: "#fff0f6",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "25px",
        boxShadow: "0 8px 20px rgba(214, 51, 132, 0.25)",
        textAlign: "center",
        width: "320px"
      }}
    >
      <h1
        style={{
          color: "#d63384",
          marginBottom: "10px"
        }}
      >
        💖 Josepha Bank
      </h1>

      <p
        style={{
          color: "#cc5c99",
          marginBottom: "30px"
        }}
      >
        Login do aluno
      </p>

      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "12px",
          border: "2px solid #ffd6e7",
          fontSize: "16px"
        }}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "12px",
          border: "2px solid #ffd6e7",
          fontSize: "16px"
        }}
      />

      <button
        onClick={fazerLogin}
        style={{
          backgroundColor: "#ff4fa3",
          color: "white",
          border: "none",
          borderRadius: "15px",
          padding: "12px 25px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(214, 51, 132, 0.35)"
        }}
      >
        Entrar
      </button>
    </div>
  </div>
  );
}

