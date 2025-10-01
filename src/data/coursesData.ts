export interface Course {
  id: string;
  code: string;
  name: string;
  department: "INFORMATICA" | "INDUSTRIAS" | "Miscelánea";
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
    code: "INF-285",
    name: "Computación Científica",
    department: "INFORMATICA",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    description: "Curso sobre métodos numéricos y computacionales aplicados a problemas científicos.",
    instructor: "Roberto León",
    modules: [
      {
        id: "m1",
        title: "Unidad 1: Introducción",
        units: [
          {
            id: "u1",
            title: "Módulo 1.1: Conceptos Básicos",
            lessons: [
              { id: "l1", title: "Introducción a Computación Científica", type: "video" },
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
              { id: "l8", title: "Método Numérico", type: "video" },
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
              { id: "l15", title: "Análisis de Algoritmos", type: "pdf" },
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
    code: "ICN-270",
    name: "Información y Matemática Financiera",
    department: "INDUSTRIAS",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    description: "Análisis financiero y matemáticas aplicadas a la toma de decisiones empresariales.",
    instructor: "Myriam Olea",
    modules: [
      {
        id: "m5",
        title: "Unidad 1: Fundamentos",
        units: [
          {
            id: "u7",
            title: "Módulo 1.1: Introducción a las Finanzas",
            lessons: [
              { id: "l36", title: "Conceptos Financieros", type: "video" },
              { id: "l37", title: "Tipos de Inversiones", type: "pdf" },
              { id: "l38", title: "Evaluación Inicial", type: "quiz" },
              { id: "l39", title: "Historia de las Finanzas", type: "pdf", isNew: true },
              { id: "l40", title: "Casos de Estudio", type: "video" },
              { id: "l41", title: "Tarea: Análisis Financiero", type: "assignment" },
            ],
          },
          {
            id: "u8",
            title: "Módulo 1.2: Matemática Financiera",
            lessons: [
              { id: "l42", title: "Interés Simple y Compuesto", type: "video" },
              { id: "l43", title: "Valor Presente y Futuro", type: "pdf" },
              { id: "l44", title: "Laboratorio: Cálculos Financieros", type: "assignment" },
              { id: "l45", title: "Quiz: Matemática Financiera", type: "quiz" },
              { id: "l46", title: "Material Adicional", type: "pdf" },
            ],
          },
        ],
      },
      {
        id: "m6",
        title: "Unidad 2: Evaluación de Proyectos",
        units: [
          {
            id: "u9",
            title: "Módulo 2.1: Criterios de Evaluación",
            lessons: [
              { id: "l47", title: "VAN y TIR", type: "video" },
              { id: "l48", title: "Modelos de Evaluación", type: "pdf" },
              { id: "l49", title: "Ejercicios Prácticos", type: "assignment" },
              { id: "l50", title: "Casos Empresariales", type: "pdf", isNew: true },
              { id: "l51", title: "Quiz: Evaluación", type: "quiz" },
              { id: "l52", title: "Software de Análisis", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m7",
        title: "Unidad 3: Riesgo e Incertidumbre",
        units: [
          {
            id: "u10",
            title: "Módulo 3.1: Análisis de Riesgo",
            lessons: [
              { id: "l53", title: "Conceptos de Riesgo", type: "video" },
              { id: "l54", title: "Modelos de Análisis", type: "pdf" },
              { id: "l55", title: "Taller de Riesgo", type: "assignment", dueDate: "2025-10-20" },
              { id: "l56", title: "Diversificación", type: "pdf" },
              { id: "l57", title: "Quiz: Riesgo", type: "quiz" },
              { id: "l58", title: "Casos Reales", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m8",
        title: "Unidad 4: Mercados Financieros",
        units: [
          {
            id: "u11",
            title: "Módulo 4.1: Instrumentos Financieros",
            lessons: [
              { id: "l59", title: "Tipos de Instrumentos", type: "video" },
              { id: "l60", title: "Bonos y Acciones", type: "pdf" },
              { id: "l61", title: "Proyecto de Inversión", type: "assignment", dueDate: "2025-11-05" },
              { id: "l62", title: "Derivados Financieros", type: "pdf" },
              { id: "l63", title: "Quiz Final", type: "quiz" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    code: "INF-343",
    name: "Sistemas Distribuidos",
    department: "INFORMATICA",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    description: "Diseño, implementación y análisis de sistemas distribuidos y arquitecturas escalables.",
    instructor: "Jorge Díaz",
    modules: [
      {
        id: "m9",
        title: "Unidad 1: Fundamentos de Sistemas Distribuidos",
        units: [
          {
            id: "u12",
            title: "Módulo 1.1: Arquitecturas Distribuidas",
            lessons: [
              { id: "l64", title: "Conceptos Básicos", type: "video" },
              { id: "l65", title: "Modelos de Arquitectura", type: "pdf" },
              { id: "l66", title: "Proyecto 1", type: "assignment", dueDate: "2025-10-20" },
              { id: "l67", title: "Comunicación entre Procesos", type: "pdf", isNew: true },
              { id: "l68", title: "Quiz: Arquitecturas", type: "quiz" },
              { id: "l69", title: "Ejercicios Prácticos", type: "video" },
            ],
          },
          {
            id: "u13",
            title: "Módulo 1.2: Coordinación y Sincronización",
            lessons: [
              { id: "l70", title: "Relojes Lógicos", type: "video" },
              { id: "l71", title: "Algoritmos de Consenso", type: "pdf" },
              { id: "l72", title: "Taller Práctico", type: "assignment" },
              { id: "l73", title: "Quiz: Sincronización", type: "quiz" },
              { id: "l74", title: "Casos de Estudio", type: "pdf" },
            ],
          },
        ],
      },
      {
        id: "m10",
        title: "Unidad 2: Tolerancia a Fallos",
        units: [
          {
            id: "u14",
            title: "Módulo 2.1: Replicación y Consistencia",
            lessons: [
              { id: "l75", title: "Modelos de Consistencia", type: "video" },
              { id: "l76", title: "Protocolos de Replicación", type: "pdf" },
              { id: "l77", title: "Sistemas de Alta Disponibilidad", type: "pdf", isNew: true },
              { id: "l78", title: "Proyecto: Sistema Replicado", type: "assignment", dueDate: "2025-11-01" },
              { id: "l79", title: "Quiz: Replicación", type: "quiz" },
              { id: "l80", title: "Casos de Implementación", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m11",
        title: "Unidad 3: Sistemas de Almacenamiento",
        units: [
          {
            id: "u15",
            title: "Módulo 3.1: Bases de Datos Distribuidas",
            lessons: [
              { id: "l81", title: "Fragmentación y Replicación", type: "video" },
              { id: "l82", title: "Transacciones Distribuidas", type: "pdf" },
              { id: "l83", title: "NoSQL y NewSQL", type: "pdf" },
              { id: "l84", title: "Taller de Implementación", type: "assignment" },
              { id: "l85", title: "Quiz: Almacenamiento", type: "quiz" },
              { id: "l86", title: "Ejercicios Aplicados", type: "video" },
            ],
          },
        ],
      },
      {
        id: "m12",
        title: "Unidad 4: Proyecto Final",
        units: [
          {
            id: "u16",
            title: "Módulo 4.1: Sistema Distribuido Completo",
            lessons: [
              { id: "l87", title: "Especificaciones del Proyecto", type: "video" },
              { id: "l88", title: "Diseño del Sistema", type: "pdf" },
              { id: "l89", title: "Implementación", type: "pdf" },
              { id: "l90", title: "Proyecto Final", type: "assignment", dueDate: "2025-11-15" },
              { id: "l91", title: "Quiz Final", type: "quiz" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    code: "INF-266",
    name: "Sistemas de Gestión",
    department: "INFORMATICA",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    description: "Análisis, diseño e implementación de sistemas de información para la gestión empresarial.",
    instructor: "Mauricio Olivares",
    modules: [
      {
        id: "m13",
        title: "Unidad 1: Fundamentos de Sistemas de Gestión",
        units: [
          {
            id: "u17",
            title: "Módulo 1.1: Introducción",
            lessons: [
              { id: "l92", title: "¿Qué son los Sistemas de Gestión?", type: "video" },
              { id: "l93", title: "Tipos de Sistemas", type: "pdf" },
              { id: "l94", title: "ERP y CRM", type: "pdf", isNew: true },
              { id: "l95", title: "Quiz: Fundamentos", type: "quiz" },
              { id: "l96", title: "Casos Introductorios", type: "video" },
              { id: "l97", title: "Análisis de Sistemas", type: "assignment" },
            ],
          },
          {
            id: "u18",
            title: "Módulo 1.2: Análisis de Requisitos",
            lessons: [
              { id: "l98", title: "Levantamiento de Requisitos", type: "video" },
              { id: "l99", title: "Modelado de Procesos", type: "pdf" },
              { id: "l100", title: "Proyecto: Análisis de Requisitos", type: "assignment", dueDate: "2025-10-30" },
              { id: "l101", title: "Quiz: Análisis", type: "quiz" },
            ],
          },
        ],
      },
      {
        id: "m14",
        title: "Unidad 2: Diseño de Sistemas",
        units: [
          {
            id: "u19",
            title: "Módulo 2.1: Arquitectura de Sistemas",
            lessons: [
              { id: "l102", title: "Patrones de Diseño", type: "video" },
              { id: "l103", title: "Arquitecturas Empresariales", type: "pdf" },
              { id: "l104", title: "Proyecto de Diseño", type: "assignment" },
              { id: "l105", title: "Microservicios", type: "pdf", isNew: true },
              { id: "l106", title: "Quiz: Diseño", type: "quiz" },
            ],
          },
        ],
      },
      {
        id: "m15",
        title: "Unidad 3: Implementación",
        units: [
          {
            id: "u20",
            title: "Módulo 3.1: Desarrollo de Sistemas",
            lessons: [
              { id: "l107", title: "Metodologías Ágiles", type: "video" },
              { id: "l108", title: "Gestión de Proyectos", type: "pdf" },
              { id: "l109", title: "Proyecto: Implementación", type: "assignment", dueDate: "2025-11-08" },
              { id: "l110", title: "Quiz: Desarrollo", type: "quiz" },
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
            title: "Módulo 4.1: Sistema Integrado",
            lessons: [
              { id: "l111", title: "Guía del Proyecto Final", type: "pdf" },
              { id: "l112", title: "Ejemplos de Sistemas", type: "video" },
              { id: "l113", title: "Proyecto Final", type: "assignment", dueDate: "2025-11-20" },
              { id: "l114", title: "Presentación del Sistema", type: "assignment", dueDate: "2025-11-22" },
            ],
          },
        ],
      },
    ],
  },
];

export const calendarEvents: CalendarEvent[] = [
  // INF-285 events
  {
    id: "e1",
    courseId: "1",
    courseName: "INF-285",
    courseRealName: "Computación Científica",
    title: "Certamen 1",
    date: "2025-10-05",
    type: "exam",
    description: "Primer certamen - Unidades 1 y 2",
  },
  {
    id: "e2",
    courseId: "1",
    courseName: "INF-285",
    courseRealName: "Computación Científica",
    title: "Entrega Tarea 1",
    date: "2025-10-15",
    type: "assignment",
    description: "Tarea sobre métodos numéricos",
  },
  {
    id: "e15",
    courseId: "1",
    courseName: "INF-285",
    courseRealName: "Computación Científica",
    title: "Entrega Tarea 2",
    date: "2025-10-25",
    type: "assignment",
    description: "Proyecto integrador",
  },
  {
    id: "e16",
    courseId: "1",
    courseName: "INF-285",
    courseRealName: "Computación Científica",
    title: "Certamen 2",
    date: "2025-10-30",
    type: "exam",
    description: "Segundo certamen",
  },
  {
    id: "e17",
    courseId: "1",
    courseName: "INF-285",
    courseRealName: "Computación Científica",
    title: "Proyecto Final",
    date: "2025-11-10",
    type: "project",
    description: "Entrega del proyecto final del curso",
  },
  
  // ICN-270 events
  {
    id: "e3",
    courseId: "2",
    courseName: "ICN-270",
    courseRealName: "Información y Matemática Financiera",
    title: "Proyecto de Análisis Financiero",
    date: "2025-10-12",
    type: "project",
    description: "Proyecto de evaluación de inversiones",
  },
  {
    id: "e5",
    courseId: "2",
    courseName: "ICN-270",
    courseRealName: "Información y Matemática Financiera",
    title: "Examen Final",
    date: "2025-10-28",
    type: "exam",
    description: "Examen final de matemática financiera",
  },
  {
    id: "e9",
    courseId: "2",
    courseName: "ICN-270",
    courseRealName: "Información y Matemática Financiera",
    title: "Seminario de Inversiones",
    date: "2025-10-22",
    type: "other",
    description: "Charla con expertos del mercado financiero",
  },
  {
    id: "e18",
    courseId: "2",
    courseName: "ICN-270",
    courseRealName: "Información y Matemática Financiera",
    title: "Taller de Análisis de Riesgo",
    date: "2025-10-20",
    type: "assignment",
    description: "Taller práctico de evaluación de riesgo",
  },
  {
    id: "e19",
    courseId: "2",
    courseName: "ICN-270",
    courseRealName: "Información y Matemática Financiera",
    title: "Proyecto de Inversión",
    date: "2025-11-05",
    type: "project",
    description: "Proyecto de cartera de inversiones",
  },
  
  // INF-343 events
  {
    id: "e4",
    courseId: "3",
    courseName: "INF-343",
    courseRealName: "Sistemas Distribuidos",
    title: "Entrega Proyecto 1",
    date: "2025-10-20",
    type: "assignment",
    description: "Proyecto sobre arquitecturas distribuidas",
  },
  {
    id: "e7",
    courseId: "3",
    courseName: "INF-343",
    courseRealName: "Sistemas Distribuidos",
    title: "Certamen 2",
    date: "2025-10-25",
    type: "exam",
    description: "Segundo certamen de sistemas distribuidos",
  },
  {
    id: "e20",
    courseId: "3",
    courseName: "INF-343",
    courseRealName: "Sistemas Distribuidos",
    title: "Proyecto de Sistema Replicado",
    date: "2025-11-01",
    type: "project",
    description: "Implementación de sistema con replicación",
  },
  {
    id: "e21",
    courseId: "3",
    courseName: "INF-343",
    courseRealName: "Sistemas Distribuidos",
    title: "Proyecto Final",
    date: "2025-11-15",
    type: "project",
    description: "Sistema distribuido completo",
  },
  
  // INF-266 events
  {
    id: "e6",
    courseId: "4",
    courseName: "INF-266",
    courseRealName: "Sistemas de Gestión",
    title: "Presentación de Análisis",
    date: "2025-10-08",
    type: "other",
    description: "Presentación de análisis de sistemas",
  },
  {
    id: "e8",
    courseId: "1",
    courseName: "INF-285",
    courseRealName: "Computación Científica",
    title: "Taller Práctico",
    date: "2025-10-18",
    type: "other",
    description: "Taller de implementación de algoritmos",
  },
  {
    id: "e10",
    courseId: "4",
    courseName: "INF-266",
    courseRealName: "Sistemas de Gestión",
    title: "Entrega Análisis de Requisitos",
    date: "2025-10-30",
    type: "assignment",
    description: "Documento de análisis de requisitos",
  },
  {
    id: "e22",
    courseId: "4",
    courseName: "INF-266",
    courseRealName: "Sistemas de Gestión",
    title: "Proyecto de Implementación",
    date: "2025-11-08",
    type: "project",
    description: "Implementación de sistema de gestión",
  },
  {
    id: "e23",
    courseId: "4",
    courseName: "INF-266",
    courseRealName: "Sistemas de Gestión",
    title: "Proyecto Final",
    date: "2025-11-20",
    type: "project",
    description: "Sistema integrado completo",
  },
  {
    id: "e24",
    courseId: "4",
    courseName: "INF-266",
    courseRealName: "Sistemas de Gestión",
    title: "Presentación Final",
    date: "2025-11-22",
    type: "other",
    description: "Presentación del sistema desarrollado",
  },
];

export const forumThreads: ForumThread[] = [
  {
    id: "t1",
    courseId: "1",
    author: "Juan Pérez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    title: "Dudas sobre el primer certamen",
    preview: "Hola a todos, tengo algunas dudas sobre los temas que entran en el primer certamen...",
    content: "Hola a todos, tengo algunas dudas sobre los temas que entran en el primer certamen. ¿Alguien sabe si entran los temas de la unidad 2 completa o solo hasta el módulo 2.1? También me gustaría saber si hay algún formato específico que debamos seguir para las respuestas de desarrollo.",
    tags: ["Certamen", "Duda"],
    replies: [
      {
        id: "r1",
        author: "Profesor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prof",
        content: "El certamen cubre hasta el módulo 2.1 inclusive. Las respuestas de desarrollo deben ser claras y concisas.",
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
    preview: "¿Alguien tiene recursos adicionales sobre métodos numéricos? Me gustaría profundizar más...",
    content: "¿Alguien tiene recursos adicionales sobre métodos numéricos? Me gustaría profundizar más en el tema ya que me parece muy interesante y creo que será importante para mi carrera. Agradezco cualquier libro, video o artículo que puedan recomendar.",
    tags: ["Materia", "Consulta"],
    replies: [
      {
        id: "r3",
        author: "Carlos Méndez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosM",
        content: "Te recomiendo el libro 'Numerical Methods' de Burden y Faires. Es excelente!",
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
