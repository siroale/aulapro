import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Dialog removed - inline create post form implemented
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, MessageSquare, Eye } from "lucide-react";
import { ForumThread } from "@/data/coursesData";

interface ForumTabProps {
  courseId: string;
  threads: ForumThread[];
}

export const ForumTab = ({ courseId, threads }: ForumTabProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [threadList, setThreadList] = useState<ForumThread[]>(threads);
  const [isCreating, setIsCreating] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState<string[]>([]);

  const availableTags = ["Certamen", "Tarea", "Laboratorio", "Materia", "Petición", "Duda"];

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      Certamen: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Tarea: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Laboratorio: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Materia: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Petición: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Duda: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };
    return colors[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const filteredThreads = threadList.filter((thread) => {
    const matchesSearch =
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => thread.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newThread: ForumThread = {
      id: `t${Date.now()}`,
      courseId,
      author: "Usuario Actual",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Current",
      title: newPostTitle.trim(),
      preview: newPostContent.trim().slice(0, 140),
      content: newPostContent.trim(),
      tags: newPostTags.length ? newPostTags : ["Duda"],
      replies: [],
      lastActivity: "Justo ahora",
      views: 0,
      votes: 0,
    };

    setThreadList([newThread, ...threadList]);

    // Reset and collapse
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTags([]);
    setIsCreating(false);
  };

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleNewPostTag = (tag: string) => {
    setNewPostTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleThreadClick = (thread: ForumThread) => {
    navigate(`/curso/${courseId}/foro/${thread.id}`, { state: { thread } });
  };

  return (
    <div className="space-y-6">
      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en el foro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsCreating((v) => !v)}>
          <Plus className="h-4 w-4 mr-2" />
          {isCreating ? "Cancelar" : "Nueva Publicación"}
        </Button>
      </div>

      {isCreating && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Título de tu publicación"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Contenido</Label>
              <Textarea
                id="content"
                placeholder="Escribe tu publicación..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label>Etiquetas</Label>
              <div className="flex flex-wrap gap-3">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`new-${tag}`}
                      checked={newPostTags.includes(tag)}
                      onCheckedChange={() => toggleNewPostTag(tag)}
                    />
                    <Label htmlFor={`new-${tag}`} className="text-sm cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewPostTitle("");
                  setNewPostContent("");
                  setNewPostTags([]);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreatePost}>Publicar</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <Badge
            key={tag}
            className={`cursor-pointer transition-opacity ${
              selectedTags.includes(tag)
                ? getTagColor(tag)
                : "bg-muted text-muted-foreground opacity-60 hover:opacity-100"
            }`}
            onClick={() => toggleTagFilter(tag)}
          >
            {tag}
          </Badge>
        ))}
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTags([])}
            className="h-6 text-xs"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Thread List */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => (
          <Card
            key={thread.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleThreadClick(thread)}
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={thread.avatar} alt={thread.author} />
                <AvatarFallback>{thread.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {thread.title}
                </h3>
                <div className="flex gap-2 mb-2">
                  {thread.tags.map((tag) => (
                    <Badge key={tag} className={getTagColor(tag)}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {thread.preview}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="font-medium">{thread.author}</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{thread.replies.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{thread.views}</span>
                  </div>
                  <span>{thread.lastActivity}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredThreads.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron publicaciones
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
