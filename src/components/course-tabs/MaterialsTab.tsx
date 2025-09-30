import { Card } from "@/components/ui/card";
import { Course } from "@/data/coursesData";
import { FileText, Video, HelpCircle, CheckSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaterialsTabProps {
  course: Course;
}

export const MaterialsTab = ({ course }: MaterialsTabProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "video":
        return Video;
      case "quiz":
        return HelpCircle;
      case "assignment":
        return CheckSquare;
      default:
        return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "Documento";
      case "video":
        return "Video";
      case "quiz":
        return "Cuestionario";
      case "assignment":
        return "Tarea";
      default:
        return "Material";
    }
  };

  return (
    <div className="space-y-6">
      {course.modules.map((module) => (
        <Card key={module.id} className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{module.title}</h3>
          <div className="space-y-4">
            {module.units.map((unit) => (
              <div key={unit.id}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">{unit.title}</h4>
                <div className="space-y-2 ml-4">
                  {unit.lessons.map((lesson) => {
                    const Icon = getIcon(lesson.type);
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{getTypeLabel(lesson.type)}</p>
                          </div>
                        </div>
                        {lesson.type === "pdf" && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
