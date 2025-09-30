import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, FileText, Upload, Download } from "lucide-react";
import { courses } from "@/data/coursesData";

export default function AssignmentDetailPage() {
  const { courseId, assignmentId } = useParams();
  const navigate = useNavigate();

  // Find the course
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-muted-foreground">Curso no encontrado</p>
          </div>
        </div>
      </>
    );
  }

  // Mock assignment data - in a real app, this would come from the database
  const assignment = {
    id: assignmentId,
    title: "Tarea 1: Análisis de Sistemas",
    dueDate: "2025-10-15",
    dueTime: "23:59",
    description: "Realizar un análisis completo del sistema propuesto, identificando componentes clave, flujos de datos y posibles mejoras. El trabajo debe incluir diagramas de flujo, análisis de requisitos y propuestas de optimización.",
    attachedFiles: [
      { id: "1", name: "Enunciado.pdf", size: "2.4 MB" },
      { id: "2", name: "Instrucciones.pdf", size: "1.1 MB" },
      { id: "3", name: "Rúbrica.pdf", size: "850 KB" },
    ],
    status: "pending" as "pending" | "submitted" | "graded",
    submittedFile: null,
    grade: null,
  };

  const handleFileOpen = () => {
    // Open PDF in new tab (same as materials)
    window.open("https://drive.google.com/file/d/1TAU46-xzQg3QiTcOaj50xAh1pBUAWX7Y/view?usp=sharing", "_blank");
  };

  const getStatusBadge = () => {
    switch (assignment.status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
      case "submitted":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Entregado</Badge>;
      case "graded":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Calificado</Badge>;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate(`/curso/${courseId}`)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Curso
          </Button>

          {/* Assignment Header */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-2">
                    {course.code} - {course.name}
                  </div>
                  <CardTitle className="text-2xl mb-3">{assignment.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Fecha de entrega: {new Date(assignment.dueDate).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })} - {assignment.dueTime}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge()}
              </div>
            </CardHeader>
          </Card>

          {/* Assignment Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Descripción de la Tarea</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {assignment.description}
              </p>
            </CardContent>
          </Card>

          {/* Attached Files */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Archivos Adjuntos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {assignment.attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={handleFileOpen}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submission Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sección de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignment.status === "pending" ? (
                <>
                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium text-foreground mb-1">
                      Arrastra tu archivo aquí o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Formatos soportados: PDF, DOC, DOCX, ZIP (Máx. 25 MB)
                    </p>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Comentarios (Opcional)
                    </label>
                    <Textarea
                      placeholder="Agrega comentarios adicionales sobre tu entrega..."
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      No hay entregas aún
                    </p>
                    <Button size="lg" disabled>
                      <Upload className="h-4 w-4 mr-2" />
                      Entregar Tarea
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {assignment.status === "submitted" && "Tu tarea ha sido entregada y está siendo revisada."}
                    {assignment.status === "graded" && `Tu tarea ha sido calificada. Nota: ${assignment.grade}/100`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
