import { useState } from "react";

export function Dialog({ children }) {
  return <div>{children}</div>; // Aqui você pode trocar por lógica de modal real
}

export function DialogTrigger({ children }) {
  return <div>{children}</div>; // Esse é só um mock, para funcionar no início
}

export function DialogContent({ children }) {
  return <div className="bg-white p-4 rounded shadow">{children}</div>;
}
