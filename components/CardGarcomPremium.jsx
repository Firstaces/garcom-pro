import React, { forwardRef } from "react";

const CardGarcomPremium = forwardRef(
  (
    {
      nome,
      whatsapp,
      frase,
      foto,
      modelo = "modelo1",
      mini = false,
      isDownload = false,
    },
    ref
  ) => {
    const getEstilos = () => {
      if (isDownload) {
        return { container: "bg-white text-black", border: "2px solid #ccc" };
      }

      switch (modelo) {
        case "modelo2":
          return {
            container:
              "bg-gradient-to-r from-gray-900 via-gray-700 to-yellow-600 text-white",
            border: "3px solid #FFD700",
          };
        case "modelo3":
          return {
            container:
              "bg-gradient-to-r from-green-700 via-emerald-500 to-teal-300 text-white",
            border: "3px solid #34d399",
          };
        default: // modelo1
          return {
            container:
              "bg-gradient-to-r from-blue-900 via-blue-700 to-yellow-400 text-white",
            border: "3px solid #fbbf24",
          };
      }
    };

    const estilos = getEstilos();
    const cardWidth = mini ? "150px" : "300px";
    const imageSize = mini ? "50px" : "100px";

    return (
      <div
        ref={ref}
        className={`relative rounded-xl shadow-xl p-4 text-center ${estilos.container}`}
        style={{ width: cardWidth, border: estilos.border }}
      >
        {!mini && !isDownload && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow">
            VIP
          </div>
        )}

        {foto && (
          <div className="flex justify-center mb-2">
            <img
              src={typeof foto === "string" ? foto : URL.createObjectURL(foto)}
              alt="Foto do Garçom"
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
              }}
            />
          </div>
        )}

        <h2 className={`font-extrabold ${mini ? "text-sm" : "text-xl"}`}>
          {nome || "Seu Nome"}
        </h2>
        <p className={`italic ${mini ? "text-xs" : "text-sm"} mt-1`}>
          {frase || "Profissional dedicado."}
        </p>
        <p className={`${mini ? "text-xs" : "text-lg"} mt-1`}>
          📱 {whatsapp || "(00) 00000-0000"}
        </p>
      </div>
    );
  }
);

export default CardGarcomPremium;
