import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { forumThreads } from "@/data/coursesData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, ArrowLeft, MessageSquare } from "lucide-react";
import type { ForumReply } from "@/data/coursesData";

const ThreadDetailPage = () => {
  const { courseId, threadId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const passedThread = (location.state as any)?.thread;
  const thread = passedThread || forumThreads.find((t) => t.id === threadId && t.courseId === courseId);

  const [votes, setVotes] = useState<Record<string, number>>(
    thread ? { [thread.id]: thread.votes } : {}
  );
  const [replyVotes, setReplyVotes] = useState<Record<string, number>>(
    thread?.replies.reduce((acc, reply) => ({ ...acc, [reply.id]: reply.votes }), {}) || {}
  );
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down" | null>>({});
  const [replies, setReplies] = useState<ForumReply[]>(thread?.replies || []);
  const [replyContent, setReplyContent] = useState("");
  const [nestedReplyContent, setNestedReplyContent] = useState<Record<string, string>>({});
  const [showReplyForm, setShowReplyForm] = useState<Record<string, boolean>>({});

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-foreground">Hilo no encontrado</h1>
        </main>
      </div>
    );
  }

  const handleVote = (id: string, voteType: "up" | "down", isReply: boolean = false) => {
    const currentVote = userVotes[id];
    
    // If clicking the same vote, remove it (toggle)
    if (currentVote === voteType) {
      setUserVotes({ ...userVotes, [id]: null });
      if (isReply) {
        setReplyVotes((prev) => ({
          ...prev,
          [id]: (prev[id] || 0) - (voteType === "up" ? 1 : -1),
        }));
      } else {
        setVotes((prev) => ({
          ...prev,
          [id]: (prev[id] || 0) - (voteType === "up" ? 1 : -1),
        }));
      }
      return;
    }
    
    // Calculate the vote change
    let voteChange = voteType === "up" ? 1 : -1;
    if (currentVote) {
      // Remove previous vote and add new vote
      voteChange += currentVote === "up" ? -1 : 1;
    }
    
    setUserVotes({ ...userVotes, [id]: voteType });
    
    if (isReply) {
      setReplyVotes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + voteChange,
      }));
    } else {
      setVotes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + voteChange,
      }));
    }
  };

  const handleMainReply = () => {
    if (!replyContent.trim()) return;

    const newReply: ForumReply = {
      id: `r${Date.now()}`,
      author: "Usuario Actual",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Current",
      content: replyContent,
      timestamp: "Justo ahora",
      votes: 0,
    };

    setReplies([...replies, newReply]);
    setReplyVotes({ ...replyVotes, [newReply.id]: 0 });
    setReplyContent("");
  };

  const handleNestedReply = (parentReplyId: string) => {
    const content = nestedReplyContent[parentReplyId];
    if (!content?.trim()) return;

    const newReply: ForumReply = {
      id: `r${Date.now()}`,
      author: "Usuario Actual",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Current",
      content: content,
      timestamp: "Justo ahora",
      votes: 0,
      parentReplyId: parentReplyId,
    };

    setReplies([...replies, newReply]);
    setReplyVotes({ ...replyVotes, [newReply.id]: 0 });
    setNestedReplyContent({ ...nestedReplyContent, [parentReplyId]: "" });
    setShowReplyForm({ ...showReplyForm, [parentReplyId]: false });
  };

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      Certamen: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Tarea: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Laboratorio: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Materia: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Consulta: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Duda: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };
    return colors[tag] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const renderReplies = (parentReplyId?: string, depth: number = 0) => {
    const filteredReplies = replies.filter((r) => r.parentReplyId === parentReplyId);

    return filteredReplies.map((reply) => (
      <div key={reply.id} className={depth > 0 ? "ml-8 mt-4 border-l-2 border-border pl-4" : "mt-4"}>
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={reply.avatar} alt={reply.author} />
              <AvatarFallback>{reply.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-foreground">{reply.author}</span>
                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
              </div>
              <p className="text-sm text-foreground mb-3">{reply.content}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={userVotes[reply.id] === "up" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVote(reply.id, "up", true)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{replyVotes[reply.id] || reply.votes}</span>
                  <Button
                    variant={userVotes[reply.id] === "down" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVote(reply.id, "down", true)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setShowReplyForm({ ...showReplyForm, [reply.id]: !showReplyForm[reply.id] })
                  }
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Responder
                </Button>
              </div>
              {showReplyForm[reply.id] && (
                <div className="mt-4">
                  <Textarea
                    placeholder="Escribe tu respuesta..."
                    value={nestedReplyContent[reply.id] || ""}
                    onChange={(e) =>
                      setNestedReplyContent({
                        ...nestedReplyContent,
                        [reply.id]: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleNestedReply(reply.id)}>Publicar Respuesta</Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setShowReplyForm({ ...showReplyForm, [reply.id]: false })
                      }
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
        {renderReplies(reply.id, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/curso/${courseId}?tab=forum`)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Foro
        </Button>

        {/* Main Thread */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={thread.avatar} alt={thread.author} />
              <AvatarFallback>{thread.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">{thread.title}</h1>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-muted-foreground">{thread.author}</span>
                <span className="text-xs text-muted-foreground">{thread.lastActivity}</span>
              </div>
              <div className="flex gap-2 mb-4">
                {thread.tags.map((tag) => (
                  <Badge key={tag} className={getTagColor(tag)}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-foreground mb-4">{thread.content}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={userVotes[thread.id] === "up" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVote(thread.id, "up")}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{votes[thread.id] || thread.votes}</span>
                  <Button
                    variant={userVotes[thread.id] === "down" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVote(thread.id, "down")}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">{thread.views} vistas</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Replies */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Respuestas ({replies.length})
          </h2>
          {renderReplies()}
        </div>

        {/* Main Reply Form */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Responder</h3>
          <Textarea
            placeholder="Escribe tu respuesta..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-4"
            rows={4}
          />
          <Button onClick={handleMainReply}>Publicar Respuesta</Button>
        </Card>
      </main>
    </div>
  );
};

export default ThreadDetailPage;
