import { supabase } from "./supabaseClient";

// Buscar todos os garçons
export async function buscarGarcons() {
  const { data, error } = await supabase
    .from("garcons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar garçons:", error.message);
    return [];
  }

  return data || [];
}

// Cadastrar novo garçom
export async function cadastrarGarcom(garcom) {
  const { error } = await supabase.from("garcons").insert([garcom]);

  if (error) {
    console.error("Erro ao cadastrar garçom:", error.message);
  }
}
