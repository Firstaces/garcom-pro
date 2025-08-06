import React from "react";
import Link from "next/link";

export default function PremiumSucesso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Compra Confirmada!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Obrigado por adquirir o <strong>Garçom Pro Premium</strong>!
        </p>
        <p className="text-gray-600 mb-6">
          Em até alguns minutos, você receberá a{" "}
          <strong>senha de acesso</strong> por e-mail ou WhatsApp. Caso não
          receba, fale com a gente clicando no botão abaixo:
        </p>
        <a
          href="https://wa.me/5522999728595?text=Oi!%20Acabei%20de%20comprar%20o%20Garçom%20Pro%20Premium%20e%20ainda%20não%20recebi%20a%20senha"
          target="_blank"
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
        >
          Falar com Suporte
        </a>
        <p className="text-sm text-gray-500 mt-6">
          Após o recebimento da senha, clique no botão abaixo:
        </p>
        <Link href="/premium">
          <span className="inline-block mt-2 text-blue-600 underline cursor-pointer">
            Acessar Área Premium
          </span>
        </Link>
      </div>
    </div>
  );
}
