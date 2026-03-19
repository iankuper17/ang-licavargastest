"use client";

import { useState } from "react";

export default function QuestionScreen({ question, questionIndex, totalQuestions, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (optionText) => {
    if (selected !== null) return;
    setSelected(optionText);
    setTimeout(() => {
      onAnswer(optionText);
      setSelected(null);
    }, 400);
  };

  const progress = ((questionIndex) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-[560px] mx-auto px-5 py-12 min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-muted font-medium">
            Pregunta {questionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: "#C45B4A" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center">
        <div key={question.id} className="animate-fade-up">
          <h2
            className="font-display font-semibold leading-snug mb-8"
            style={{ fontSize: "clamp(24px, 5vw, 30px)" }}
          >
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = selected === option.text;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(option.text)}
                  className={`w-full text-left px-5 py-4 rounded-card border transition-all duration-200 text-[15px] leading-relaxed ${
                    isSelected
                      ? "border-text-primary bg-[rgba(42,37,32,0.04)]"
                      : "border-border bg-bg-card hover:border-border-hover"
                  }`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
