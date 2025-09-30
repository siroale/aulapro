import { useState } from "react";
import { X, ChevronDown, ChevronRight, FileText, Video, FileQuestion, ClipboardList, MessageSquare, Info, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Course, ForumThread } from "@/data/coursesData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CourseDetailModalProps {
  course: Course;
  forumThreads: ForumThread[];
  isOpen: boolean;
  onClose: () => void;
}

export const CourseDetailModal = ({ course, forumThreads, isOpen, onClose }: CourseDetailModalProps) => {
  const [openModules, setOpenModules] = useState<string[]>([course.modules[0]?.id || ""]);
  const [openUnits, setOpenUnits] = useState<string[]>([course.modules[0]?.units[0]?.id || ""]);
  const [showNewThread, setShowNewThread] = useState(false);

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const toggleUnit = (unitId: string) => {
    setOpenUnits(prev =>
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "video":
        return Video;
      case "quiz":
        return FileQuestion;
      case "assignment":
        return ClipboardList;
      default:
        return FileText;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">{course.name}</DialogTitle>
              <div className="flex items-center gap-3">
                <Badge>{course.code}</Badge>
                <Badge variant="outline">{course.department}</Badge>
                <span className="text-sm text-muted-foreground">{course.instructor}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="materials" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="mx-6 mt-4 grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="general" className="gap-2">
              <Info className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="materials" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Materiales
            </TabsTrigger>
            <TabsTrigger value="forum" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Foro
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="general" className="p-6 m-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Descripción del Curso</h3>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Instructor</h3>
                  <p className="text-muted-foreground">{course.instructor}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Información del Curso</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Código</p>
                      <p className="font-medium">{course.code}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">Departamento</p>
                      <p className="font-medium">{course.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="p-6 m-0">
              <div className="space-y-3">
                {course.modules.map(module => (
                  <Collapsible
                    key={module.id}
                    open={openModules.includes(module.id)}
                    onOpenChange={() => toggleModule(module.id)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                      <div className="flex items-center gap-3">
                        {openModules.includes(module.id) ? (
                          <ChevronDown className="h-5 w-5 text-primary" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                        <span className="font-semibold text-left">{module.title}</span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-6 pt-2 space-y-2">
                      {module.units.map(unit => (
                        <Collapsible
                          key={unit.id}
                          open={openUnits.includes(unit.id)}
                          onOpenChange={() => toggleUnit(unit.id)}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-card hover:bg-muted/50 transition-colors border">
                            <div className="flex items-center gap-2">
                              {openUnits.includes(unit.id) ? (
                                <ChevronDown className="h-4 w-4 text-primary" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                              <span className="font-medium text-sm text-left">{unit.title}</span>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-6 pt-2 space-y-1">
                            {unit.lessons.map(lesson => {
                              const Icon = getIconForType(lesson.type);
                              return (
                                <div
                                  key={lesson.id}
                                  className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                  <Icon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{lesson.title}</span>
                                  {lesson.dueDate && (
                                    <Badge variant="outline" className="ml-auto text-xs">
                                      {new Date(lesson.dueDate).toLocaleDateString('es-ES')}
                                    </Badge>
                                  )}
                                </div>
                              );
                            })}
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forum" className="p-6 m-0">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Input placeholder="Buscar en el foro..." className="flex-1" />
                  <Button onClick={() => setShowNewThread(!showNewThread)}>
                    Nuevo Tema
                  </Button>
                </div>

                {showNewThread && (
                  <div className="p-4 rounded-lg border bg-card mb-6">
                    <h4 className="font-semibold mb-3">Crear Nuevo Tema</h4>
                    <div className="space-y-3">
                      <Input placeholder="Título del tema" />
                      <Textarea placeholder="Escribe tu mensaje..." rows={4} />
                      <div className="flex gap-2">
                        <Button size="sm">Publicar</Button>
                        <Button size="sm" variant="outline" onClick={() => setShowNewThread(false)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {forumThreads.map(thread => (
                    <div
                      key={thread.id}
                      className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={thread.avatar}
                          alt={thread.author}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{thread.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {thread.preview}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{thread.author}</span>
                            <span>{thread.replies} respuestas</span>
                            <span>{thread.views} vistas</span>
                            <span className="ml-auto">{thread.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
