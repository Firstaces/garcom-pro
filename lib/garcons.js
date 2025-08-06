// 📁 lib/garcons.js
import { supabase } from "./supabaseClient";

// Buscar todos os garçons (ordenando os Premium no topo)
export async function buscarGarcons() {
  const { data, error } = await supabase
    .from("garcons")
    .select("*")
    .order("premium", { ascending: false });

  if (error) {
    console.error("Erro ao buscar garçons:", error.message);
    return [];
  }

  return data;
}

// Cadastrar um novo garçom
export async function cadastrarGarcom(dados) {
  const { error } = await supabase.from("garcons").insert([dados]);

  if (error) {
    console.error("Erro ao cadastrar garçom:", error.message);
  }
}
