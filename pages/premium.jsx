import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import CardGarcomPremium from "../components/CardGarcomPremium";

export default function Premium() {
  const [senha, setSenha] = useState("");
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    frase: "",
    foto: null,
    modelo: "modelo1",
  });

  const verificarSenha = () => {
    if (senha === "souvippro") {
      setAcessoLiberado(true);
      setErro("");
    } else {
      setErro("Senha incorreta. Tente novamente.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      const file = files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, foto: reader.result }));
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const selecionarModelo = (modelo) => {
    setForm((prev) => ({ ...prev, modelo }));
  };

  /** Gera PDF capturando o card visível */
  const gerarPDF = async (preview = false) => {
    const cardElement = document.querySelector("#card-preview");
    if (!cardElement) {
      alert("Cartão não encontrado.");
      return;
    }

    try {
      // Delay para garantir renderização
      await new Promise((resolve) => setTimeout(resolve, 800));

      const canvas = await html2canvas(cardElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [90, 50],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 90, 50);

      if (preview) {
        window.open(pdf.output("bloburl"), "_blank");
      } else {
        pdf.save("cartao-virtual-garcom.pdf");
      }
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
      alert("Erro ao gerar PDF. Veja o console.");
    }
  };

  const baixarPNG = async () => {
    const cardElement = document.querySelector("#card-preview");
    if (!cardElement) {
      alert("Cartão não encontrado.");
      return;
    }

    try {
      // dá um tempinho pra foto/render finalizar
      await new Promise((r) => setTimeout(r, 300));

      const canvas = await html2canvas(cardElement, {
        scale: 3, // qualidade alta
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "cartao-virtual-garcom.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Erro ao gerar PNG:", err);
      alert("Falha ao gerar PNG. Veja o console.");
    }
  };

  const nomeSafe = form.nome?.trim() || "Seu Nome";
  const fraseSafe = form.frase?.trim() || "Profissional dedicado.";
  const whatsappSafe = form.whatsapp?.trim() || "(00) 00000-0000";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      {!acessoLiberado ? (
        /* Tela de senha */
        <div className="w-full max-w-sm text-center bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Acesso VIP</h1>
          <p className="mb-4">
            Digite a senha para acessar o conteúdo premium:
          </p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha de acesso"
            className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={verificarSenha}
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
          {erro && <p className="text-red-500 mt-2">{erro}</p>}
        </div>
      ) : (
        /* Conteúdo Premium */
        <div className="w-full max-w-6xl bg-transparent mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
            🎉 Conteúdo Premium Liberado!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna Esquerda */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="mb-6 space-y-2 text-left">
                <li>
                  ✅ Acesso à <strong>IA</strong>:{" "}
                  <a
                    href="https://chatgpt.com/g/g-6880df1c02588191b8c0e40c2d3ddd33-garcom-pro-ia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Garçom Pro IA
                  </a>
                </li>
                <li>
                  📄 Dicas de Postura –{" "}
                  <a
                    href="/pdfs/dicas-comportamento.pdf"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Baixar
                  </a>
                </li>
                <li>
                  💬 Frases Profissionais –{" "}
                  <a
                    href="/pdfs/frases-apresentacao.pdf"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Baixar
                  </a>
                </li>
                <li>
                  ✨ Checklist Eventos –{" "}
                  <a
                    href="/pdfs/checklist-eventos.pdf"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Baixar
                  </a>
                </li>
              </ul>

              {/* Formulário */}
              <div className="space-y-3 mb-6">
                <input
                  name="nome"
                  placeholder="Nome completo"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="whatsapp"
                  placeholder="WhatsApp"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="frase"
                  placeholder="Frase de apresentação"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />

                <label className="block mb-1 text-sm font-semibold">
                  Foto do Garçom ou Evento
                </label>

                <input
                  name="foto"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              {/* Modelos */}
              <h3 className="text-lg font-bold mb-2">Escolha o modelo:</h3>
              <div className="flex justify-center gap-4 mb-6">
                {["modelo1", "modelo2", "modelo3"].map((modelo) => (
                  <div
                    key={modelo}
                    onClick={() => selecionarModelo(modelo)}
                    className={`cursor-pointer transform hover:scale-105 transition ${
                      form.modelo === modelo
                        ? "ring-2 ring-yellow-500 rounded-lg"
                        : ""
                    }`}
                  >
                    <CardGarcomPremium
                      mini
                      nome={nomeSafe}
                      whatsapp={whatsappSafe}
                      frase={fraseSafe}
                      foto={form.foto}
                      modelo={modelo}
                    />
                    <p className="text-xs mt-1 text-center capitalize">
                      {modelo}
                    </p>
                  </div>
                ))}
              </div>

              {/* Botões */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => gerarPDF(true)}
                  className="bg-gray-300 text-black px-4 py-2 rounded shadow hover:bg-gray-400"
                >
                  Pré-visualizar PDF 👁️
                </button>
                <button
                  onClick={() => gerarPDF(false)}
                  className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                >
                  Baixar PDF 📥
                </button>
                <button
                  onClick={baixarPNG}
                  className="bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700"
                >
                  Baixar PNG 📸
                </button>
              </div>
            </div>

            {/* Coluna Direita (preview) */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4 text-center">
                Pré-visualização
              </h3>
              <div className="flex justify-center">
                <div id="card-preview">
                  <CardGarcomPremium
                    nome={nomeSafe}
                    whatsapp={whatsappSafe}
                    frase={fraseSafe}
                    foto={form.foto}
                    modelo={form.modelo}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6 text-center">
                O PDF será gerado com esse layout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
