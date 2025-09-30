import { Card } from "@/components/ui/card";
import { Course } from "@/data/coursesData";
import { User, Calendar, BookOpen, Clock } from "lucide-react";

interface GeneralInfoTabProps {
  course: Course;
}

export const GeneralInfoTab = ({ course }: GeneralInfoTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Descripción del Curso</h3>
        <p className="text-muted-foreground leading-relaxed">{course.description}</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Instructor</h3>
          </div>
          <p className="text-muted-foreground">{course.instructor}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Departamento</h3>
          </div>
          <p className="text-muted-foreground">{course.department}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Horario</h3>
          </div>
          <p className="text-muted-foreground">Lunes y Miércoles, 10:00 - 12:00</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Créditos</h3>
          </div>
          <p className="text-muted-foreground">4 créditos</p>
        </Card>
      </div>
    </div>
  );
};
