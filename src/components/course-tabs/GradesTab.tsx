import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface GradesTabProps {
  courseId: string;
}

interface Grade {
  id: string;
  assignment: string;
  type: string;
  score: number | null;
  maxScore: number;
  weight: number;
  status: "graded" | "pending" | "missing";
  date: string;
}

const sampleGrades: Grade[] = [
  {
    id: "1",
    assignment: "Tarea 1: Metodología Científica",
    type: "Tarea",
    score: 85,
    maxScore: 100,
    weight: 8,
    status: "graded",
    date: "2025-09-20",
  },
  {
    id: "2",
    assignment: "Quiz: Conceptos Fundamentales",
    type: "Evaluación",
    score: 92,
    maxScore: 100,
    weight: 5,
    status: "graded",
    date: "2025-09-25",
  },
  {
    id: "3",
    assignment: "Laboratorio 1: Análisis",
    type: "Laboratorio",
    score: 88,
    maxScore: 100,
    weight: 7,
    status: "graded",
    date: "2025-09-28",
  },
  {
    id: "4",
    assignment: "Taller Práctico",
    type: "Tarea",
    score: 78,
    maxScore: 100,
    weight: 8,
    status: "graded",
    date: "2025-09-30",
  },
  {
    id: "5",
    assignment: "Examen Parcial 1",
    type: "Examen",
    score: null,
    maxScore: 100,
    weight: 20,
    status: "pending",
    date: "2025-10-05",
  },
  {
    id: "6",
    assignment: "Tarea 2: Proyecto Integrador",
    type: "Tarea",
    score: null,
    maxScore: 100,
    weight: 10,
    status: "pending",
    date: "2025-10-15",
  },
  {
    id: "7",
    assignment: "Quiz: Aplicaciones Prácticas",
    type: "Evaluación",
    score: null,
    maxScore: 100,
    weight: 5,
    status: "pending",
    date: "2025-10-18",
  },
  {
    id: "8",
    assignment: "Laboratorio 2: Optimización",
    type: "Laboratorio",
    score: null,
    maxScore: 100,
    weight: 7,
    status: "pending",
    date: "2025-10-22",
  },
  {
    id: "9",
    assignment: "Examen Parcial 2",
    type: "Examen",
    score: null,
    maxScore: 100,
    weight: 20,
    status: "pending",
    date: "2025-10-30",
  },
  {
    id: "10",
    assignment: "Proyecto Final",
    type: "Proyecto",
    score: null,
    maxScore: 100,
    weight: 10,
    status: "pending",
    date: "2025-11-10",
  },
];

export const GradesTab = ({ courseId }: GradesTabProps) => {
  const calculateCurrentGrade = () => {
    const gradedAssignments = sampleGrades.filter((g) => g.status === "graded");
    const totalWeight = gradedAssignments.reduce((sum, g) => sum + g.weight, 0);
    const weightedSum = gradedAssignments.reduce(
      (sum, g) => sum + (g.score! / g.maxScore) * g.weight,
      0
    );

    // Return score out of 100 (not percentage)
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  };

  const currentGrade = calculateCurrentGrade();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "missing":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Calificado</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
      case "missing":
        return <Badge variant="destructive">Faltante</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Grade */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Calificación Actual</h3>
            <p className="text-sm text-muted-foreground">Basada en trabajos calificados</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">{currentGrade.toFixed(1)}/100</div>
          </div>
        </div>
      </Card>

      {/* Grades Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detalle de Calificaciones</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evaluación</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-center">Calificación</TableHead>
              <TableHead className="text-center">Peso</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell className="font-medium">{grade.assignment}</TableCell>
                <TableCell>{grade.type}</TableCell>
                <TableCell className="text-center">
                  {grade.score !== null ? (
                    <span className="font-semibold">
                      {grade.score}/{grade.maxScore}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">{grade.weight}%</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {getStatusIcon(grade.status)}
                    {getStatusBadge(grade.status)}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(grade.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Resumen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
              {sampleGrades.filter((g) => g.status === "graded").length}
            </p>
            <p className="text-sm text-muted-foreground">Calificados</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
            <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {sampleGrades.filter((g) => g.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pendientes</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {sampleGrades.reduce((sum, g) => sum + g.weight, 0)}%
            </p>
            <p className="text-sm text-muted-foreground">Peso Total</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
