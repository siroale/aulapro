import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, AlertCircle, FileText, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from "@/data/coursesData";

interface CalendarProps {
  events: CalendarEvent[];
}

export const Calendar = ({ events }: CalendarProps) => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); // October 2025

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  
  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

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

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam":
        return AlertCircle;
      case "assignment":
        return FileText;
      case "project":
        return Folder;
      default:
        return Clock;
    }
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date(2025, 9, 3); // Oct 3, 2025 for demo
    const eventDate = new Date(dateStr);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays < 0) return "Pasado";
    return `en ${diffDays} días`;
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date(2025, 9, 3))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 7);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const mesesCortos = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic"
  ];

  const formatFecha = (fechaStr: string) => {
    const [año, mes, dia] = fechaStr.split("-");
    return `${parseInt(dia, 10)} ${mesesCortos[parseInt(mes, 10) - 1]}`;
  };

  const handleEventClick = (event: CalendarEvent, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    // Navigate based on event type
    if (event.type === "assignment" || event.type === "project") {
      // Navigate to assignment detail page
      navigate(`/curso/${event.courseId}/tarea/${event.id}`);
    } else {
      // For exams and other events, navigate to course materials tab
      navigate(`/curso/${event.courseId}?tab=materials`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upcoming Deadlines - A LA IZQUIERDA */}
      <Card className="lg:order-1 p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Próximas Evaluaciones</h3>
        <div className="space-y-3">
          {upcomingEvents.map(event => {
            const Icon = getEventIcon(event.type);
            return (
              <div
                key={event.id}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start gap-3">
                  <div className={`${getEventColor(event.type)} p-2 rounded-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="mb-1 text-xs">
                      {event.courseName}
                    </Badge>
                    <p className="text-sm font-medium text-foreground truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {formatFecha(event.date)}
                      </p>
                      <span className="text-xs font-medium text-primary">
                        {getDaysUntil(event.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Calendar - A LA DERECHA */}
      <Card className="lg:col-span-2 lg:order-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground p-2">
              {day}
            </div>
          ))}
          
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDate(day);
            const isToday = day === 3; // Demo: Oct 3 is "today"
            
            return (
              <div
                key={day}
                className={`min-h-20 p-2 border rounded-lg transition-colors hover:bg-muted/50 ${
                  isToday ? "bg-primary/10 border-primary" : "border-border"
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : "text-foreground"}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      className={`${getEventColor(event.type)} text-white text-xs px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity`}
                      title={`${event.courseName}: ${event.title}`}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};