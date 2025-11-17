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
import { images } from "@/assets/images";

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
                src={images.logoUsm} 
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