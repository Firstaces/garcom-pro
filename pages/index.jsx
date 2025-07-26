import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="text-center py-16 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <h1 className="text-4xl font-bold mb-4">Garçom Pro</h1>
        <p className="text-lg mb-6">
          Destaque-se. Conquiste mais eventos com um currículo de respeito.
        </p>

        {/* Botão de criar currículo */}
        <Link href="/formulario">
          <Button className="text-lg px-6 py-3 bg-white text-blue-700 font-semibold hover:bg-blue-100">
            Criar meu currículo agora
          </Button>
        </Link>
      </section>

      {/* Benefícios */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Por que usar o Garçom Pro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">✅ Currículo pronto em minutos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">
                📸 Adicione fotos e frases profissionais
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">📱 Compartilhe por WhatsApp e Instagram</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">📄 Baixe em PDF e imprima</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Preview (placeholder) */}
      <section className="py-12 px-6 text-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">
          Veja um exemplo do seu currículo
        </h2>
        <p className="mb-6 text-gray-600">
          Seu perfil visual, simples e direto. Pronto para impressionar.
        </p>
        <div className="max-w-md mx-auto border rounded shadow p-4 bg-white">
          <p className="font-bold text-xl mb-2">João da Silva</p>
          <p className="italic text-blue-600 mb-2">
            "Garçom com 5 anos de experiência em eventos sociais e
            corporativos."
          </p>
          <p className="text-sm text-gray-500">
            📍 São Paulo - SP | 📱 (11) 99999-9999
          </p>
        </div>
      </section>

      {/* Sugestões de locais */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Onde posso enviar meu currículo?
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">
              📍 Zona Oeste – Realengo (RJ)
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>🍽️ Restaurante Estação Realengo – Av. Santa Cruz, 5640</li>
              <li>🥂 Clube Realengo – Eventos sociais e casamentos</li>
              <li>
                📱 Plataformas:{" "}
                <a
                  href="https://trampos.co"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Trampos.co
                </a>
                ,{" "}
                <a
                  href="https://infojobs.com.br"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  InfoJobs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">📍 São Paulo (SP)</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>🍷 Eventos no Espaço Paulista – região da Av. Paulista</li>
              <li>🎉 Casas de festa em Moema e Vila Olímpia</li>
              <li>
                📱 Sites:{" "}
                <a
                  href="https://www.catho.com.br"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Catho
                </a>
                ,{" "}
                <a
                  href="https://www.gupy.io"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Gupy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">📍 Salvador (BA)</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>🍽️ Restaurantes no Pelourinho e Rio Vermelho</li>
              <li>🎊 Eventos em hotéis e espaços de turismo</li>
              <li>📱 Grupos no Facebook e OLX</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">📍 Recife (PE)</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>🎉 Eventos no Recife Antigo e Boa Viagem</li>
              <li>🕺 Bares e festas na zona sul</li>
              <li>
                📱 Sites:{" "}
                <a
                  href="https://neuvoo.com.br"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Neuvoo
                </a>
                ,{" "}
                <a
                  href="https://empregos.com.br"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Empregos.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6">
        <h2 className="text-2xl font-bold mb-4">
          Você cuida do atendimento. O Garçom Pro cuida da sua apresentação.
        </h2>
        <Link href="/formulario">
          <Button className="text-lg px-6 py-3 bg-blue-700 text-white font-semibold hover:bg-blue-800">
            Criar meu currículo agora
          </Button>
        </Link>
        {/* Chamada Premium no final da página */}
        <section className="py-12 px-6 text-center bg-yellow-50 border-t border-yellow-200 mt-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <img
              src="/premium-banner.png"
              alt="Garçom Pro Premium"
              className="w-full md:w-64 h-auto rounded shadow-lg"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-yellow-800 mb-2">
                Garçom Pro Premium 💼
              </h2>
              <p className="text-gray-700 mb-4">
                Acesso exclusivo ao Agente IA, conteúdo profissional, dicas,
                PDFs e muito mais.
              </p>
              <Link href="/premium">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded">
                  Quero acessar o Premium!
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
