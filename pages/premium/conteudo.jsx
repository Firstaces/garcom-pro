// pages/premium/conteudo.jsx

import React from "react";
import { Button } from "../../components/ui/button";

export default function ConteudoPremium() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6 text-gray-800">
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          🎉 Bem-vindo ao Garçom Pro Premium
        </h1>
        <p className="text-lg mb-8">
          Aqui está seu conteúdo exclusivo. Aproveite para evoluir ainda mais
          como profissional!
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            🤖 Acesse seu Agente IA Premium
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Converse com o assistente inteligente para dicas, frases prontas,
            comportamento e postura em eventos.
          </p>
          <a
            href="https://chatgpt.com/g/g-6880df1c02588191b8c0e40c2d3ddd33-garcom-pro-ia-seu-consultor-de-eventos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-blue-700 text-white hover:bg-blue-800">
              Abrir Agente IA Premium
            </Button>
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            📚 Materiais para download
          </h2>
          <ul className="text-left list-disc list-inside space-y-2">
            <li>
              <a
                href="/pdfs/checklist-eventos.pdf"
                className="text-blue-600 underline"
                target="_blank"
              >
                Checklist de eventos
              </a>
            </li>
            <li>
              <a
                href="/pdfs/frases-apresentacao.pdf"
                className="text-blue-600 underline"
                target="_blank"
              >
                Frases para currículo
              </a>
            </li>
            <li>
              <a
                href="/pdfs/dicas-comportamento.pdf"
                className="text-blue-600 underline"
                target="_blank"
              >
                Dicas de comportamento
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
