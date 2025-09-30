import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Course } from "@/data/coursesData";
import { FileText, Video, HelpCircle, CheckSquare, Download, LayoutGrid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PdfViewerModal } from "@/components/PdfViewerModal";

interface MaterialsTabProps {
  course: Course;
}

export const MaterialsTab = ({ course }: MaterialsTabProps) => {
  const [viewMode, setViewMode] = useState<"default" | "minimal">("default");
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<string[]>(
    course.modules.map((m) => m.id)
  );

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

  const handleMaterialClick = () => {
    setSelectedPdf("/mockup.pdf");
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
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                  <div className="flex items-center gap-3 text-left w-full">
                    <ChevronDown className="h-5 w-5 text-primary shrink-0" />
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
                  <div className="px-6 pb-4 space-y-4">
                    {module.units.map((unit) => (
                      <div key={unit.id}>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                          {unit.title}
                          <Badge variant="outline" className="text-xs">
                            {unit.lessons.length}
                          </Badge>
                        </h4>
                        <div className="space-y-2 ml-4">
                          {unit.lessons.map((lesson) => {
                            const Icon = getIcon(lesson.type);
                            return (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                                onClick={handleMaterialClick}
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
                      </div>
                    ))}
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
              <div key={module.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <ChevronDown className="h-4 w-4" />
                  <span className="font-medium text-sm">{module.title}</span>
                  {hasNewContent(module.id) && (
                    <span className="h-1.5 w-1.5 bg-destructive rounded-full" />
                  )}
                </div>
                <div className="ml-6 space-y-1">
                  {module.units.map((unit) => (
                    <div key={unit.id} className="space-y-1">
                      <div className="text-xs text-muted-foreground">{unit.title}</div>
                      <div className="ml-4 space-y-0.5">
                        {unit.lessons.map((lesson) => {
                          const Icon = getIcon(lesson.type);
                          return (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer py-1"
                              onClick={handleMaterialClick}
                            >
                              <Icon className="h-3 w-3" />
                              <span>{lesson.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={selectedPdf !== null}
        onClose={() => setSelectedPdf(null)}
        pdfUrl={selectedPdf || ""}
      />
    </div>
  );
};
