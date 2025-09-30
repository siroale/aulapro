import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, FileText } from "lucide-react";
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

  if (weeklyEvents.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Entregas de Esta Semana</h2>
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
  );
};
