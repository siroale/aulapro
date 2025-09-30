import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CourseStructureSidebar } from "@/components/CourseStructureSidebar";
import { GeneralInfoTab } from "@/components/course-tabs/GeneralInfoTab";
import { MaterialsTab } from "@/components/course-tabs/MaterialsTab";
import { ForumTab } from "@/components/course-tabs/ForumTab";
import { GradesTab } from "@/components/course-tabs/GradesTab";
import { courses, forumThreads } from "@/data/coursesData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const CoursePage = () => {
  const { courseId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const course = courses.find((c) => c.id === courseId);

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {/* Desktop Sidebar */}
        <CourseStructureSidebar
          course={course}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isMobile={false}
        />

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-background">
            <CourseStructureSidebar
              course={course}
              isOpen={true}
              onToggle={() => setMobileMenuOpen(false)}
              isMobile={true}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden mb-4"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Course Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {course.code} - {course.name}
              </h1>
              <p className="text-muted-foreground">{course.instructor}</p>
            </div>

            {/* Tabbed Content */}
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="general">Información General</TabsTrigger>
                <TabsTrigger value="materials">Materiales</TabsTrigger>
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
    </div>
  );
};

export default CoursePage;
