// 📄 pages/VitrineGarcons.jsx
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
  const [carregando, setCarregando] = useState(true);
  const [novoGarcom, setNovoGarcom] = useState({
    nome: "",
    cidade: "",
    bairro: "",
    experiencia: "",
    telefone: "",
    email: "",
    instagram: "",
    premium: false,
  });

  useEffect(() => {
    const carregarGarcons = async () => {
      setCarregando(true);
      const lista = await buscarGarcons();
      setGarcons(lista);
      setCarregando(false);
    };
    carregarGarcons();
  }, []);

  const garconsFiltrados = garcons.filter(
    (g) =>
      g.cidade.toLowerCase().includes(filtro.toLowerCase()) ||
      g.bairro.toLowerCase().includes(filtro.toLowerCase())
  );

  async function handleCadastro() {
    await cadastrarGarcom(novoGarcom);
    const atualizada = await buscarGarcons();
    setGarcons(atualizada);

    setNovoGarcom({
      nome: "",
      cidade: "",
      bairro: "",
      experiencia: "",
      telefone: "",
      email: "",
      instagram: "",
      premium: false,
    });

    alert("Cadastro enviado com sucesso! 🎉");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Encontre um Garçom
      </h1>

      <Input
        placeholder="Digite uma cidade ou bairro"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="mb-4"
      />

      {carregando ? (
        <p className="text-center text-gray-500">Carregando garçons...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {garconsFiltrados.map((g, index) => (
            <Card
              key={index}
              className={g.premium ? "border-2 border-yellow-500" : ""}
            >
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{g.nome}</h2>
                <p className="text-sm">
                  📍 {g.bairro}, {g.cidade}
                </p>
                <p className="mt-2 text-gray-600">{g.experiencia}</p>
                {g.premium && (
                  <span className="text-yellow-600 font-bold">
                    ⭐ Garçom Pro Premium
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
                <Label>E-mail (opcional)</Label>
                <Input
                  value={novoGarcom.email}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Instagram (opcional)</Label>
                <Input
                  value={novoGarcom.instagram}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, instagram: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={novoGarcom.premium}
                  onChange={(e) =>
                    setNovoGarcom({ ...novoGarcom, premium: e.target.checked })
                  }
                />
                <Label>Sou assinante Premium</Label>
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
    </div>
  );
}
