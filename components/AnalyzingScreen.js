"use client";

export default function AnalyzingScreen() {
  return (
    <div className="w-full max-w-[560px] mx-auto px-5 min-h-screen flex flex-col items-center justify-center">
      <div className="animate-fade-up text-center">
        <div
          className="w-12 h-12 border-[3px] border-border border-t-accent rounded-full animate-spin-slow mx-auto mb-6"
        />
        <h2 className="font-display font-semibold text-2xl mb-2">
          Analizando tus respuestas...
        </h2>
        <p className="text-text-secondary text-[15px]">
          Identificando tu patrón dominante
        </p>
      </div>
    </div>
  );
}
