import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Mail, Download, AlertCircle, FileText } from "lucide-react";
import type { Course } from "@/data/coursesData";
import { calendarEvents } from "@/data/coursesData";

interface GeneralInfoTabProps {
  course: Course;
}

export const GeneralInfoTab = ({ course }: GeneralInfoTabProps) => {
  // Filter events for this specific course
  const courseEvents = calendarEvents.filter((event) => event.courseId === course.id);
  
  // Get upcoming events (next 2 weeks)
  const today = new Date();
  const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
  
  const upcomingEvents = courseEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= twoWeeksFromNow;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam":
        return AlertCircle;
      case "assignment":
        return FileText;
      default:
        return Clock;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "exam":
        return "text-event-exam";
      case "assignment":
        return "text-event-assignment";
      default:
        return "text-primary";
    }
  };

  const handleDownload = () => {
    window.open("https://drive.google.com/file/d/1TAU46-xzQg3QiTcOaj50xAh1pBUAWX7Y/view?usp=sharing", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Deliverables */}
      {upcomingEvents.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Próximas Entregas de Este Curso
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const Icon = getEventIcon(event.type);
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon className={`h-5 w-5 ${getEventColor(event.type)}`} />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{event.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("es-ES", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Course Description */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Descripción del Curso</h3>
        <p className="text-foreground mb-6">{course.description}</p>
        
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Descargar Programa
          </Button>
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Descargar Planificación
          </Button>
        </div>
      </Card>

      {/* Paralelo */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Información de Inscripción</h3>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-base px-4 py-2">
            Paralelo: 200
          </Badge>
        </div>
      </Card>

      {/* Professor */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profesor(a)</h3>
        <div className="space-y-2">
          <p className="text-foreground font-medium">{course.instructor}</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a href="mailto:roberto.leon@usm.cl" className="hover:text-primary transition-colors">
              profesor.inteligente@usm.cl
            </a>
          </div>
        </div>
      </Card>

      {/* Teaching Assistants */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Ayudantes</h3>
        <div className="space-y-4">
          <div>
            <p className="text-foreground font-medium">Carlos Méndez</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:carlos.mendez@usm.cl" className="hover:text-primary transition-colors">
                carlos.mendez@usm.cl
              </a>
            </div>
          </div>
          <div>
            <p className="text-foreground font-medium">Ana Torres</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:ana.torres@usm.cl" className="hover:text-primary transition-colors">
                ana.torres@usm.cl
              </a>
            </div>
          </div>
          <div>
            <p className="text-foreground font-medium">Diego Castro</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href="mailto:diego.castro@usm.cl" className="hover:text-primary transition-colors">
                diego.castro@usm.cl
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* Schedule */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Horario</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Cátedra</p>
              <p className="text-sm text-muted-foreground">Martes y Jueves, 10:00 - 11:30</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Sala</p>
              <p className="text-sm text-muted-foreground">Edificio F, Sala 205</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
