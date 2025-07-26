import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { senha } = req.body;
  if (!senha) {
    return res.status(400).json({ ok: false, error: "Senha não enviada" });
  }

  // Gera hash SHA-256 da senha digitada
  const senhaHash = crypto.createHash("sha256").update(senha).digest("hex");
  const senhaCorretaHash = process.env.SENHA_HASH;

  if (senhaHash === senhaCorretaHash) {
    return res.status(200).json({ ok: true });
  }

  return res.status(200).json({ ok: false });
}
