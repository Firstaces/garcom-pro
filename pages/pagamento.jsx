import React from "react";

export default function Pagamento() {
  const copiarPix = () => {
    navigator.clipboard.writeText("SUA-CHAVE-PIX-AQUI");
    alert("Chave Pix copiada! Agora é só pagar via seu banco.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          Garçom Pro Premium
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Conquiste eventos com um currículo e cartão virtual de respeito!
        </p>
        <p className="text-2xl font-bold text-green-600 mb-4">R$ 29</p>

        {/* Chave Pix */}
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p className="text-sm text-gray-600">Chave Pix:</p>
          <p className="text-lg font-bold text-gray-800">
            3944ba93-25a5-44d5-a72c-f9ab82fe55a2
          </p>
          <button
            onClick={copiarPix}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition"
          >
            Copiar chave Pix
          </button>
        </div>

        {/* Botão WhatsApp */}
        <a
          href="https://wa.me/5522999728595?text=Oi,%20acabei%20de%20pagar%20o%20Garçom%20Pro%20Premium!"
          target="_blank"
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Enviar Comprovante via WhatsApp
        </a>

        <p className="mt-4 text-sm text-gray-500">
          Assim que confirmarmos o pagamento, você receberá a senha de acesso!
        </p>
      </div>
    </div>
  );
}
