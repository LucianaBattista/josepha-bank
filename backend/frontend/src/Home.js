import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🏦 Josepha Bank</h1>
      <p>Bem-vindo(a) ao banco escolar!</p>

      <div>
        <Link to="/professor">
          <button>Sou Professor(a)</button>
        </Link>
        <Link to="/aluno">
          <button>Sou Aluno(a)</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

