import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { buscarGarcons, cadastrarGarcom } from "../lib/garcons";

export default function VitrineGarcons() {
  const [filtro, setFiltro] = useState("");
  const [garcons, setGarcons] = useState([]);

  const [novoGarcom, setNovoGarcom] = useState({
    nome: "",
    cidade: "",
    bairro: "",
    experiencia: "",
    telefone: "",
    email: "",
    instagram: "",
  });

  // --- estados para premium ---
  const [premiumCode, setPremiumCode] = useState("");
  const [premiumOk, setPremiumOk] = useState(false);
  const [checkingPremium, setCheckingPremium] = useState(false);

  useEffect(() => {
    async function carregar() {
      const dados = await buscarGarcons();
      setGarcons(dados);
    }
    carregar();
  }, []);

  const garconsFiltrados = garcons.filter(
    (g) =>
      (g.cidade || "").toLowerCase().includes(filtro.toLowerCase()) ||
      (g.bairro || "").toLowerCase().includes(filtro.toLowerCase())
  );

  async function validarPremium() {
    try {
      setCheckingPremium(true);
      const res = await fetch("/api/validar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha: premiumCode }),
      });
      const data = await res.json();
      if (data.ok) {
        setPremiumOk(true);
        alert("Código Premium validado! ✅");
      } else {
        setPremiumOk(false);
        alert("Código inválido. ❌");
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao validar código. Tente novamente.");
    } finally {
      setCheckingPremium(false);
    }
  }

  async function handleCadastro() {
    const payload = {
      ...novoGarcom,
      premium: premiumOk, // 👈 só vira true se validou o código
    };

    await cadastrarGarcom(payload);

    // reset
    setNovoGarcom({
      nome: "",
      cidade: "",
      bairro: "",
      experiencia: "",
      telefone: "",
      email: "",
      instagram: "",
    });
    setPremiumCode("");
    setPremiumOk(false);

    alert("Cadastro enviado com sucesso! 🎉");

    const atualizados = await buscarGarcons();
    setGarcons(atualizados);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Encontre um Garçom
      </h1>

      <Input
        placeholder="Digite uma cidade ou bairro"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {garconsFiltrados.map((g, index) => (
          <Card
            key={index}
            className={g.premium ? "border-2 border-yellow-500" : ""}
          >
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{g.nome}</h2>
              <p className="text-sm">
                📍 {g.bairro}, {g.cidade}
              </p>
              <p className="text-gray-700">{g.experiencia}</p>

              {g.telefone && <p>📞 {g.telefone}</p>}
              {g.email && <p>📧 {g.email}</p>}
              {g.instagram && (
                <p>
                  📸{" "}
                  <a
                    href={g.instagram}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Instagram
                  </a>
                </p>
              )}
              {g.premium && (
                <span className="text-yellow-600 font-bold">
                  ⭐ Garçom Pro Premium
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="mb-2">É garçom freelancer e quer aparecer aqui?</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Quero me cadastrar</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <h2 className="text-xl font-bold mb-4">Cadastro de Garçom</h2>
            <form className="space-y-3">
              <div>
                <Label>Nome completo</Label>
                <Input
                  value={novoGarcom.nome}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, nome: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Cidade</Label>
                <Input
                  value={novoGarcom.cidade}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, cidade: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Bairro</Label>
                <Input
                  value={novoGarcom.bairro}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, bairro: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Experiência</Label>
                <Input
                  value={novoGarcom.experiencia}
                  onChange={(e) =>
                    setNovoGarcom({
                      ...novoGarcom,
                      experiencia: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Telefone (WhatsApp)</Label>
                <Input
                  value={novoGarcom.telefone}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, telefone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input
                  value={novoGarcom.email}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Instagram (link com https)</Label>
                <Input
                  value={novoGarcom.instagram}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, instagram: e.target.value })
                  }
                />
              </div>

              {/* Código Premium */}
              <div>
                <Label>Código Premium (opcional)</Label>
                <div className="flex gap-2">
                  <Input
                    value={premiumCode}
                    onChange={(e) => setPremiumCode(e.target.value)}
                    placeholder="Digite seu código"
                    disabled={premiumOk}
                  />
                  <Button
                    type="button"
                    onClick={validarPremium}
                    disabled={checkingPremium || premiumOk}
                  >
                    {premiumOk
                      ? "Validado ✅"
                      : checkingPremium
                      ? "Validando..."
                      : "Validar"}
                  </Button>
                </div>
                {!premiumOk && (
                  <p className="text-xs text-gray-500 mt-1">
                    Não tem código? Você pode se cadastrar no plano gratuito
                    normalmente.
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={handleCadastro}
                className="w-full mt-2"
              >
                Enviar Cadastro
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-4">
          Comparativo de Visibilidade
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Perfil Gratuito</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Nome, cidade e bairro visíveis</li>
                <li>Experiência resumida</li>
                <li>Posição padrão na vitrine</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-yellow-500 border-2">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-yellow-600 mb-2">
                Perfil Premium ⭐
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                <li>Perfil em destaque no topo</li>
                <li>Cartão virtual com link personalizado</li>
                <li>Currículo Profissional</li>
                <li>Texto de apresentação escrito por IA</li>
                <li>Mais chances de ser contratado</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
