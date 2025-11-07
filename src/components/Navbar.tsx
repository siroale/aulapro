import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  // Get current path from window.location
  const currentPath = window.location.pathname;
  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    // Aquí puedes agregar tu lógica de cierre de sesión
    // Por ejemplo: limpiar tokens, redirigir, etc.
    console.log("Cerrando sesión...");
    // window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center gap-6">
            {/* University Logo - Replace logo-usm.png in src/assets folder with your logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/src/assets/logo-usm.png" 
                alt="Universidad Técnica Federico Santa María" 
                className="h-12 w-auto object-contain"
              />
            </a>
            
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className={isActive("/") ? "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800" : ""}
              >
                <a href="/">Página Principal</a>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className={isActive("/calendario") ? "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800" : ""}
              >
                <a href="/calendario">Calendario</a>
              </Button>
            </div>
          </div>

          {/* Right side - notifications, user */}
          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 bg-popover">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Nueva tarea disponible</p>
                    <p className="text-xs text-muted-foreground">DEF-101 - Hace 2 horas</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Calificación publicada</p>
                    <p className="text-xs text-muted-foreground">IND-201 - Hace 5 horas</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Recordatorio de examen</p>
                    <p className="text-xs text-muted-foreground">IND-305 - Hace 1 día</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/perfil" className="cursor-pointer">Perfil</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};