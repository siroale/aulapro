export interface Course {
  id: string;
  code: string;
  name: string;
  department: "DEFIDER" | "INDUSTRIAS" | "Miscelánea";
  image: string;
  description: string;
  instructor: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: "pdf" | "video" | "quiz" | "assignment";
  dueDate?: string;
  isNew?: boolean;
}

export interface CalendarEvent {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  date: string;
  type: "exam" | "assignment" | "project" | "other";
  description: string;
}

export interface ForumReply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  votes: number;
  parentReplyId?: string; // For nested replies
}

export interface ForumThread {
  id: string;
  courseId: string;
  author: string;
  avatar: string;
  title: string;
  preview: string;
  content: string;
  tags: string[];
  replies: ForumReply[];
  lastActivity: string;
  views: number;
  votes: number;
}

export const courses: Course[] = [
  {
    id: "1",
    code: "DEF-101",
    name: "Fundamentos de Brainrot",
    department: "DEFIDER",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    description: "Curso introductorio sobre los principios fundamentales de la ingeniería.",
    instructor: "Dra. María González",
    modules: [
      {
        id: "m1",
        title: "Unidad 1: Introducción",
        units: [
          {
            id: "u1",
            title: "Módulo 1.1: Conceptos Básicos",
            lessons: [
              { id: "l1", title: "Introducción a la Ingeniería", type: "video" },
              { id: "l2", title: "Historia y Evolución", type: "pdf", isNew: true },
              { id: "l3", title: "Principios Fundamentales", type: "pdf" },
              { id: "l4", title: "Quiz: Conceptos Fundamentales", type: "quiz" },
              { id: "l5", title: "Lectura Complementaria 1", type: "pdf" },
              { id: "l6", title: "Video Tutorial: Herramientas", type: "video" },
              { id: "l7", title: "Ejercicios Prácticos", type: "assignment" },
            ],
          },
          {
            id: "u2",
            title: "Módulo 1.2: Metodología",
            lessons: [
              { id: "l8", title: "Método Científico", type: "video" },
              { id: "l9", title: "Resolución de Problemas", type: "pdf" },
              { id: "l10", title: "Casos de Estudio", type: "pdf", isNew: true },
              { id: "l11", title: "Tarea 1", type: "assignment", dueDate: "2025-10-15" },
              { id: "l12", title: "Quiz: Metodología", type: "quiz" },
              { id: "l13", title: "Ejemplos Prácticos", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m2",
        title: "Unidad 2: Aplicaciones",
        units: [
          {
            id: "u3",
            title: "Módulo 2.1: Casos Prácticos",
            lessons: [
              { id: "l14", title: "Estudio de Caso 1", type: "video" },
              { id: "l15", title: "Análisis de Proyectos", type: "pdf" },
              { id: "l16", title: "Casos Internacionales", type: "pdf" },
              { id: "l17", title: "Taller de Análisis", type: "assignment" },
              { id: "l18", title: "Quiz: Casos Prácticos", type: "quiz" },
              { id: "l19", title: "Material Complementario", type: "pdf" },
            ],
          },
          {
            id: "u4",
            title: "Módulo 2.2: Proyectos",
            lessons: [
              { id: "l20", title: "Planificación de Proyectos", type: "video" },
              { id: "l21", title: "Gestión de Recursos", type: "pdf" },
              { id: "l22", title: "Tarea 2: Proyecto Integrador", type: "assignment", dueDate: "2025-10-25" },
              { id: "l23", title: "Evaluación de Proyectos", type: "pdf" },
              { id: "l24", title: "Quiz: Gestión", type: "quiz" },
            ],
          },
        ],
      },
      {
        id: "m3",
        title: "Unidad 3: Técnicas Avanzadas",
        units: [
          {
            id: "u5",
            title: "Módulo 3.1: Optimización",
            lessons: [
              { id: "l25", title: "Introducción a la Optimización", type: "video" },
              { id: "l26", title: "Algoritmos Básicos", type: "pdf" },
              { id: "l27", title: "Ejercicios de Optimización", type: "assignment" },
              { id: "l28", title: "Casos Complejos", type: "pdf" },
              { id: "l29", title: "Quiz: Optimización", type: "quiz" },
              { id: "l30", title: "Laboratorio Práctico", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m4",
        title: "Unidad 4: Integración",
        units: [
          {
            id: "u6",
            title: "Módulo 4.1: Proyecto Final",
            lessons: [
              { id: "l31", title: "Requisitos del Proyecto", type: "pdf" },
              { id: "l32", title: "Guía de Desarrollo", type: "video" },
              { id: "l33", title: "Ejemplos de Proyectos", type: "pdf" },
              { id: "l34", title: "Proyecto Final", type: "assignment", dueDate: "2025-11-10" },
              { id: "l35", title: "Rúbrica de Evaluación", type: "pdf" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    code: "IND-201",
    name: "Sistemas de Producción",
    department: "INDUSTRIAS",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    description: "Análisis y diseño de sistemas productivos industriales.",
    instructor: "Ing. Carlos Rodríguez",
    modules: [
      {
        id: "m5",
        title: "Unidad 1: Fundamentos",
        units: [
          {
            id: "u7",
            title: "Módulo 1.1: Introducción a la Producción",
            lessons: [
              { id: "l36", title: "Conceptos de Producción", type: "video" },
              { id: "l37", title: "Tipos de Sistemas", type: "pdf" },
              { id: "l38", title: "Evaluación Inicial", type: "quiz" },
              { id: "l39", title: "Historia de la Producción", type: "pdf", isNew: true },
              { id: "l40", title: "Casos de Estudio", type: "video" },
              { id: "l41", title: "Tarea: Análisis de Sistema", type: "assignment" },
            ],
          },
          {
            id: "u8",
            title: "Módulo 1.2: Procesos Industriales",
            lessons: [
              { id: "l42", title: "Tipos de Procesos", type: "video" },
              { id: "l43", title: "Diseño de Procesos", type: "pdf" },
              { id: "l44", title: "Laboratorio: Simulación", type: "assignment" },
              { id: "l45", title: "Quiz: Procesos", type: "quiz" },
              { id: "l46", title: "Material Adicional", type: "pdf" },
            ],
          },
        ],
      },
      {
        id: "m6",
        title: "Unidad 2: Planeación",
        units: [
          {
            id: "u9",
            title: "Módulo 2.1: Planeación Agregada",
            lessons: [
              { id: "l47", title: "Conceptos de Planeación", type: "video" },
              { id: "l48", title: "Modelos de Planeación", type: "pdf" },
              { id: "l49", title: "Ejercicios Prácticos", type: "assignment" },
              { id: "l50", title: "Casos Empresariales", type: "pdf", isNew: true },
              { id: "l51", title: "Quiz: Planeación", type: "quiz" },
              { id: "l52", title: "Software de Planeación", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m7",
        title: "Unidad 3: Control de Inventario",
        units: [
          {
            id: "u10",
            title: "Módulo 3.1: Gestión de Inventarios",
            lessons: [
              { id: "l53", title: "Modelos de Inventario", type: "video" },
              { id: "l54", title: "EOQ y Variantes", type: "pdf" },
              { id: "l55", title: "Taller de Inventarios", type: "assignment", dueDate: "2025-10-20" },
              { id: "l56", title: "Costos de Inventario", type: "pdf" },
              { id: "l57", title: "Quiz: Inventarios", type: "quiz" },
              { id: "l58", title: "Casos Reales", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m8",
        title: "Unidad 4: Mejora Continua",
        units: [
          {
            id: "u11",
            title: "Módulo 4.1: Lean Manufacturing",
            lessons: [
              { id: "l59", title: "Principios Lean", type: "video" },
              { id: "l60", title: "Herramientas Lean", type: "pdf" },
              { id: "l61", title: "Proyecto Lean", type: "assignment", dueDate: "2025-11-05" },
              { id: "l62", title: "Six Sigma", type: "pdf" },
              { id: "l63", title: "Quiz Final", type: "quiz" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    code: "IND-305",
    name: "Control de Calidad",
    department: "INDUSTRIAS",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    description: "Técnicas y metodologías para el control de calidad en procesos industriales.",
    instructor: "Dra. Ana Martínez",
    modules: [
      {
        id: "m9",
        title: "Unidad 1: Estadística Aplicada",
        units: [
          {
            id: "u12",
            title: "Módulo 1.1: Control Estadístico",
            lessons: [
              { id: "l64", title: "Gráficos de Control", type: "video" },
              { id: "l65", title: "Muestreo", type: "pdf" },
              { id: "l66", title: "Proyecto 1", type: "assignment", dueDate: "2025-10-20" },
              { id: "l67", title: "Distribuciones Estadísticas", type: "pdf", isNew: true },
              { id: "l68", title: "Quiz: Estadística", type: "quiz" },
              { id: "l69", title: "Ejercicios Prácticos", type: "video" },
            ],
          },
          {
            id: "u13",
            title: "Módulo 1.2: Capacidad de Proceso",
            lessons: [
              { id: "l70", title: "Índices Cp y Cpk", type: "video" },
              { id: "l71", title: "Análisis de Capacidad", type: "pdf" },
              { id: "l72", title: "Taller Práctico", type: "assignment" },
              { id: "l73", title: "Quiz: Capacidad", type: "quiz" },
              { id: "l74", title: "Casos de Estudio", type: "pdf" },
            ],
          },
        ],
      },
      {
        id: "m10",
        title: "Unidad 2: Sistemas de Calidad",
        units: [
          {
            id: "u14",
            title: "Módulo 2.1: ISO 9001",
            lessons: [
              { id: "l75", title: "Introducción a ISO", type: "video" },
              { id: "l76", title: "Requisitos de la Norma", type: "pdf" },
              { id: "l77", title: "Auditorías Internas", type: "pdf", isNew: true },
              { id: "l78", title: "Proyecto: Implementación ISO", type: "assignment", dueDate: "2025-11-01" },
              { id: "l79", title: "Quiz: ISO 9001", type: "quiz" },
              { id: "l80", title: "Casos de Certificación", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m11",
        title: "Unidad 3: Herramientas de Calidad",
        units: [
          {
            id: "u15",
            title: "Módulo 3.1: 7 Herramientas Básicas",
            lessons: [
              { id: "l81", title: "Diagrama de Ishikawa", type: "video" },
              { id: "l82", title: "Diagrama de Pareto", type: "pdf" },
              { id: "l83", title: "Histogramas", type: "pdf" },
              { id: "l84", title: "Taller de Herramientas", type: "assignment" },
              { id: "l85", title: "Quiz: Herramientas", type: "quiz" },
              { id: "l86", title: "Ejercicios Aplicados", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m12",
        title: "Unidad 4: Mejora de Procesos",
        units: [
          {
            id: "u16",
            title: "Módulo 4.1: DMAIC",
            lessons: [
              { id: "l87", title: "Metodología DMAIC", type: "video" },
              { id: "l88", title: "Definir y Medir", type: "pdf" },
              { id: "l89", title: "Analizar y Mejorar", type: "pdf" },
              { id: "l90", title: "Proyecto Final DMAIC", type: "assignment", dueDate: "2025-11-15" },
              { id: "l91", title: "Quiz Final", type: "quiz" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    code: "MISC-100",
    name: "Ética Profesional",
    department: "Miscelánea",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    description: "Principios éticos y responsabilidad profesional.",
    instructor: "Lic. Roberto Silva",
    modules: [
      {
        id: "m13",
        title: "Unidad 1: Fundamentos de Ética",
        units: [
          {
            id: "u17",
            title: "Módulo 1.1: Introducción",
            lessons: [
              { id: "l92", title: "¿Qué es la Ética?", type: "video" },
              { id: "l93", title: "Códigos de Conducta", type: "pdf" },
              { id: "l94", title: "Teorías Éticas", type: "pdf", isNew: true },
              { id: "l95", title: "Quiz: Fundamentos", type: "quiz" },
              { id: "l96", title: "Casos Introductorios", type: "video" },
              { id: "l97", title: "Reflexión Ética", type: "assignment" },
            ],
          },
          {
            id: "u18",
            title: "Módulo 1.2: Responsabilidad Profesional",
            lessons: [
              { id: "l98", title: "Responsabilidad Social", type: "video" },
              { id: "l99", title: "Dilemas Profesionales", type: "pdf" },
              { id: "l100", title: "Ensayo: Responsabilidad", type: "assignment", dueDate: "2025-10-30" },
              { id: "l101", title: "Quiz: Responsabilidad", type: "quiz" },
            ],
          },
        ],
      },
      {
        id: "m14",
        title: "Unidad 2: Ética en la Ingeniería",
        units: [
          {
            id: "u19",
            title: "Módulo 2.1: Casos de Estudio",
            lessons: [
              { id: "l102", title: "Casos Históricos", type: "video" },
              { id: "l103", title: "Análisis de Decisiones", type: "pdf" },
              { id: "l104", title: "Debate Ético", type: "assignment" },
              { id: "l105", title: "Sostenibilidad", type: "pdf", isNew: true },
              { id: "l106", title: "Quiz: Casos", type: "quiz" },
            ],
          },
        ],
      },
      {
        id: "m15",
        title: "Unidad 3: Ética y Sociedad",
        units: [
          {
            id: "u20",
            title: "Módulo 3.1: Impacto Social",
            lessons: [
              { id: "l107", title: "Tecnología y Sociedad", type: "video" },
              { id: "l108", title: "Consecuencias de Decisiones", type: "pdf" },
              { id: "l109", title: "Proyecto: Análisis de Impacto", type: "assignment", dueDate: "2025-11-08" },
              { id: "l110", title: "Quiz: Impacto Social", type: "quiz" },
            ],
          },
        ],
      },
      {
        id: "m16",
        title: "Unidad 4: Proyecto Final",
        units: [
          {
            id: "u21",
            title: "Módulo 4.1: Integración",
            lessons: [
              { id: "l111", title: "Guía del Proyecto Final", type: "pdf" },
              { id: "l112", title: "Ejemplos de Proyectos", type: "video" },
              { id: "l113", title: "Proyecto Final", type: "assignment", dueDate: "2025-11-20" },
              { id: "l114", title: "Presentación Oral", type: "assignment", dueDate: "2025-11-22" },
            ],
          },
        ],
      },
    ],
  },
];

export const calendarEvents: CalendarEvent[] = [
  // DEF-101 events
  {
    id: "e1",
    courseId: "1",
    courseName: "DEF-101",
    title: "Examen Parcial 1",
    date: "2025-10-05",
    type: "exam",
    description: "Primer examen parcial - Unidades 1 y 2",
  },
  {
    id: "e2",
    courseId: "1",
    courseName: "DEF-101",
    title: "Entrega Tarea 1",
    date: "2025-10-15",
    type: "assignment",
    description: "Tarea sobre metodología científica",
  },
  {
    id: "e15",
    courseId: "1",
    courseName: "DEF-101",
    title: "Entrega Tarea 2",
    date: "2025-10-25",
    type: "assignment",
    description: "Proyecto integrador",
  },
  {
    id: "e16",
    courseId: "1",
    courseName: "DEF-101",
    title: "Examen Parcial 2",
    date: "2025-10-30",
    type: "exam",
    description: "Segundo examen parcial",
  },
  {
    id: "e17",
    courseId: "1",
    courseName: "DEF-101",
    title: "Proyecto Final",
    date: "2025-11-10",
    type: "project",
    description: "Entrega del proyecto final del curso",
  },
  
  // IND-201 events
  {
    id: "e3",
    courseId: "2",
    courseName: "IND-201",
    title: "Proyecto de Análisis",
    date: "2025-10-12",
    type: "project",
    description: "Proyecto de análisis de sistemas de producción",
  },
  {
    id: "e5",
    courseId: "2",
    courseName: "IND-201",
    title: "Examen Final",
    date: "2025-10-28",
    type: "exam",
    description: "Examen final de sistemas de producción",
  },
  {
    id: "e9",
    courseId: "2",
    courseName: "IND-201",
    title: "Visita Industrial",
    date: "2025-10-22",
    type: "other",
    description: "Visita a planta de producción",
  },
  {
    id: "e18",
    courseId: "2",
    courseName: "IND-201",
    title: "Taller de Inventarios",
    date: "2025-10-20",
    type: "assignment",
    description: "Taller práctico de gestión de inventarios",
  },
  {
    id: "e19",
    courseId: "2",
    courseName: "IND-201",
    title: "Proyecto Lean",
    date: "2025-11-05",
    type: "project",
    description: "Proyecto de mejora continua",
  },
  
  // IND-305 events
  {
    id: "e4",
    courseId: "3",
    courseName: "IND-305",
    title: "Entrega Proyecto 1",
    date: "2025-10-20",
    type: "assignment",
    description: "Proyecto sobre control estadístico de calidad",
  },
  {
    id: "e7",
    courseId: "3",
    courseName: "IND-305",
    title: "Examen Parcial 2",
    date: "2025-10-25",
    type: "exam",
    description: "Segundo parcial de control de calidad",
  },
  {
    id: "e20",
    courseId: "3",
    courseName: "IND-305",
    title: "Proyecto ISO",
    date: "2025-11-01",
    type: "project",
    description: "Implementación de sistema ISO 9001",
  },
  {
    id: "e21",
    courseId: "3",
    courseName: "IND-305",
    title: "Proyecto Final DMAIC",
    date: "2025-11-15",
    type: "project",
    description: "Proyecto final de mejora de procesos",
  },
  
  // MISC-100 events
  {
    id: "e6",
    courseId: "4",
    courseName: "MISC-100",
    title: "Presentación Oral",
    date: "2025-10-08",
    type: "other",
    description: "Presentación de casos de ética profesional",
  },
  {
    id: "e8",
    courseId: "1",
    courseName: "DEF-101",
    title: "Taller Práctico",
    date: "2025-10-18",
    type: "other",
    description: "Taller de resolución de problemas",
  },
  {
    id: "e10",
    courseId: "4",
    courseName: "MISC-100",
    title: "Ensayo Final",
    date: "2025-10-30",
    type: "assignment",
    description: "Ensayo sobre dilemas éticos",
  },
  {
    id: "e22",
    courseId: "4",
    courseName: "MISC-100",
    title: "Proyecto de Impacto",
    date: "2025-11-08",
    type: "project",
    description: "Análisis de impacto social",
  },
  {
    id: "e23",
    courseId: "4",
    courseName: "MISC-100",
    title: "Proyecto Final",
    date: "2025-11-20",
    type: "project",
    description: "Proyecto final integrador",
  },
  {
    id: "e24",
    courseId: "4",
    courseName: "MISC-100",
    title: "Presentación Final",
    date: "2025-11-22",
    type: "other",
    description: "Presentación oral del proyecto final",
  },
];

export const forumThreads: ForumThread[] = [
  {
    id: "t1",
    courseId: "1",
    author: "Juan Pérez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    title: "Dudas sobre el primer examen parcial",
    preview: "Hola a todos, tengo algunas dudas sobre los temas que entran en el primer parcial...",
    content: "Hola a todos, tengo algunas dudas sobre los temas que entran en el primer parcial. ¿Alguien sabe si entran los temas de la unidad 2 completa o solo hasta el módulo 2.1? También me gustaría saber si hay algún formato específico que debamos seguir para las respuestas de desarrollo.",
    tags: ["Certamen", "Duda"],
    replies: [
      {
        id: "r1",
        author: "Profesor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prof",
        content: "El examen cubre hasta el módulo 2.1 inclusive. Las respuestas de desarrollo deben ser claras y concisas.",
        timestamp: "Hace 1 hora",
        votes: 12,
      },
      {
        id: "r2",
        author: "Ana Torres",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        content: "Gracias por la aclaración, profesor!",
        timestamp: "Hace 45 minutos",
        votes: 3,
        parentReplyId: "r1",
      },
    ],
    lastActivity: "Hace 2 horas",
    views: 45,
    votes: 8,
  },
  {
    id: "t2",
    courseId: "1",
    author: "María López",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    title: "Recursos adicionales para el módulo 1.2",
    preview: "¿Alguien tiene recursos adicionales sobre el método científico? Me gustaría profundizar más...",
    content: "¿Alguien tiene recursos adicionales sobre el método científico? Me gustaría profundizar más en el tema ya que me parece muy interesante y creo que será importante para mi carrera. Agradezco cualquier libro, video o artículo que puedan recomendar.",
    tags: ["Materia", "Consulta"],
    replies: [
      {
        id: "r3",
        author: "Carlos Méndez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosM",
        content: "Te recomiendo el libro 'The Scientific Method' de John Smith. Es excelente!",
        timestamp: "Hace 4 horas",
        votes: 5,
      },
    ],
    lastActivity: "Hace 5 horas",
    views: 32,
    votes: 5,
  },
  {
    id: "t3",
    courseId: "1",
    author: "Pedro García",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    title: "Grupo de estudio para la tarea 1",
    preview: "Estoy buscando formar un grupo de estudio para trabajar en la tarea 1. ¿Alguien se anima?",
    content: "Estoy buscando formar un grupo de estudio para trabajar en la tarea 1. ¿Alguien se anima? Podemos reunirnos los fines de semana en la biblioteca o hacer videoconferencias si prefieren. La idea es compartir ideas y ayudarnos mutuamente.",
    tags: ["Tarea", "Consulta"],
    replies: [
      {
        id: "r4",
        author: "Sofia Ramírez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
        content: "Me interesa! Yo prefiero reuniones presenciales.",
        timestamp: "Hace 20 horas",
        votes: 4,
      },
      {
        id: "r5",
        author: "Diego Castro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
        content: "Yo también me uno! Cuenten conmigo.",
        timestamp: "Hace 18 horas",
        votes: 3,
      },
    ],
    lastActivity: "Hace 1 día",
    views: 67,
    votes: 12,
  },
  {
    id: "t4",
    courseId: "1",
    author: "Laura Sánchez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
    title: "Consulta sobre el video de la clase 3",
    preview: "No me queda claro el concepto que se explica en el minuto 15:30 del video...",
    content: "No me queda claro el concepto que se explica en el minuto 15:30 del video de la clase 3. ¿Alguien me podría explicar con otras palabras? Me está costando entender la diferencia entre los dos enfoques.",
    tags: ["Materia", "Duda"],
    replies: [
      {
        id: "r6",
        author: "Profesor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prof",
        content: "La diferencia principal está en el enfoque metodológico. El primero es deductivo y el segundo inductivo.",
        timestamp: "Hace 2 días",
        votes: 8,
      },
    ],
    lastActivity: "Hace 3 días",
    views: 28,
    votes: 3,
  },
  {
    id: "t5",
    courseId: "1",
    author: "Carlos Ruiz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    title: "Compartiendo apuntes de la Unidad 1",
    preview: "Hola, comparto mis apuntes de la primera unidad por si le sirven a alguien...",
    content: "Hola, comparto mis apuntes de la primera unidad por si le sirven a alguien. Están bastante completos y tienen algunos ejemplos adicionales que encontré. Espero que les sean útiles para el estudio!",
    tags: ["Materia"],
    replies: [
      {
        id: "r7",
        author: "Valentina Ortiz",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vale",
        content: "Muchas gracias! Me van a servir muchísimo.",
        timestamp: "Hace 6 días",
        votes: 6,
      },
      {
        id: "r8",
        author: "Roberto Silva",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
        content: "Excelentes apuntes, muy bien organizados!",
        timestamp: "Hace 5 días",
        votes: 4,
      },
    ],
    lastActivity: "Hace 1 semana",
    views: 89,
    votes: 15,
  },
];
