import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ForumThread } from "@/data/coursesData";
import { Search, Plus, ThumbsUp, ThumbsDown, MessageSquare, Eye } from "lucide-react";

interface ForumTabProps {
  courseId: string;
  threads: ForumThread[];
}

interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  votes: number;
}

export const ForumTab = ({ courseId, threads: initialThreads }: ForumTabProps) => {
  const [threads, setThreads] = useState(initialThreads);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [threadVotes, setThreadVotes] = useState<Record<string, number>>({});
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down" | null>>({});
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});

  const handleVote = (threadId: string, voteType: "up" | "down") => {
    const currentVote = userVotes[threadId];
    let newVotes = threadVotes[threadId] || 0;

    if (currentVote === voteType) {
      // Remove vote
      newVotes += voteType === "up" ? -1 : 1;
      setUserVotes({ ...userVotes, [threadId]: null });
    } else {
      // Add or change vote
      if (currentVote) {
        newVotes += voteType === "up" ? 2 : -2;
      } else {
        newVotes += voteType === "up" ? 1 : -1;
      }
      setUserVotes({ ...userVotes, [threadId]: voteType });
    }

    setThreadVotes({ ...threadVotes, [threadId]: newVotes });
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newThread: ForumThread = {
      id: `new-${Date.now()}`,
      courseId,
      author: "Tú",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
      title: newPostTitle,
      preview: newPostContent.substring(0, 100) + "...",
      replies: 0,
      lastActivity: "Ahora",
      views: 0,
    };

    setThreads([newThread, ...threads]);
    setNewPostTitle("");
    setNewPostContent("");
    setIsCreateModalOpen(false);
  };

  const handleReply = (threadId: string) => {
    if (!replyContent.trim()) return;

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      author: "Tú",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
      content: replyContent,
      timestamp: "Ahora",
      votes: 0,
    };

    setReplies({
      ...replies,
      [threadId]: [...(replies[threadId] || []), newReply],
    });

    setReplyContent("");
    setSelectedThread(null);

    // Update reply count
    setThreads(
      threads.map((t) =>
        t.id === threadId ? { ...t, replies: t.replies + 1 } : t
      )
    );
  };

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Tema
        </Button>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {filteredThreads.map((thread) => {
          const voteCount = threadVotes[thread.id] || 0;
          const userVote = userVotes[thread.id];
          const threadReplies = replies[thread.id] || [];

          return (
            <Card key={thread.id} className="p-4">
              <div className="flex gap-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${userVote === "up" ? "text-primary" : ""}`}
                    onClick={() => handleVote(thread.id, "up")}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{voteCount}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${userVote === "down" ? "text-accent" : ""}`}
                    onClick={() => handleVote(thread.id, "down")}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Thread Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={thread.avatar} />
                      <AvatarFallback>{thread.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{thread.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{thread.preview}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{thread.author}</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {thread.replies + threadReplies.length} respuestas
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {thread.views} vistas
                        </span>
                        <span>{thread.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {threadReplies.length > 0 && (
                    <div className="ml-12 mt-4 space-y-3 border-l-2 border-border pl-4">
                      {threadReplies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.avatar} />
                            <AvatarFallback>{reply.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{reply.author}</span>
                              <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {selectedThread === thread.id ? (
                    <div className="ml-12 mt-4">
                      <Textarea
                        placeholder="Escribe tu respuesta..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => handleReply(thread.id)}>Publicar Respuesta</Button>
                        <Button variant="outline" onClick={() => setSelectedThread(null)}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-12 mt-2"
                      onClick={() => setSelectedThread(thread.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Responder
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Create Post Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Tema</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Título</label>
              <Input
                placeholder="Título del tema..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Contenido</label>
              <Textarea
                placeholder="Describe tu tema o pregunta..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePost}>Publicar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
