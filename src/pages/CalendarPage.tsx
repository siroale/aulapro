import { Navbar } from "@/components/Navbar";
import { Calendar } from "@/components/Calendar";
import { calendarEvents } from "@/data/coursesData";

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendario Académico</h1>
          <p className="text-muted-foreground">Visualiza todas tus entregas y eventos importantes</p>
        </div>

        <Calendar events={calendarEvents} />
      </main>
    </div>
  );
};

export default CalendarPage;
