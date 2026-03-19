"use client";

import { PATTERNS } from "@/lib/patterns";

export default function ResultScreen({ result, diagnosticoId }) {
  const pattern = PATTERNS[result];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    `Hola Angélica, hice el diagnóstico de patrones y mi resultado fue: ${pattern.name} (${pattern.subtitle}). Me gustaría que me ayudaras a entender más sobre esto.`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

  const handleWhatsAppClick = async () => {
    if (diagnosticoId) {
      try {
        await fetch(`/api/diagnosticos/${diagnosticoId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ click_whatsapp: true }),
        });
      } catch (err) {
        // Non-blocking — don't prevent WhatsApp redirect
      }
    }
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full max-w-[560px] mx-auto px-5 py-12 min-h-screen flex flex-col justify-center">
      <div className="animate-scale-in">
        {/* Badge */}
        <div className="text-center mb-6">
          <span className="inline-block text-sm font-medium text-text-muted px-3 py-1 rounded-full border border-border">
            Tu patrón dominante
          </span>
        </div>

        {/* Pattern card */}
        <div
          className="bg-bg-card rounded-card p-8 border border-border mb-6"
          style={{ borderTopColor: pattern.color, borderTopWidth: "3px" }}
        >
          <div className="text-center mb-6">
            <span className="text-5xl mb-3 block">{pattern.emoji}</span>
            <h2
              className="font-display font-bold mb-1"
              style={{ fontSize: "clamp(28px, 5vw, 36px)", color: pattern.color }}
            >
              {pattern.name}
            </h2>
            <p className="text-text-secondary font-medium">{pattern.subtitle}</p>
          </div>

          <p className="text-[15px] leading-[1.7] text-text-secondary mb-6">
            {pattern.description}
          </p>

          {/* Bullets */}
          <div className="mb-0">
            <h3 className="font-display font-semibold text-lg mb-3">
              Cómo se manifiesta en tu vida
            </h3>
            <ul className="space-y-2.5">
              {pattern.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed text-text-secondary"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: pattern.color }}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Transition text */}
        <div
          className="rounded-card p-6 mb-6"
          style={{ backgroundColor: pattern.colorLight, borderLeft: `3px solid ${pattern.color}` }}
        >
          <p className="text-[15px] leading-[1.7] text-text-primary">
            Este diagnóstico te muestra qué patrón está operando. Pero hay algo que un diagnóstico
            no puede hacer: mostrarte de dónde viene y cómo se desactiva.
          </p>
        </div>

        <p className="text-[15px] leading-[1.7] text-text-secondary mb-6 text-center">
          Angélica puede leer tu resultado y darte una interpretación personalizada — no genérica,
          no de libro. Basada en lo que tus respuestas revelan sobre tu proceso interno.
        </p>

        {/* WhatsApp button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full py-4 rounded-btn font-medium text-white text-[16px] transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#25D366" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Quiero que Angélica lea mi resultado
        </button>
      </div>

      <p className="text-center text-text-muted text-xs mt-10">
        Diagnóstico creado por Angélica Vargas · Todos los derechos reservados
      </p>
    </div>
  );
}
