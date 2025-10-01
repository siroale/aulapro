import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { GeneralInfoTab } from "@/components/course-tabs/GeneralInfoTab";
import { MaterialsTab } from "@/components/course-tabs/MaterialsTab";
import { ForumTab } from "@/components/course-tabs/ForumTab";
import { GradesTab } from "@/components/course-tabs/GradesTab";
import { courses, forumThreads } from "@/data/coursesData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CoursePage = () => {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);

  // Scroll to top when entering course page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-foreground">Curso no encontrado</h1>
        </main>
      </div>
    );
  }

  const courseForumThreads = forumThreads.filter((thread) => thread.courseId === courseId);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTab = params.get("tab") ?? "general";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {course.code} - {course.name}
            </h1>
            <p className="text-muted-foreground">{course.instructor}</p>
          </div>

          {/* Tabbed Content */}
          <Tabs defaultValue={initialTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="materials">Contenidos y Evaluaciones</TabsTrigger>
              <TabsTrigger value="forum">Foro</TabsTrigger>
              <TabsTrigger value="grades">Calificaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <GeneralInfoTab course={course} />
            </TabsContent>

            <TabsContent value="materials">
              <MaterialsTab course={course} />
            </TabsContent>

            <TabsContent value="forum">
              <ForumTab courseId={course.id} threads={courseForumThreads} />
            </TabsContent>

            <TabsContent value="grades">
              <GradesTab courseId={course.id} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
