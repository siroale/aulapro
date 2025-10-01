import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, FileText, Calendar } from "lucide-react";
import { CalendarEvent } from "@/data/coursesData";

interface WeeklyDeliverablesProps {
  events: CalendarEvent[];
}

export const WeeklyDeliverables = ({ events }: WeeklyDeliverablesProps) => {
  // Filter events for current week (Oct 3-9, 2025 for demo)
  const weekStart = new Date(2025, 9, 3);
  const weekEnd = new Date(2025, 9, 9);
  
  const weeklyEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= weekStart && eventDate <= weekEnd;
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

  const mesesCortos = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic"
  ];

  const diasCortos = [
    "dom", "lun", "mar", "mié", "jue", "vie", "sáb"
  ];

  // Recibe YYYY-MM-DD y devuelve algo tipo "vie, 3 oct"
  function formatFechaLarga(fechaStr: string): string {
    const [año, mes, dia] = fechaStr.split("-").map((x) => parseInt(x, 10));
    const fecha = new Date(año, mes - 1, dia); 
    const diaSemana = diasCortos[fecha.getDay()];
    return `${diaSemana}, ${dia} ${mesesCortos[mes - 1]}`;
  }
  
  if (weeklyEvents.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Evaluaciones de esta Semana</h2>
        <Button asChild size="sm" className="gap-2">
          <a href="/calendario">
            <Calendar className="h-4 w-4" />
            Ver más
          </a>
        </Button>
      </div>
      <div className="space-y-3">
        {weeklyEvents.map((event) => {
          const Icon = getEventIcon(event.type);
          return (
            <div
              key={event.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Icon className={`h-5 w-5 ${getEventColor(event.type)}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {event.courseName}
                  </Badge>
                  <span className="text-sm font-medium text-foreground">{event.title}</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatFechaLarga(event.date)}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
