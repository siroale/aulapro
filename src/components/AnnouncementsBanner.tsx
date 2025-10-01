import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Calendar } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "urgent" | "info";
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Cambio de horario - INF-285",
    description: "El certamen de Computación Científica se reprograma para el 5 de octubre.",
    date: "2025-10-02",
    type: "urgent",
  },
  {
    id: "2",
    title: "Nueva plataforma de recursos",
    description: "Ya está disponible la nueva biblioteca digital con más de 5000 recursos académicos.",
    date: "2025-10-01",
    type: "info",
  },
];

export const AnnouncementsBanner = () => {
  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Anuncios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`p-4 border-l-4 ${
              announcement.type === "urgent"
                ? "border-l-accent bg-accent/5"
                : "border-l-primary bg-primary/5"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  announcement.type === "urgent" ? "bg-accent" : "bg-primary"
                }`}
              >
                <Megaphone className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                  <Badge variant={announcement.type === "urgent" ? "destructive" : "default"}>
                    {announcement.type === "urgent" ? "Urgente" : "Info"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{announcement.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(announcement.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                  })}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
