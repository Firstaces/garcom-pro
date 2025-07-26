import React, { forwardRef } from "react";

const CardGarcom = forwardRef(({ nome, whatsapp, frase, foto }, ref) => {
  return (
    <div
      ref={ref}
      className="relative mx-auto bg-white rounded-xl shadow-lg p-5 text-center"
      style={{
        maxWidth: "280px",
        border: "3px solid",
        borderImage: "linear-gradient(to right, #1e3a8a, #fbbf24) 1", // Azul e dourado
      }}
    >
      {/* Foto */}
      {foto && (
        <div className="flex justify-center">
          <img
            src={URL.createObjectURL(foto)}
            alt="Foto do Garçom"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #1e3a8a",
            }}
          />
        </div>
      )}

      {/* Nome */}
      <h2 className="text-lg font-bold text-gray-800">{nome || "Seu Nome"}</h2>

      {/* Frase */}
      <p className="text-gray-600 italic mt-2 text-sm">
        {frase || "Profissional dedicado a servir com excelência."}
      </p>

      {/* WhatsApp */}
      <p className="text-blue-700 font-semibold mt-3 text-sm">
        📱 {whatsapp || "(00) 00000-0000"}
      </p>
    </div>
  );
});

export default CardGarcom;
