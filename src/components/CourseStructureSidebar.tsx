import { useState } from "react";
import { Course } from "@/data/coursesData";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, ChevronLeft, FileText, Video, HelpCircle, CheckSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseStructureSidebarProps {
  course: Course;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export const CourseStructureSidebar = ({ course, isOpen, onToggle, isMobile }: CourseStructureSidebarProps) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const toggleUnit = (unitId: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

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

  if (!isOpen && !isMobile) {
    return (
      <div className="hidden lg:flex w-16 border-r bg-card flex-col items-center py-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "border-r bg-card",
        isMobile ? "w-full" : "hidden lg:block w-80"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Estructura del Curso</h2>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isMobile ? <X className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="p-4 space-y-2">
          {course.modules.map((module) => (
            <div key={module.id} className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => toggleModule(module.id)}
              >
                {expandedModules.has(module.id) ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                {module.title}
              </Button>

              {expandedModules.has(module.id) && (
                <div className="ml-4 space-y-1">
                  {module.units.map((unit) => (
                    <div key={unit.id} className="space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-sm"
                        onClick={() => toggleUnit(unit.id)}
                      >
                        {expandedUnits.has(unit.id) ? (
                          <ChevronDown className="h-3 w-3 mr-2" />
                        ) : (
                          <ChevronRight className="h-3 w-3 mr-2" />
                        )}
                        {unit.title}
                      </Button>

                      {expandedUnits.has(unit.id) && (
                        <div className="ml-6 space-y-1">
                          {unit.lessons.map((lesson) => {
                            const Icon = getIcon(lesson.type);
                            return (
                              <Button
                                key={lesson.id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
                              >
                                <Icon className="h-3 w-3 mr-2" />
                                {lesson.title}
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};
