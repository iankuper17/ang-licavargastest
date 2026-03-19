"use client";

import { PATTERNS } from "@/lib/patterns";

export default function PatternGuide() {
  const patterns = Object.values(PATTERNS);

  return (
    <div>
      <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
        Esta guía te muestra los 4 patrones del diagnóstico con toda la información que necesitás
        para preparar la conversación con cada persona que te escriba por WhatsApp.
      </p>

      <div className="space-y-6">
        {patterns.map((pattern) => (
          <div
            key={pattern.id}
            className="bg-bg-card rounded-card border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-4" style={{ borderTop: `3px solid ${pattern.color}` }}>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">{pattern.emoji}</span>
                <div>
                  <h3 className="font-display font-bold text-xl" style={{ color: pattern.color }}>
                    {pattern.name}
                  </h3>
                  <p className="text-text-muted text-sm">{pattern.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 space-y-5">
              {/* Lo que ve la persona */}
              <div>
                <h4 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
                  Lo que ve la persona
                </h4>
                <p className="text-[14px] leading-relaxed text-text-secondary italic">
                  {pattern.description}
                </p>
              </div>

              {/* Cómo se manifiesta */}
              <div>
                <h4 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
                  Cómo se manifiesta
                </h4>
                <ul className="space-y-1.5">
                  {pattern.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-text-secondary">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: pattern.color }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qué podés trabajar */}
              <div>
                <h4 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
                  🎯 Qué podés trabajar
                </h4>
                <p className="text-[14px] leading-relaxed text-text-secondary">
                  {pattern.guideFor}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
