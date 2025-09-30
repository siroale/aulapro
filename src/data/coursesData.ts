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

export interface ForumThread {
  id: string;
  courseId: string;
  author: string;
  avatar: string;
  title: string;
  preview: string;
  replies: number;
  lastActivity: string;
  views: number;
}

export const courses: Course[] = [
  {
    id: "1",
    code: "DEF-101",
    name: "Fundamentos de Brainrot",
    department: "DEFIDER",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    description: "Curso introductorio sobre los principios fundamentales de la ingeniería.",
    instructor: "Dr. María González",
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
              { id: "l2", title: "Historia y Evolución", type: "pdf" },
              { id: "l3", title: "Quiz: Conceptos Fundamentales", type: "quiz" },
            ],
          },
          {
            id: "u2",
            title: "Módulo 1.2: Metodología",
            lessons: [
              { id: "l4", title: "Método Científico", type: "video" },
              { id: "l5", title: "Resolución de Problemas", type: "pdf" },
              { id: "l6", title: "Tarea 1", type: "assignment", dueDate: "2025-10-15" },
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
              { id: "l7", title: "Estudio de Caso 1", type: "video" },
              { id: "l8", title: "Análisis de Proyectos", type: "pdf" },
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
        id: "m3",
        title: "Unidad 1: Fundamentos",
        units: [
          {
            id: "u4",
            title: "Módulo 1.1: Introducción a la Producción",
            lessons: [
              { id: "l9", title: "Conceptos de Producción", type: "video" },
              { id: "l10", title: "Tipos de Sistemas", type: "pdf" },
              { id: "l11", title: "Evaluación Inicial", type: "quiz" },
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
        id: "m4",
        title: "Unidad 1: Estadística Aplicada",
        units: [
          {
            id: "u5",
            title: "Módulo 1.1: Control Estadístico",
            lessons: [
              { id: "l12", title: "Gráficos de Control", type: "video" },
              { id: "l13", title: "Muestreo", type: "pdf" },
              { id: "l14", title: "Proyecto 1", type: "assignment", dueDate: "2025-10-20" },
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
        id: "m5",
        title: "Unidad 1: Fundamentos de Ética",
        units: [
          {
            id: "u6",
            title: "Módulo 1.1: Introducción",
            lessons: [
              { id: "l15", title: "¿Qué es la Ética?", type: "video" },
              { id: "l16", title: "Códigos de Conducta", type: "pdf" },
            ],
          },
        ],
      },
    ],
  },
];

export const calendarEvents: CalendarEvent[] = [
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
    id: "e3",
    courseId: "2",
    courseName: "IND-201",
    title: "Proyecto de Análisis",
    date: "2025-10-12",
    type: "project",
    description: "Proyecto de análisis de sistemas de producción",
  },
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
    id: "e5",
    courseId: "2",
    courseName: "IND-201",
    title: "Examen Final",
    date: "2025-10-28",
    type: "exam",
    description: "Examen final de sistemas de producción",
  },
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
    id: "e7",
    courseId: "3",
    courseName: "IND-305",
    title: "Examen Parcial 2",
    date: "2025-10-25",
    type: "exam",
    description: "Segundo parcial de control de calidad",
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
    id: "e9",
    courseId: "2",
    courseName: "IND-201",
    title: "Visita Industrial",
    date: "2025-10-22",
    type: "other",
    description: "Visita a planta de producción",
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
];

export const forumThreads: ForumThread[] = [
  {
    id: "t1",
    courseId: "1",
    author: "Juan Pérez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
    title: "Dudas sobre el primer examen parcial",
    preview: "Hola a todos, tengo algunas dudas sobre los temas que entran en el primer parcial...",
    replies: 8,
    lastActivity: "Hace 2 horas",
    views: 45,
  },
  {
    id: "t2",
    courseId: "1",
    author: "María López",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    title: "Recursos adicionales para el módulo 1.2",
    preview: "¿Alguien tiene recursos adicionales sobre el método científico? Me gustaría profundizar más...",
    replies: 5,
    lastActivity: "Hace 5 horas",
    views: 32,
  },
  {
    id: "t3",
    courseId: "1",
    author: "Pedro García",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    title: "Grupo de estudio para la tarea 1",
    preview: "Estoy buscando formar un grupo de estudio para trabajar en la tarea 1. ¿Alguien se anima?",
    replies: 12,
    lastActivity: "Hace 1 día",
    views: 67,
  },
  {
    id: "t4",
    courseId: "1",
    author: "Laura Sánchez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
    title: "Consulta sobre el video de la clase 3",
    preview: "No me queda claro el concepto que se explica en el minuto 15:30 del video...",
    replies: 3,
    lastActivity: "Hace 3 días",
    views: 28,
  },
  {
    id: "t5",
    courseId: "1",
    author: "Carlos Ruiz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    title: "Compartiendo apuntes de la Unidad 1",
    preview: "Hola, comparto mis apuntes de la primera unidad por si le sirven a alguien...",
    replies: 15,
    lastActivity: "Hace 1 semana",
    views: 89,
  },
];
