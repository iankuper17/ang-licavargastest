export const QUESTIONS = [
  {
    id: 1,
    text: "Cuando algo te duele emocionalmente, lo primero que hacés es:",
    options: [
      { text: "Buscar a alguien que me escuche y me entienda", pattern: "espejo", weight: 2 },
      { text: "Distraerme con algo hasta que pase", pattern: "niebla", weight: 2 },
      { text: "Ponerme a resolver, buscar qué puedo hacer", pattern: "peso", weight: 2 },
      { text: "Darle vueltas en mi cabeza sin llegar a nada", pattern: "laberinto", weight: 2 },
    ],
  },
  {
    id: 2,
    text: "En tus relaciones de pareja, ¿qué frase te suena más familiar?",
    options: [
      { text: '"Siempre termino con el mismo tipo de persona"', pattern: "espejo", weight: 3 },
      { text: '"Me cuesta conectar de verdad, siento una barrera"', pattern: "niebla", weight: 3 },
      { text: '"Siento que doy más de lo que recibo"', pattern: "peso", weight: 3 },
      { text: '"No sé si estoy con la persona correcta"', pattern: "laberinto", weight: 3 },
    ],
  },
  {
    id: 3,
    text: "Un domingo sin planes. ¿Qué es lo más probable que pase?",
    options: [
      { text: "Termino hablando con alguien que me genera emociones fuertes", pattern: "espejo", weight: 2 },
      { text: "Lleno el día de actividades para no quedarme quieto/a", pattern: "niebla", weight: 2 },
      { text: "Aprovecho para adelantar pendientes o ayudar a alguien", pattern: "peso", weight: 2 },
      { text: "Me quedo pensando en todo lo que debería estar haciendo con mi vida", pattern: "laberinto", weight: 2 },
    ],
  },
  {
    id: 4,
    text: "¿Qué te genera más ansiedad?",
    options: [
      { text: "Sentir que voy a volver a caer en lo mismo", pattern: "espejo", weight: 2 },
      { text: "Estar a solas conmigo mismo/a sin distracciones", pattern: "niebla", weight: 3 },
      { text: "Que algo importante dependa de otra persona", pattern: "peso", weight: 3 },
      { text: "Tener que tomar una decisión grande", pattern: "laberinto", weight: 3 },
    ],
  },
  {
    id: 5,
    text: "Si pudieras resolver UNA cosa de tu vida ahora mismo, sería:",
    options: [
      { text: "Dejar de repetir las mismas historias en mis relaciones", pattern: "espejo", weight: 3 },
      { text: "Sentir algo de verdad, sin la sensación de estar desconectado/a", pattern: "niebla", weight: 3 },
      { text: "Poder soltar el control sin sentir que todo se derrumba", pattern: "peso", weight: 3 },
      { text: "Tener claridad sobre qué camino tomar", pattern: "laberinto", weight: 3 },
    ],
  },
  {
    id: 6,
    text: 'Cuando alguien cercano te dice "¿cómo estás de verdad?", tu reacción interna es:',
    options: [
      { text: "Ganas de hablar pero miedo a ser demasiado", pattern: "espejo", weight: 2 },
      { text: '"Bien" — aunque no sea cierto', pattern: "niebla", weight: 3 },
      { text: "Cambio el tema y pregunto cómo están ellos", pattern: "peso", weight: 2 },
      { text: "No sé bien qué responder porque ni yo sé cómo estoy", pattern: "laberinto", weight: 2 },
    ],
  },
  {
    id: 7,
    text: "¿Cuál de estas frases dirías más seguido (aunque sea solo en tu cabeza)?",
    options: [
      { text: '"Esto ya lo viví antes"', pattern: "espejo", weight: 3 },
      { text: '"No quiero pensar en eso ahora"', pattern: "niebla", weight: 3 },
      { text: '"Si no lo hago yo, no lo hace nadie"', pattern: "peso", weight: 3 },
      { text: '"No sé qué es lo que realmente quiero"', pattern: "laberinto", weight: 3 },
    ],
  },
  {
    id: 8,
    text: "Pensá en la última vez que te sentiste realmente mal. ¿Qué hiciste?",
    options: [
      { text: "Llamé o escribí a alguien — necesitaba sentirme acompañado/a", pattern: "espejo", weight: 2 },
      { text: "Me mantuve ocupado/a hasta que se me pasó", pattern: "niebla", weight: 2 },
      { text: "Me tragué todo y seguí funcionando", pattern: "peso", weight: 2 },
      { text: "Le di vueltas y vueltas sin poder soltarlo", pattern: "laberinto", weight: 2 },
    ],
  },
  {
    id: 9,
    text: "En tu familia, ¿qué rol sentís que te tocó?",
    options: [
      { text: "El/la que absorbe las emociones de todos", pattern: "espejo", weight: 2 },
      { text: "El/la que se adapta y no genera problemas", pattern: "niebla", weight: 2 },
      { text: "El/la que resuelve y sostiene", pattern: "peso", weight: 3 },
      { text: "El/la que nunca encajó del todo", pattern: "laberinto", weight: 2 },
    ],
  },
  {
    id: 10,
    text: "¿Qué es lo que más te frustra de vos mismo/a?",
    options: [
      { text: "Que sigo cayendo en lo mismo aunque ya sé que me hace mal", pattern: "espejo", weight: 3 },
      { text: "Que sé que hay algo que debería enfrentar pero no puedo", pattern: "niebla", weight: 3 },
      { text: "Que no puedo dejar de cargar con todo", pattern: "peso", weight: 2 },
      { text: "Que no logro avanzar aunque tengo todo para hacerlo", pattern: "laberinto", weight: 3 },
    ],
  },
  {
    id: 11,
    text: "Si Angélica pudiera decirte UNA verdad sobre vos, ¿cuál te daría más miedo escuchar?",
    options: [
      { text: '"Seguís buscando en otros lo que tenés que resolver en vos"', pattern: "espejo", weight: 3 },
      { text: '"Llevás años evitando lo que realmente sentís"', pattern: "niebla", weight: 3 },
      { text: '"No sos tan fuerte como te obligás a ser"', pattern: "peso", weight: 3 },
      { text: '"Ya sabés la respuesta, solo tenés miedo de aceptarla"', pattern: "laberinto", weight: 3 },
    ],
  },
  {
    id: 12,
    text: "Ahora mismo, ¿qué necesitás más?",
    options: [
      { text: "Entender por qué repito lo que repito", pattern: "espejo", weight: 2 },
      { text: "Reconectarme con lo que siento de verdad", pattern: "niebla", weight: 2 },
      { text: "Permiso para soltar y descansar", pattern: "peso", weight: 2 },
      { text: "Claridad. Solo claridad.", pattern: "laberinto", weight: 2 },
    ],
  },
];
