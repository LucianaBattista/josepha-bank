import React from "react";

export default function LojaPage({ aluno, setPagina }) {
  if (!aluno) {
    return <p>Aluno não encontrado. Volte e faça login novamente.</p>;
  }

  const produtos = [
    { id: 1, nome: "Caderno", preco: 20, emoji: "📒" },
    { id: 2, nome: "Lápis", preco: 2.5, emoji: "✏️" },
    { id: 3, nome: "Borracha", preco: 1.5, emoji: "🧽" },
    { id: 4, nome: "Caneta", preco: 3, emoji: "🖊️" },
  ];

  const gerarCodigoPix = (produto) => {
    const codigo = `JOSEPHA-${aluno.nome}-${produto.nome}-${produto.preco}`;

    const compra = {
      aluno: aluno.nome,
      produto: produto.nome,
      valor: produto.preco,
      codigo: codigo,
    };

    localStorage.setItem("compraPendente", JSON.stringify(compra));

    prompt("Copie seu código Pix:", codigo);

    setPagina("aluno");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff0f7",
        padding: "40px 20px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#d63384",
          fontSize: "38px",
          marginBottom: "10px",
        }}
      >
        🛍️ Loja Josepha
      </h1>

      <p
        style={{
          color: "#b03060",
          fontSize: "18px",
          marginBottom: "30px",
        }}
      >
        Escolha seu produto e gere o código Pix 💖
      </p>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "20px",
          width: "320px",
          margin: "0 auto 30px auto",
          boxShadow: "0 8px 20px rgba(214, 51, 132, 0.20)",
        }}
      >
        <h3 style={{ color: "#d63384", margin: 0 }}>
          Olá, {aluno.nome}! 💕
        </h3>

        <p style={{ color: "#555", marginBottom: 0 }}>
          Saldo atual: <strong>R$ {Number(aluno.saldo).toFixed(2)}</strong>
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              backgroundColor: "white",
              borderRadius: "25px",
              padding: "25px",
              boxShadow: "0 8px 20px rgba(214, 51, 132, 0.20)",
            }}
          >
            <div style={{ fontSize: "45px", marginBottom: "10px" }}>
              {produto.emoji}
            </div>

            <h2 style={{ color: "#d63384", marginBottom: "10px" }}>
              {produto.nome}
            </h2>

            <p
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              R$ {produto.preco.toFixed(2)}
            </p>

            <button
              onClick={() => gerarCodigoPix(produto)}
              style={{
                backgroundColor: "#ff4fa3",
                color: "white",
                border: "none",
                borderRadius: "18px",
                padding: "12px 20px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 6px 15px rgba(214, 51, 132, 0.35)",
              }}
            >
              💸 Gerar código Pix
            </button>
          </div>
        ))}
      </div>

      <br />

      <button
        onClick={() => setPagina("aluno")}
        style={{
          marginTop: "30px",
          backgroundColor: "#d63384",
          color: "white",
          border: "none",
          borderRadius: "18px",
          padding: "12px 25px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ⬅️ Voltar para minha conta
      </button>
    </div>
  );
}