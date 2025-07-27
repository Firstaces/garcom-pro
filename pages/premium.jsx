import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import CardGarcomPremium from "../components/CardGarcomPremium";
import CurriculoPremium from "../components/CurriculoPremium";

export default function Premium() {
  const [senha, setSenha] = useState("");
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    cidade: "",
    whatsapp: "",
    experiencia: "",
    eventos: "",
    habilidades: "",
    frase: "",
    foto: null,
    modelo: "modelo1",
  });

  const cardRef = useRef();
  const curriculoRef = useRef();

  // Verificar senha via API
  const verificarSenha = async () => {
    setLoading(true);
    setErro("");
    try {
      const res = await fetch("/api/validar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha }),
      });

      const data = await res.json();
      if (data.ok) {
        setAcessoLiberado(true);
        setErro("");
      } else {
        setErro("Senha incorreta. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      setErro("Erro ao validar senha.");
    } finally {
      setLoading(false);
    }
  };

  // Captura de campos
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
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const selecionarModelo = (modelo) => {
    setForm((prev) => ({ ...prev, modelo }));
  };

  // Baixar Card como PNG
  const baixarPNG = async () => {
    const cardElement = document.querySelector("#card-preview");
    if (!cardElement) {
      alert("Cartão não encontrado.");
      return;
    }
    try {
      const canvas = await html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "cartao-virtual-garcom.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao gerar PNG:", error);
      alert("Erro ao gerar PNG. Veja o console.");
    }
  };

  // Baixar Currículo Premium PDF
  const baixarPDFPremium = async () => {
    if (!curriculoRef.current) {
      alert("Currículo não encontrado.");
      return;
    }
    try {
      const canvas = await html2canvas(curriculoRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(
        pageWidth / canvas.width,
        pageHeight / canvas.height
      );
      const pdfWidth = canvas.width * ratio;
      const pdfHeight = canvas.height * ratio;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("curriculo-premium.pdf");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Veja o console.");
    }
  };

  const nomeSafe = form.nome || "Seu Nome";
  const fraseSafe = form.frase || "Profissional dedicado.";
  const whatsappSafe = form.whatsapp || "(00) 00000-0000";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      {!acessoLiberado ? (
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
            disabled={loading}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
          {erro && <p className="text-red-500 mt-2">{erro}</p>}
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
            🎉 Conteúdo Premium Liberado!
          </h2>

          {/* Recursos Exclusivos */}
          <div className="bg-white p-4 rounded-lg shadow mb-6 text-center">
            <h3 className="text-lg font-bold text-green-600 mb-2">
              Recursos Exclusivos Premium
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                ✅ Acesso ao <strong>Agente de IA:</strong>{" "}
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
                💬 PDF:{" "}
                <a
                  href="/pdfs/Garcom-Pro-Premium.pdf"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  E-book
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formulário */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Preencha seus dados:</h3>
              <div className="space-y-3 mb-6">
                <input
                  name="nome"
                  placeholder="Nome completo"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="cidade"
                  placeholder="Cidade/Estado"
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
                  name="experiencia"
                  placeholder="Anos de experiência"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="eventos"
                  placeholder="Tipos de eventos"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="habilidades"
                  placeholder="Três habilidades (separadas por vírgula)"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  name="frase"
                  placeholder="Frase de apresentação"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                />
                <label className="block mt-2 text-sm font-semibold">Foto</label>
                <input
                  name="foto"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              {/* Modelos */}
              <h3 className="text-lg font-bold mb-4 text-center">
                Escolha o modelo do Cartão Virtual
              </h3>
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
                      nome="Exemplo"
                      whatsapp="(00) 00000-0000"
                      frase="Visual do cartão"
                      modelo={modelo}
                      foto={null}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pré-visualizações */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4 text-center">
                Cartão Virtual
              </h3>
              <div className="flex justify-center mb-4">
                <div id="card-preview">
                  <CardGarcomPremium
                    ref={cardRef}
                    nome={nomeSafe}
                    whatsapp={whatsappSafe}
                    frase={fraseSafe}
                    foto={form.foto}
                    modelo={form.modelo}
                  />
                </div>
              </div>
              <button
                onClick={baixarPNG}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 w-full"
              >
                Baixar Cartão PNG 📸
              </button>

              {/* Currículo Premium */}
              <h3 className="text-lg font-bold mt-6 mb-4 text-center text-yellow-600">
                Currículo Premium
              </h3>
              <div ref={curriculoRef}>
                <CurriculoPremium
                  nome={form.nome}
                  cidade={form.cidade}
                  whatsapp={form.whatsapp}
                  experiencia={form.experiencia}
                  eventos={form.eventos}
                  habilidades={form.habilidades}
                  frase={form.frase}
                  foto={form.foto}
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={baixarPDFPremium}
                  className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 w-full"
                >
                  Baixar Currículo PDF 📝
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
