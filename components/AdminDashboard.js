"use client";

import { useState, useEffect } from "react";
import { PATTERNS } from "@/lib/patterns";
import { QUESTIONS } from "@/lib/questions";
import PatternGuide from "./PatternGuide";

export default function AdminDashboard({ adminPassword }) {
  const [activeTab, setActiveTab] = useState("resultados");
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchDiagnosticos();
  }, []);

  const fetchDiagnosticos = async () => {
    try {
      const res = await fetch("/api/diagnosticos", {
        headers: { "x-admin-password": adminPassword },
      });
      const data = await res.json();
      if (data.data) {
        setDiagnosticos(data.data);
      }
    } catch (err) {
      console.error("Error fetching diagnosticos:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalDiagnosticos = diagnosticos.length;
  const totalWhatsApp = diagnosticos.filter((d) => d.click_whatsapp).length;

  const patternCounts = {};
  Object.keys(PATTERNS).forEach((key) => {
    patternCounts[key] = diagnosticos.filter((d) => d.patron_dominante === key).length;
  });

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("es-CR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-[800px] mx-auto px-5 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-3xl mb-1">Panel Admin</h1>
          <p className="text-text-muted text-sm">Diagnóstico de Patrones — Angélica Vargas</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-border/50 p-1 rounded-btn">
          <button
            onClick={() => setActiveTab("resultados")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === "resultados"
                ? "bg-bg-card text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            📋 Resultados
          </button>
          <button
            onClick={() => setActiveTab("guia")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === "guia"
                ? "bg-bg-card text-text-primary shadow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            📖 Guía de Patrones
          </button>
        </div>

        {activeTab === "resultados" ? (
          <div className="animate-fade-up">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-bg-card rounded-card border border-border p-4">
                <p className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
                  Total diagnósticos
                </p>
                <p className="text-2xl font-semibold">{totalDiagnosticos}</p>
              </div>
              <div className="bg-bg-card rounded-card border border-border p-4">
                <p className="text-text-muted text-xs font-medium uppercase tracking-wide mb-1">
                  Clics en WhatsApp
                </p>
                <p className="text-2xl font-semibold text-[#25D366]">{totalWhatsApp}</p>
              </div>
            </div>

            {/* Pattern counts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {Object.entries(PATTERNS).map(([key, p]) => (
                <div
                  key={key}
                  className="bg-bg-card rounded-card border border-border p-3 text-center"
                >
                  <span className="text-xl">{p.emoji}</span>
                  <p className="text-lg font-semibold mt-1" style={{ color: p.color }}>
                    {patternCounts[key]}
                  </p>
                  <p className="text-text-muted text-xs">{p.name}</p>
                </div>
              ))}
            </div>

            {/* Results list */}
            {loading ? (
              <div className="text-center py-12 text-text-muted">Cargando...</div>
            ) : diagnosticos.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                No hay diagnósticos todavía.
              </div>
            ) : (
              <div className="space-y-2">
                {diagnosticos.map((d) => {
                  const pattern = PATTERNS[d.patron_dominante];
                  const isExpanded = expandedId === d.id;

                  return (
                    <div
                      key={d.id}
                      className="bg-bg-card rounded-card border border-border overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : d.id)}
                        className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-[rgba(0,0,0,0.01)] transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[15px] truncate">{d.nombre}</p>
                          <p className="text-text-muted text-xs mt-0.5">
                            {formatDate(d.created_at)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: pattern?.colorLight,
                              color: pattern?.color,
                            }}
                          >
                            {pattern?.emoji} {pattern?.name}
                          </span>
                          {d.click_whatsapp && (
                            <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-[rgba(37,211,102,0.1)] text-[#25D366]">
                              WA ✓
                            </span>
                          )}
                        </div>

                        <svg
                          className={`w-4 h-4 text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-border">
                          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                            <div>
                              <span className="text-text-muted">Email:</span>{" "}
                              <span className="text-text-primary">{d.email}</span>
                            </div>
                            <div>
                              <span className="text-text-muted">Teléfono:</span>{" "}
                              <span className="text-text-primary">{d.telefono || "—"}</span>
                            </div>
                          </div>

                          {/* Scores */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                              Puntajes
                            </p>
                            <div className="grid grid-cols-4 gap-2">
                              {Object.entries(PATTERNS).map(([key, p]) => {
                                const score = d[`puntaje_${key}`] || 0;
                                const isWinner = key === d.patron_dominante;
                                return (
                                  <div
                                    key={key}
                                    className={`text-center p-2 rounded-btn text-sm ${
                                      isWinner ? "ring-1" : ""
                                    }`}
                                    style={{
                                      backgroundColor: p.colorLight,
                                      ringColor: isWinner ? p.color : "transparent",
                                    }}
                                  >
                                    <span className="text-xs">{p.emoji}</span>
                                    <p className="font-semibold" style={{ color: p.color }}>
                                      {score}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Answers */}
                          <div>
                            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                              Respuestas
                            </p>
                            <div className="space-y-2">
                              {d.respuestas?.map((answer, i) => (
                                <div key={i} className="text-sm">
                                  <p className="text-text-muted text-xs mb-0.5">
                                    {i + 1}. {QUESTIONS[i]?.text}
                                  </p>
                                  <p className="text-text-primary text-[13px]">{answer}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fade-up">
            <PatternGuide />
          </div>
        )}
      </div>
    </div>
  );
}
