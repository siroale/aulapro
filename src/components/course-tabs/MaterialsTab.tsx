import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Course } from "@/data/coursesData";
import { FileText, Video, HelpCircle, CheckSquare, Download, LayoutGrid, List, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


interface MaterialsTabProps {
  course: Course;
}

type SectionType = "catedra" | "laboratorio" | "ayudantia";

export const MaterialsTab = ({ course }: MaterialsTabProps) => {
  const [viewMode, setViewMode] = useState<"default" | "minimal">("default");
  
  // Get available sections from course or default to all sections
  const availableSections = course.availableSections || ["catedra", "laboratorio", "ayudantia"];
  const [activeSection, setActiveSection] = useState<SectionType>(availableSections[0] as SectionType);
  
  // Units expanded by default, modules collapsed by default
  const [expandedModules, setExpandedModules] = useState<string[]>(
    course.modules.map((m) => m.id)
  );
  const [expandedUnits, setExpandedUnits] = useState<string[]>([]);
  const [expandedAyudantias, setExpandedAyudantias] = useState<string[]>([]);

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

  const getIconColor = (type: string) => {
    // Blue for quizzes and assignments (priority items)
    // Gray for other materials
    switch (type) {
      case "quiz":
      case "assignment":
        return "text-blue-600";
      default:
        return "text-gray-400";
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

  // Laboratorio content
  const laboratorioContent = [
    { id: "lab-reg", title: "Reglamento", type: "pdf" },
    { id: "lab1", title: "Laboratorio 1", type: "assignment", dueDate: "2025-10-12" },
    { id: "lab2", title: "Laboratorio 2", type: "assignment", dueDate: "2025-10-19" },
    { id: "lab3", title: "Laboratorio 3", type: "assignment", dueDate: "2025-10-26" },
    { id: "lab4", title: "Laboratorio 4", type: "assignment", dueDate: "2025-11-02" },
    { id: "lab5", title: "Laboratorio 5", type: "assignment", dueDate: "2025-11-09" },
    { id: "lab6", title: "Laboratorio 6", type: "assignment", dueDate: "2025-11-16" },
  ];

  // Ayudantía content
  const ayudantiaContent = [
    {
      id: "ay1",
      title: "Ayudantía 1",
      items: [
        { id: "ay1-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay1-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay1-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
    {
      id: "ay2",
      title: "Ayudantía 2",
      items: [
        { id: "ay2-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay2-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay2-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
    {
      id: "ay3",
      title: "Ayudantía 3",
      items: [
        { id: "ay3-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay3-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay3-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
    {
      id: "ay4",
      title: "Ayudantía 4",
      items: [
        { id: "ay4-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay4-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay4-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
    {
      id: "ay5",
      title: "Ayudantía 5",
      items: [
        { id: "ay5-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay5-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay5-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
    {
      id: "ay6",
      title: "Ayudantía 6",
      items: [
        { id: "ay6-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay6-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay6-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
    {
      id: "ay7",
      title: "Ayudantía 7",
      items: [
        { id: "ay7-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay7-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay7-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
    {
      id: "ay8",
      title: "Ayudantía 8",
      items: [
        { id: "ay8-1", title: "Ejercicios Resueltos.pdf", type: "pdf" },
        { id: "ay8-2", title: "Pauta Ayudantía.pdf", type: "pdf" },
        { id: "ay8-3", title: "Material Complementario.pdf", type: "pdf" },
      ],
    },
  ];

  const renderCatedraContent = () => (
    <>
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
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 transition-transform" />
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
                            {isUnitExpanded ? (
                              <ChevronDown className="h-4 w-4 text-primary shrink-0 transition-transform" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-primary shrink-0 transition-transform" />
                            )}
                            <h4 className="text-sm font-medium text-foreground flex-1">
                              {unit.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              ({unit.lessons.length})
                            </span>
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
                                      <Icon className={`h-5 w-5 ${getIconColor(lesson.type)}`} />
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
                      <ChevronRight className="h-4 w-4 transition-transform" />
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
                              {isUnitExpanded ? (
                                <ChevronDown className="h-3 w-3 transition-transform" />
                              ) : (
                                <ChevronRight className="h-3 w-3 transition-transform" />
                              )}
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
                                      <Icon className={`h-3 w-3 ${getIconColor(lesson.type)}`} />
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
    </>
  );

  const renderLaboratorioContent = () => (
    <>
      {/* Default View */}
      {viewMode === "default" && (
        <Card className="p-6">
          <div className="space-y-3">
            {laboratorioContent.map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleMaterialClick(item.type, course.id, item.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${getIconColor(item.type)}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      {item.dueDate && (
                        <p className="text-xs text-muted-foreground">
                          Entrega: {new Date(item.dueDate).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.type === "pdf" && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Minimal View */}
      {viewMode === "minimal" && (
        <Card className="p-6">
          <div className="space-y-2">
            {laboratorioContent.map((item) => {
              const Icon = getIcon(item.type);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer py-1"
                  onClick={() => handleMaterialClick(item.type, course.id, item.id)}
                >
                  <Icon className={`h-3 w-3 ${getIconColor(item.type)}`} />
                  <span className="flex-1">{item.title}</span>
                  {item.dueDate && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.dueDate).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );

  const toggleAyudantia = (ayudantiaId: string) => {
    setExpandedAyudantias(prev =>
      prev.includes(ayudantiaId)
        ? prev.filter(id => id !== ayudantiaId)
        : [...prev, ayudantiaId]
    );
  };

  const renderAyudantiaContent = () => (
    <>
      {/* Default View */}
      {viewMode === "default" && (
        <div className="space-y-4">
          {ayudantiaContent.map((session) => {
            const isExpanded = expandedAyudantias.includes(session.id);
            return (
              <Card key={session.id} className="overflow-hidden">
                <div
                  className="flex items-center gap-3 px-6 py-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleAyudantia(session.id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-primary shrink-0 transition-transform" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 transition-transform" />
                  )}
                  <h3 className="text-base font-semibold text-foreground flex-1">{session.title}</h3>
                  <Badge variant="secondary">{session.items.length}</Badge>
                </div>
                {isExpanded && (
                  <div className="p-4 space-y-2">
                    {session.items.map((item) => {
                      const Icon = getIcon(item.type);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => handleMaterialClick(item.type, course.id, item.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${getIconColor(item.type)}`} />
                            <p className="text-sm font-medium text-foreground">{item.title}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Minimal View */}
      {viewMode === "minimal" && (
        <Card className="p-6">
          <div className="space-y-4">
            {ayudantiaContent.map((session) => {
              const isExpanded = expandedAyudantias.includes(session.id);
              return (
                <div key={session.id} className="space-y-2">
                  <div
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:text-primary"
                    onClick={() => toggleAyudantia(session.id)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 transition-transform" />
                    ) : (
                      <ChevronRight className="h-4 w-4 transition-transform" />
                    )}
                    {session.title}
                    <span className="text-xs text-muted-foreground ml-auto">({session.items.length})</span>
                  </div>
                  {isExpanded && (
                    <div className="ml-6 space-y-1">
                      {session.items.map((item) => {
                        const Icon = getIcon(item.type);
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 text-sm hover:text-primary cursor-pointer py-1"
                            onClick={() => handleMaterialClick(item.type, course.id, item.id)}
                          >
                            <Icon className={`h-3 w-3 ${getIconColor(item.type)}`} />
                            <span>{item.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      {/* Section Navigation and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Section Navigation - LEFT SIDE */}
        <div className="inline-flex rounded-lg border-2 border-border bg-muted/30 p-1">
          {availableSections.includes("catedra") && (
            <Button
              variant={activeSection === "catedra" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection("catedra")}
              className="w-32"
            >
              Cátedra
            </Button>
          )}
          {availableSections.includes("laboratorio") && (
            <Button
              variant={activeSection === "laboratorio" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection("laboratorio")}
              className="w-32"
            >
              Laboratorio
            </Button>
          )}
          {availableSections.includes("ayudantia") && (
            <Button
              variant={activeSection === "ayudantia" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection("ayudantia")}
              className="w-32"
            >
              Ayudantía
            </Button>
          )}
        </div>

        {/* View Toggle - RIGHT SIDE */}
        <div className="inline-flex rounded-lg border-2 border-border bg-muted/30 p-1">
          <Button
            variant={viewMode === "default" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("default")}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            Vista Completa
          </Button>
          <Button
            variant={viewMode === "minimal" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("minimal")}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Vista Mínima
          </Button>
        </div>
      </div>

      {/* Content based on active section */}
      {activeSection === "catedra" && renderCatedraContent()}
      {activeSection === "laboratorio" && renderLaboratorioContent()}
      {activeSection === "ayudantia" && renderAyudantiaContent()}
    </div>
  );
};
