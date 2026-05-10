import React from "react";

function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel do Estudante</h1>
      <p>💸 Aqui você pode fazer transferências usando o Josepha Pix.</p>
      <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Enviar Pix
      </button>
    </div>
  );
}

export default StudentDashboard;
