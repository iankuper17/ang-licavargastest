"use client";

import { useState } from "react";

export default function IntroScreen({ onStart }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const isValid = nombre.trim() !== "" && email.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onStart({ nombre: nombre.trim(), email: email.trim(), telefono: telefono.trim() });
    }
  };

  return (
    <div className="animate-fade-up w-full max-w-[560px] mx-auto px-5 py-12 min-h-screen flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1
          className="font-display font-semibold leading-tight mb-4"
          style={{ fontSize: "clamp(32px, 6vw, 44px)" }}
        >
          Diagnóstico de Patrones
        </h1>
        <p className="text-text-secondary text-[17px] leading-relaxed mb-6">
          Descubrí cuál es el patrón inconsciente que está dirigiendo tu vida — tus decisiones,
          tus relaciones y tus emociones.
        </p>
        <p className="text-text-muted text-sm">
          12 preguntas · 4 minutos · Resultado inmediato
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Nombre *
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-btn border border-border bg-bg-card text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-hover transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full px-4 py-3 rounded-btn border border-border bg-bg-card text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-hover transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Teléfono <span className="text-text-muted">(opcional)</span>
          </label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+506 8888 7777"
            className="w-full px-4 py-3 rounded-btn border border-border bg-bg-card text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-hover transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-3.5 mt-4 rounded-btn font-medium text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: isValid ? "#C45B4A" : "#C45B4A" }}
        >
          Comenzar diagnóstico
        </button>
      </form>

      <p className="text-center text-text-muted text-xs mt-8">
        Diagnóstico creado por Angélica Vargas · Todos los derechos reservados
      </p>
    </div>
  );
}
