import React from "react";

export default function Pagamento() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          Garçom Pro Premium
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Conquiste eventos com um currículo e cartão virtual de respeito!
        </p>
        <p className="text-2xl font-bold text-green-600 mb-6">R$ 29</p>

        {/* Botão para pagar via Kiwify */}
        <a
          href="https://pay.kiwify.com.br/0KiniQj"
          target="_blank"
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-600 transition"
        >
          Comprar Agora
        </a>

        <p className="mt-4 text-sm text-gray-500">
          Pagamento 100% seguro via Kiwify. Após a confirmação, você receberá
          acesso imediato ao conteúdo premium!
        </p>
      </div>
    </div>
  );
}
