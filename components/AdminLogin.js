"use client";

import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("admin_auth", password);
        onLogin(password);
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-bg">
      <div className="animate-fade-up w-full max-w-sm">
        <div className="bg-bg-card rounded-card p-8 border border-border">
          <h1 className="font-display font-semibold text-2xl mb-1 text-center">
            Panel Admin
          </h1>
          <p className="text-text-muted text-sm mb-6 text-center">
            Angélica Vargas — Diagnóstico de Patrones
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá la contraseña"
                className="w-full px-4 py-3 rounded-btn border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-hover transition-colors"
              />
            </div>

            {error && (
              <p className="text-sm text-accent">{error}</p>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full py-3 rounded-btn font-medium text-white bg-accent transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
            >
              {loading ? "Verificando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
