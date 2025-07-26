import React from "react";

export default function CurriculoPremium({
  nome,
  cidade,
  whatsapp,
  experiencia,
  eventos,
  habilidades,
  frase,
  foto,
}) {
  return (
    <div
      className="mx-auto bg-white border border-gray-300 rounded-lg shadow-md p-6 text-center"
      style={{ maxWidth: "700px" }}
    >
      {/* Foto */}
      {foto && (
        <div className="flex justify-center mb-4">
          <img
            src={foto}
            alt="Foto do Garçom"
            className="object-cover rounded-full border-4 border-yellow-500 shadow-md"
            style={{ width: "110px", height: "110px" }}
          />
        </div>
      )}

      {/* Nome e frase */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {nome || "Seu Nome"}
      </h2>
      <p className="italic text-gray-600 mb-4">
        {frase || "Profissional dedicado."}
      </p>

      <div className="border-t border-gray-200 my-4"></div>

      {/* Informações */}
      <div className="text-left space-y-4 px-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-700">
            📍 Informações
          </h3>
          <p>
            <strong>Cidade:</strong> {cidade || "Cidade/Estado"}
          </p>
          <p>
            <strong>WhatsApp:</strong> {whatsapp || "(00) 00000-0000"}
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">
            💼 Experiência
          </h3>
          <p>{experiencia || "0"} anos de experiência</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">🎉 Eventos</h3>
          <p>{eventos || "Não informado"}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">
            ⭐ Habilidades
          </h3>
          <ul className="list-disc list-inside">
            {(habilidades || "")
              .split(",")
              .filter((h) => h.trim() !== "")
              .map((hab, i) => (
                <li key={i}>{hab.trim()}</li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
