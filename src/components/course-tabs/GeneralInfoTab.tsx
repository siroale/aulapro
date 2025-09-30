import { Course, calendarEvents } from "@/data/coursesData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, AlertCircle } from "lucide-react";

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

      {/* Course Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Información del Curso
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Código
            </h3>
            <p className="text-foreground">{course.code}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Paralelo
            </h3>
            <p className="text-foreground">200</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Nombre
            </h3>
            <p className="text-foreground">{course.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Departamento
            </h3>
            <Badge>{course.department}</Badge>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Profesor(a)
            </h3>
            <p className="text-foreground">{course.instructor}</p>
            <p className="text-sm text-muted-foreground">maria.gonzalez@usm.cl</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Ayudantes
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-foreground">Javier Morales</p>
                <p className="text-xs text-muted-foreground">javier.morales@usm.cl</p>
              </div>
              <div>
                <p className="text-sm text-foreground">Carolina Fuentes</p>
                <p className="text-xs text-muted-foreground">carolina.fuentes@usm.cl</p>
              </div>
              <div>
                <p className="text-sm text-foreground">Diego Valenzuela</p>
                <p className="text-xs text-muted-foreground">diego.valenzuela@usm.cl</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Descripción
            </h3>
            <p className="text-foreground mb-4">{course.description}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="gap-2" 
                onClick={() => window.open("/mockup.pdf", "_blank")}
              >
                <Download className="h-4 w-4" />
                Descargar Programa
              </Button>
              <Button 
                variant="outline" 
                className="gap-2" 
                onClick={() => window.open("/mockup.pdf", "_blank")}
              >
                <Download className="h-4 w-4" />
                Descargar Planificación
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
