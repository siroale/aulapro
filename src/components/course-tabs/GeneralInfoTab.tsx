import { Card } from "@/components/ui/card";
import { Course } from "@/data/coursesData";
import { User, Calendar, BookOpen, Clock, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calendarEvents } from "@/data/coursesData";
import { Badge } from "@/components/ui/badge";

interface GeneralInfoTabProps {
  course: Course;
}

export const GeneralInfoTab = ({ course }: GeneralInfoTabProps) => {
  // Filter upcoming deliverables for this course
  const courseDeliverables = calendarEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        event.courseId === course.id &&
        eventDate >= today &&
        (event.type === "exam" || event.type === "assignment" || event.type === "project")
      );
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getEventColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-event-exam";
      case "assignment":
        return "bg-event-assignment";
      case "project":
        return "bg-event-project";
      default:
        return "bg-event-other";
    }
  };

  const getEventLabel = (type: string) => {
    switch (type) {
      case "exam":
        return "Examen";
      case "assignment":
        return "Tarea";
      case "project":
        return "Proyecto";
      default:
        return "Evento";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    return `en ${diffDays} días`;
  };

  const handleDownload = (fileName: string) => {
    // In a real app, this would trigger an actual download
    console.log(`Downloading ${fileName}`);
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Deliverables */}
      {courseDeliverables.length > 0 && (
        <Card className="p-6 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Próximas Entregas de Este Curso
            </h3>
          </div>
          <div className="space-y-3">
            {courseDeliverables.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{getEventLabel(event.type)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{formatDate(event.date)}</p>
                  <Badge variant="outline" className="text-xs">
                    {getDaysUntil(event.date)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Course Description */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Descripción del Curso</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{course.description}</p>

        {/* Downloadable Resources */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleDownload("syllabus.pdf")}
          >
            <Download className="h-4 w-4" />
            Descargar Programa
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleDownload("planning.pdf")}
          >
            <Download className="h-4 w-4" />
            Descargar Planificación
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Instructor</h3>
          </div>
          <p className="text-muted-foreground">{course.instructor}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Departamento</h3>
          </div>
          <p className="text-muted-foreground">{course.department}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Horario</h3>
          </div>
          <p className="text-muted-foreground">Lunes y Miércoles, 10:00 - 12:00</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Créditos</h3>
          </div>
          <p className="text-muted-foreground">4 créditos</p>
        </Card>
      </div>
    </div>
  );
};
