import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Course } from "@/data/coursesData";
import { FileText, Video, HelpCircle, CheckSquare, Download, LayoutGrid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


interface MaterialsTabProps {
  course: Course;
}

export const MaterialsTab = ({ course }: MaterialsTabProps) => {
  const [viewMode, setViewMode] = useState<"default" | "minimal">("default");
  // Units expanded by default, modules collapsed by default
  const [expandedModules, setExpandedModules] = useState<string[]>(
    course.modules.map((m) => m.id)
  );
  const [expandedUnits, setExpandedUnits] = useState<string[]>([]);

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

  const countModuleItems = (module: typeof course.modules[0]) => {
    return module.units.reduce((total, unit) => total + unit.lessons.length, 0);
  };

  const hasNewContent = (moduleId: string) => {
    // Mock logic - in real app, check against user's last visit timestamp
    return moduleId === "mod1"; // Only first module has new content for demo
  };

  const handleMaterialClick = (type: string, courseId: string, lessonId: string) => {
    // If it's an assignment, navigate to assignment detail page
    if (type === "assignment") {
      window.location.href = `/curso/${courseId}/tarea/${lessonId}`;
      return;
    }
    
    // Otherwise, open PDF in new tab
    // IMPORTANT: Place mockup.pdf in the public folder for local testing
    // For production, replace with actual file path or Google Drive link
    window.open("https://drive.google.com/file/d/1TAU46-xzQg3QiTcOaj50xAh1pBUAWX7Y/view?usp=sharing", "_blank");
    
    // Alternative: Open Google Drive link (replace SAMPLE_ID with actual file ID)
    // window.open("https://drive.google.com/file/d/SAMPLE_ID/view", "_blank");
  };

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev =>
      prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode(viewMode === "default" ? "minimal" : "default")}
        >
          {viewMode === "default" ? (
            <>
              <List className="h-4 w-4 mr-2" />
              Vista Mínima
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4 mr-2" />
              Vista Completa
            </>
          )}
        </Button>
      </div>

      {/* Default View */}
      {viewMode === "default" && (
        <Accordion
          type="multiple"
          value={expandedModules}
          onValueChange={setExpandedModules}
          className="space-y-4"
        >
          {course.modules.map((module) => (
            <AccordionItem key={module.id} value={module.id} className="border-none">
              <Card className="overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 [&[data-state=open]>div>svg]:rotate-90">
                  <div className="flex items-center gap-3 text-left w-full">
                    <ChevronDown className="h-5 w-5 text-primary shrink-0 transition-transform" />
                    <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
                    <div className="flex items-center gap-2 ml-auto">
                      {hasNewContent(module.id) && (
                        <span className="h-2 w-2 bg-destructive rounded-full animate-pulse" />
                      )}
                      <Badge variant="secondary">{countModuleItems(module)}</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-4 space-y-3">
                    {module.units.map((unit) => {
                      const isUnitExpanded = expandedUnits.includes(unit.id);
                      return (
                        <div key={unit.id} className="border rounded-lg overflow-hidden">
                          <div
                            className="flex items-center gap-2 p-3 bg-muted/30 hover:bg-muted/50 cursor-pointer"
                            onClick={() => toggleUnit(unit.id)}
                          >
                            <ChevronDown
                              className={`h-4 w-4 text-primary shrink-0 transition-transform ${
                                isUnitExpanded ? "rotate-0" : "-rotate-90"
                              }`}
                            />
                            <h4 className="text-sm font-medium text-foreground flex-1">
                              {unit.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {unit.lessons.length}
                            </Badge>
                          </div>
                          {isUnitExpanded && (
                            <div className="space-y-2 p-3 bg-card">
                              {unit.lessons.map((lesson) => {
                                const Icon = getIcon(lesson.type);
                                return (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={() => handleMaterialClick(lesson.type, course.id, lesson.id)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Icon className="h-5 w-5 text-primary" />
                                      <div>
                                        <p className="text-sm font-medium text-foreground">
                                          {lesson.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {getTypeLabel(lesson.type)}
                                        </p>
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
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Minimal View */}
      {viewMode === "minimal" && (
        <Card className="p-6">
          <div className="space-y-4">
            {course.modules.map((module) => (
              <Accordion
                key={module.id}
                type="multiple"
                value={expandedModules.includes(module.id) ? [module.id] : []}
                onValueChange={(values) => {
                  if (values.includes(module.id)) {
                    setExpandedModules(prev => [...prev, module.id]);
                  } else {
                    setExpandedModules(prev => prev.filter(id => id !== module.id));
                  }
                }}
                className="space-y-2"
              >
                <AccordionItem value={module.id} className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline [&[data-state=open]>div>svg]:rotate-90">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4 transition-transform" />
                      <span className="font-medium text-sm">{module.title}</span>
                      {hasNewContent(module.id) && (
                        <span className="h-1.5 w-1.5 bg-destructive rounded-full" />
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-6 space-y-2">
                      {module.units.map((unit) => {
                        const isUnitExpanded = expandedUnits.includes(unit.id);
                        return (
                          <div key={unit.id} className="space-y-1">
                            <div 
                              className="flex items-center gap-2 text-xs font-medium cursor-pointer hover:text-primary"
                              onClick={() => toggleUnit(unit.id)}
                            >
                              <ChevronDown
                                className={`h-3 w-3 transition-transform ${
                                  isUnitExpanded ? "rotate-0" : "-rotate-90"
                                }`}
                              />
                              {unit.title}
                            </div>
                            {isUnitExpanded && (
                              <div className="ml-5 space-y-0.5">
                                {unit.lessons.map((lesson) => {
                                  const Icon = getIcon(lesson.type);
                                  return (
                                    <div
                                      key={lesson.id}
                                      className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer py-1"
                                      onClick={() => handleMaterialClick(lesson.type, course.id, lesson.id)}
                                    >
                                      <Icon className="h-3 w-3" />
                                      <span>{lesson.title}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
