import { useState } from "react";
import { User, Mail, Phone, Calendar, BookOpen, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/Navbar";

const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nombre: "Ricardo Alvear",
    email: "ricardo.alvear@usm.cl",
    telefono: "+56 9 1234 5678",
    carrera: "Ingeniería Civil Informática",
    fechaIngreso: "Marzo 2022",
    numeroEstudiante: "202273545-7",
  });

  const [editedData, setEditedData] = useState(userData);

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const cursosActuales = [
    { codigo: "INF-285", nombre: "Computación Científica", creditos: 4, instructor: "Roberto León" },
    { codigo: "ICN-270", nombre: "Información y Matemática Financiera", creditos: 3, instructor: "Myriam Olea" },
    { codigo: "INF-343", nombre: "Sistemas Distribuidos", creditos: 4, instructor: "Jorge Díaz" },
    { codigo: "INF-266", nombre: "Sistemas de Gestión", creditos: 3, instructor: "Mauricio Olivares" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
          <p className="text-muted-foreground mt-2">Información personal y académica</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Foto y datos básicos */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-primary flex items-center justify-center mb-4">
                    <User className="h-16 w-16 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-center">{userData.nombre}</h2>
                  <p className="text-sm text-muted-foreground text-center mt-1">{userData.numeroEstudiante}</p>
                  <Badge className="mt-3">{userData.carrera}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha - Información detallada */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tus datos de contacto</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nombre Completo
                    </Label>
                    {isEditing ? (
                      <Input
                        id="nombre"
                        value={editedData.nombre}
                        onChange={(e) => setEditedData({ ...editedData, nombre: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-medium py-2">{userData.nombre}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Correo Electrónico
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-medium py-2">{userData.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Teléfono
                    </Label>
                    {isEditing ? (
                      <Input
                        id="telefono"
                        value={editedData.telefono}
                        onChange={(e) => setEditedData({ ...editedData, telefono: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-medium py-2">{userData.telefono}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Número de Estudiante
                    </Label>
                    <p className="text-sm font-medium py-2">{userData.numeroEstudiante}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Cursos Actuales
                </CardTitle>
                <CardDescription>Semestre en curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cursosActuales.map((curso) => (
                    <div
                      key={curso.codigo}
                      className="flex flex-col p-4 border rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-lg">{curso.codigo}</p>
                          <Badge variant="secondary" className="mt-1">{curso.creditos} créditos</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{curso.nombre}</p>
                      <p className="text-xs text-muted-foreground">{curso.instructor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;