"use client";

import { useState, useCallback } from "react";
import IntroScreen from "@/components/IntroScreen";
import QuestionScreen from "@/components/QuestionScreen";
import AnalyzingScreen from "@/components/AnalyzingScreen";
import ResultScreen from "@/components/ResultScreen";
import { QUESTIONS } from "@/lib/questions";
import { PATTERNS } from "@/lib/patterns";

function calculateResult(answers) {
  const scores = { espejo: 0, niebla: 0, peso: 0, laberinto: 0 };

  answers.forEach((answerText, index) => {
    const question = QUESTIONS[index];
    const selectedOption = question.options.find((o) => o.text === answerText);
    if (selectedOption) {
      scores[selectedOption.pattern] += selectedOption.weight;
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  const tied = sorted.filter(([, v]) => v === topScore);

  let winner;
  if (tied.length > 1) {
    const w3Counts = {};
    tied.forEach(([k]) => (w3Counts[k] = 0));
    QUESTIONS.forEach((q, qi) => {
      const sel = q.options.find((o) => o.text === answers[qi]);
      if (sel && sel.weight === 3 && w3Counts[sel.pattern] !== undefined) {
        w3Counts[sel.pattern]++;
      }
    });
    winner = Object.entries(w3Counts).sort((a, b) => b[1] - a[1])[0][0];
  } else {
    winner = sorted[0][0];
  }

  return { winner, scores };
}

export default function Home() {
  const [screen, setScreen] = useState("intro");
  const [userData, setUserData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  const [diagnosticoId, setDiagnosticoId] = useState(null);

  const handleStart = useCallback((data) => {
    setUserData(data);
    setScreen("questions");
  }, []);

  const handleAnswer = useCallback(
    (answerText) => {
      const newAnswers = [...answers, answerText];
      setAnswers(newAnswers);

      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setScreen("analyzing");
        const { winner, scores } = calculateResult(newAnswers);
        setResult(winner);

        // Save to Supabase
        fetch("/api/diagnosticos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: userData.nombre,
            email: userData.email,
            telefono: userData.telefono,
            patron_dominante: winner,
            puntaje_espejo: scores.espejo,
            puntaje_niebla: scores.niebla,
            puntaje_peso: scores.peso,
            puntaje_laberinto: scores.laberinto,
            respuestas: newAnswers,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.data?.id) {
              setDiagnosticoId(data.data.id);
            }
          })
          .catch((err) => console.error("Error saving diagnostic:", err));

        // Show result after 2.5s
        setTimeout(() => {
          setScreen("result");
        }, 2500);
      }
    },
    [answers, currentQuestion, userData]
  );

  if (screen === "intro") {
    return <IntroScreen onStart={handleStart} />;
  }

  if (screen === "questions") {
    return (
      <QuestionScreen
        question={QUESTIONS[currentQuestion]}
        questionIndex={currentQuestion}
        totalQuestions={QUESTIONS.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (screen === "analyzing") {
    return <AnalyzingScreen />;
  }

  if (screen === "result" && result) {
    return <ResultScreen result={result} diagnosticoId={diagnosticoId} />;
  }

  return null;
}
