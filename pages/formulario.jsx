// Conteúdo movido de GarcomProFormulario original para rota /formulario
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import CardGarcom from "../components/CardGarcom";

export default function FormularioGarcomPro() {
  const [form, setForm] = useState({
    nome: "",
    cidade: "",
    whatsapp: "",
    experiencia: "",
    eventos: "",
    habilidades: "",
    frase: "",
    fotos: [],
  });

  const [mostrarPreview, setMostrarPreview] = useState(false);
  const previewRef = useRef();
  const cardRef = useRef();

  const gerarFraseAutomatica = () => {
    const frases = [
      "Pontual, simpático e sempre pronto para servir com excelência.",
      "Profissional dedicado, com experiência em eventos sociais e corporativos.",
      "Ágil, educado e comprometido com um atendimento de qualidade.",
    ];
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    setForm({ ...form, frase: fraseAleatoria });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "fotos") {
      setForm({ ...form, fotos: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const baixarPDF = () => {
    const element = previewRef.current;
    if (!element) return;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = {
        width: canvas.width,
        height: canvas.height,
      };

      const ratio = Math.min(
        pageWidth / imgProps.width,
        pageHeight / imgProps.height
      );
      const pdfWidth = imgProps.width * ratio;
      const pdfHeight = imgProps.height * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("curriculo-garcom-pro.pdf");
    });
  };

  const baixarCartao = () => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    html2canvas(cardElement, { scale: 2, useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "cartao-garcom.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Formulário de dados */}
      <Card className="p-4">
        <CardContent className="grid gap-4">
          <Input
            name="nome"
            placeholder="Nome completo"
            onChange={handleChange}
          />
          <Input
            name="cidade"
            placeholder="Cidade/Estado"
            onChange={handleChange}
          />
          <Input
            name="whatsapp"
            placeholder="WhatsApp"
            onChange={handleChange}
          />
          <Input
            name="experiencia"
            placeholder="Anos de experiência"
            onChange={handleChange}
          />
          <Input
            name="eventos"
            placeholder="Tipos de eventos trabalhados"
            onChange={handleChange}
          />
          <Input
            name="habilidades"
            placeholder="Três habilidades principais (separadas por vírgula)"
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">
            <Textarea
              name="frase"
              placeholder="Frase de apresentação"
              value={form.frase}
              onChange={handleChange}
            />
            <Button onClick={gerarFraseAutomatica}>Gerar com IA</Button>
          </div>

          <Input
            name="fotos"
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
          <Button className="mt-4" onClick={() => setMostrarPreview(true)}>
            Gerar Currículo Pro
          </Button>
        </CardContent>
      </Card>

      {/* Preview do Currículo e Cartão */}
      {mostrarPreview && (
        <>
          <div ref={previewRef} className="max-w-[480px] mx-auto">
            <Card className="mt-6 p-6">
              <CardContent className="space-y-4">
                <h2 className="text-xl font-bold">{form.nome}</h2>
                <p className="text-gray-600">
                  {form.cidade} | {form.whatsapp}
                </p>

                <p className="italic text-blue-700">"{form.frase}"</p>

                <div>
                  <h3 className="font-semibold">Habilidades:</h3>
                  <ul className="list-disc list-inside">
                    {form.habilidades.split(",").map((hab, i) => (
                      <li key={i}>{hab.trim()}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">Experiência:</h3>
                  <p>{form.experiencia} anos</p>
                  <h4 className="font-semibold mt-2">Eventos:</h4>
                  <p>{form.eventos}</p>
                </div>

                <div>
                  <h3 className="font-semibold">Fotos:</h3>
                  <div className="flex flex-wrap gap-2 mt-2 justify-start items-start">
                    {form.fotos.map((foto, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(foto)}
                        alt={`Foto ${index + 1}`}
                        className="w-16 h-16 max-w-[100px] max-h-[100px] object-cover rounded-lg border shadow-sm print:w-12 print:h-12"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cartão Virtual do Garçom */}
          <div className="mt-6">
            <CardGarcom
              ref={cardRef}
              nome={form.nome}
              whatsapp={form.whatsapp}
              frase={form.frase}
              foto={form.fotos[0]}
            />
          </div>

          <Button className="mt-4" onClick={baixarPDF}>
            Baixar Currículo em PDF
          </Button>

          <Button className="mt-4 ml-2" onClick={baixarCartao}>
            Baixar Cartão em PNG
          </Button>
        </>
      )}
    </div>
  );
}
