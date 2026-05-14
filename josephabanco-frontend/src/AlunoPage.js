import React, { useState } from "react";

export default function AlunoPage({ aluno }) {
  const [codigoPix, setCodigoPix] = useState("");

  if (!aluno) {
    return <p>Aluno não encontrado.</p>;
  }

  const alunoSalvo = JSON.parse(localStorage.getItem("alunoLogado"));
const alunoAtual = alunoSalvo || aluno;
const saldo = Number(alunoAtual.saldo || 0);

  const irParaLoja = () => {
  localStorage.setItem("alunoLogado", JSON.stringify(aluno));
  window.location.href = "/loja";
};

const fazerPix = async () => {
  if (codigoPix.trim() === "") {
    alert("Cole o código Pix antes de pagar.");
    return;
  }

  const partes = codigoPix.split("-");
  const valor = Number(partes[partes.length - 1]);

  if (isNaN(valor) || valor <= 0) {
    alert("Código Pix inválido.");
    return;
  }

  try {
    const resposta = await fetch("https://josepha-bank.onrender.com/pix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: alunoAtual.nome,
        valor: valor,
      }),
    });

    const dados = await resposta.json();

    if (dados.erro) {
      alert(dados.erro);
      return;
    }

    localStorage.setItem(
      "alunoLogado",
      JSON.stringify(dados.aluno)
    );

    alert("Pix realizado com sucesso! 💖");

   window.history.pushState({}, "", "/");
window.location.reload(); 

  } catch (erro) {
    console.error(erro);
    alert("Erro ao conectar com o servidor.");
  }
};

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#fff0f7",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "#ff4fa3",
          color: "white",
          width: "330px",
          margin: "0 auto",
          padding: "30px",
          borderRadius: "25px",
          textAlign: "left",
          boxShadow: "0 10px 25px rgba(214, 51, 132, 0.35)",
        }}
      >
        <p>Josepha Bank 💖</p>

        <h2>{alunoAtual.nome}</h2>

        <h1 style={{ marginTop: "25px" }}>
          R$ {saldo.toFixed(2)}
        </h1>

        <p>Saldo disponível</p>
      </div>

      <br />

      <button
        onClick={irParaLoja}
        style={{
          backgroundColor: "#ff4fa3",
          color: "white",
          border: "none",
          borderRadius: "20px",
          padding: "12px 30px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(214, 51, 132, 0.35)",
        }}
      >
        🛍️ Ir para loja
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Cole o código Pix aqui"
        value={codigoPix}
        onChange={(e) => setCodigoPix(e.target.value)}
        style={{
          padding: "12px",
          width: "250px",
          borderRadius: "12px",
          border: "2px solid #ff9acb",
          textAlign: "center",
        }}
      />

      <br /><br />

      <button
        onClick={fazerPix}
        style={{
          backgroundColor: "#d63384",
          color: "white",
          border: "none",
          borderRadius: "20px",
          padding: "12px 30px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(214, 51, 132, 0.35)",
        }}
      >
        💸 Fazer Pix
      </button>
      <br /><br />

<button
  onClick={() => {
    localStorage.removeItem("alunoLogado");
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
