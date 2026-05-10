import React from "react";

function TeacherDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel da Professora</h1>
      <p>🔐 Aqui você poderá adicionar saldo nas contas dos estudantes.</p>
      <button
  onClick={() => console.log("Cliquei para adicionar saldo")}
  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
  Adicionar saldo
</button>
        Adicionar saldo
      </button>
    </div>
  );
}

export default TeacherDashboard;
