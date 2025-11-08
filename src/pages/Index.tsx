import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { AnnouncementsBanner } from "@/components/AnnouncementsBanner";
import { WeeklyDeliverables } from "@/components/WeeklyDeliverables";
import { courses, calendarEvents } from "@/data/coursesData";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenido/a, Ricardo Alvear</h1>
        </div>

        {/* Announcements Banner */}
        <AnnouncementsBanner />

        {/* Weekly Deliverables */}
        <WeeklyDeliverables events={calendarEvents} />

        {/* Courses Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Mis Cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate(`/curso/${course.id}`)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
