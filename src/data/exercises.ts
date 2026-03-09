import { Level, Option } from '../types/Exercise';

export interface ExerciseTemplate {
  situation: string;
  essential: string[];
  irrelevant: string[];
  explanation: string;
  pista: string;
}

export const EXERCISE_TEMPLATES: Record<Level, ExerciseTemplate[]> = {
  basic: [
    {
      situation: "Un sistema escolar guarda estos datos de sus alumnos:",
      essential: ["Nombre", "NIE", "Especialidad", "Sección"],
      irrelevant: ["Color favorito", "Número de zapatos", "Comida preferida"],
      explanation: "Para el control académico, solo necesitamos identificar al estudiante y su ubicación escolar.",
      pista: "Piensa en qué datos aparecerían en tu carnet escolar oficial."
    },
    {
      situation: "Una biblioteca registra préstamos de libros:",
      essential: ["Título del libro", "Código de barras", "Fecha de devolución"],
      irrelevant: ["Color de la portada", "Peso del libro", "Nombre del ilustrador"],
      explanation: "Lo importante es saber qué libro se prestó y cuándo debe regresar.",
      pista: "Imagina que eres el bibliotecario, ¿qué necesitas para no perder el libro?"
    },
    {
      situation: "Una lista de compras para el supermercado:",
      essential: ["Nombre del producto", "Cantidad", "Marca preferida"],
      irrelevant: ["Color del carrito", "Nombre del cajero", "Hora de apertura de la tienda"],
      explanation: "Para comprar lo necesario, solo importa el producto y cuánto necesitas.",
      pista: "Enfócate en lo que realmente vas a meter en tu bolsa de compras."
    }
  ],
  medium: [
    {
      situation: "Un sistema de navegación GPS para conductores:",
      essential: ["Coordenadas actuales", "Destino", "Sentido de las calles", "Tráfico en tiempo real"],
      irrelevant: ["Modelo del auto", "Color del tablero", "Nombre de las tiendas cercanas que están cerradas"],
      explanation: "El GPS necesita saber dónde estás y cómo llegar, ignorando lo que no afecta la ruta.",
      pista: "La abstracción en mapas significa ignorar edificios irrelevantes para enfocarse en las calles."
    },
    {
      situation: "Una aplicación de clima:",
      essential: ["Temperatura", "Probabilidad de lluvia", "Velocidad del viento"],
      irrelevant: ["Nombre del meteorólogo", "Marca de los sensores usados", "Color del cielo en la foto de fondo"],
      explanation: "Los datos meteorológicos son los únicos que afectan tu decisión de llevar paraguas.",
      pista: "Enfócate en los números que realmente describen el estado del tiempo."
    },
    {
      situation: "Registro de una mascota en una veterinaria:",
      essential: ["Especie", "Edad", "Peso", "Historial de vacunas"],
      irrelevant: ["Nombre del juguete favorito", "Color del collar", "Si sabe dar la pata"],
      explanation: "Para la salud de la mascota, los datos médicos y físicos son los únicos esenciales.",
      pista: "Piensa como un doctor: ¿qué información ayuda a curar al animal?"
    }
  ],
  advanced: [
    {
      situation: "Algoritmo para un semáforo inteligente:",
      essential: ["Cantidad de autos esperando", "Tiempo desde el último cambio", "Presencia de peatones"],
      irrelevant: ["Marca de los autos", "Si los conductores están pitando", "Temperatura del asfalto"],
      explanation: "El semáforo debe optimizar el flujo basándose en la demanda real de tráfico.",
      pista: "La abstracción avanzada requiere identificar variables que cambian el comportamiento del sistema."
    },
    {
      situation: "Sistema de inventario para una farmacia:",
      essential: ["Nombre del medicamento", "Fecha de vencimiento", "Cantidad en stock", "Lote de fabricación"],
      irrelevant: ["Diseño de la caja", "Idioma secundario del prospecto", "Ubicación de la fábrica"],
      explanation: "La seguridad del paciente depende de saber qué hay y si aún es apto para el consumo.",
      pista: "En salud, los datos esenciales son aquellos que garantizan la seguridad y disponibilidad."
    },
    {
      situation: "Control de una misión espacial a Marte:",
      essential: ["Nivel de combustible", "Trayectoria orbital", "Integridad del casco", "Suministro de oxígeno"],
      irrelevant: ["Nombre de la mascota del astronauta", "Color de los trajes", "Menú de la cena de ayer"],
      explanation: "En el espacio, solo los sistemas vitales y de navegación determinan el éxito de la misión.",
      pista: "En sistemas críticos, la abstracción salva vidas al ignorar lo trivial."
    }
  ]
};
