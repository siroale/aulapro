import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Course } from "@/data/coursesData";

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export const CourseCard = ({ course, onClick }: CourseCardProps) => {
  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case "DEFIDER":
        return "bg-course-defider";
      case "INDUSTRIAS":
        return "bg-course-industrias";
      case "Miscelánea":
        return "bg-course-misc";
      default:
        return "bg-primary";
    }
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className={`absolute inset-0 ${getDepartmentColor(course.department)} opacity-60 mix-blend-multiply`}></div>
        <Badge className="absolute top-3 right-3 bg-card text-foreground">
          {course.department}
        </Badge>
      </div>
      <div className="p-4">
        <div className="text-sm font-medium text-muted-foreground mb-1">{course.code}</div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{course.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{course.instructor}</p>
        </div>
      </div>
    </Card>
  );
};
