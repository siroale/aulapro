import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Calendar } from "@/components/Calendar";
import { CourseDetailModal } from "@/components/CourseDetailModal";
import { courses, calendarEvents, forumThreads } from "@/data/coursesData";
import { Course } from "@/data/coursesData";

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const getCourseForumThreads = (courseId: string) => {
    return forumThreads.filter(thread => thread.courseId === courseId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenido, Estudiante</h1>
          <p className="text-muted-foreground">Aquí está tu resumen académico</p>
        </div>

        {/* Calendar Section - Made Prominent */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Calendario y Próximas Entregas</h2>
          <Calendar events={calendarEvents} />
        </section>

        {/* Courses Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Mis Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => setSelectedCourse(course)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          forumThreads={getCourseForumThreads(selectedCourse.id)}
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Index;
