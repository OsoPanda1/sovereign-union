/**
 * 🛰️ TAMV SOCIAL NEXUS - MD-X4™
 * Feed social conectado a la base de datos con transacciones MSR
 */
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  TrendingUp, Award, Sparkles, Lock, Send,
  MoreHorizontal, Trash2, Globe, Image, Video,
  Smile, AtSign, Hash, Loader2
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePosts, Post } from "@/hooks/usePosts";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const SocialNexus = () => {
  const { posts, loading, creating, createPost, toggleLike, deletePost } = usePosts();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Post */}
      {isAuthenticated && (
        <CreatePostCard onSubmit={createPost} isCreating={creating} />
      )}
      
      {/* Feed */}
      <AnimatePresence mode="popLayout">
        {posts.length === 0 ? (
          <EmptyFeed />
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.4, type: "spring" }}
            >
              <PostCard 
                post={post} 
                onLike={() => toggleLike(post.id, post.user_has_liked || false)}
                onDelete={() => deletePost(post.id)}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="glass-sovereign rounded-3xl p-6 border border-primary/10 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-muted" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-muted rounded w-1/3" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
    </div>
  </div>
);

const EmptyFeed = () => (
  <motion.div 
    className="glass-sovereign rounded-3xl p-12 border border-primary/10 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <Globe className="w-16 h-16 text-primary/30 mx-auto mb-4" />
    <h3 className="font-orbitron text-lg text-foreground mb-2">El Nexo Está Vacío</h3>
    <p className="text-sm text-muted-foreground">
      Sé el primero en manifestar tu realidad en la Federación Korima
    </p>
  </motion.div>
);

interface CreatePostCardProps {
  onSubmit: (content: string, isEncrypted: boolean) => Promise<any>;
  isCreating: boolean;
}

const CreatePostCard = ({ onSubmit, isCreating }: CreatePostCardProps) => {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const { profile } = useProfile();

  const handleSubmit = async () => {
    if (!content.trim() || isCreating) return;
    const success = await onSubmit(content, isEncrypted);
    if (success) {
      setContent("");
      setIsEncrypted(false);
    }
  };

  const getInitials = () => {
    if (!profile?.display_name) return "TU";
    return profile.display_name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div 
      className={`glass-sovereign rounded-3xl border transition-all duration-300 overflow-hidden ${
        isFocused ? "border-primary/40 shadow-[0_0_30px_rgba(212,175,55,0.15)]" : "border-primary/10"
      }`}
      layout
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-0">
        <motion.div 
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-orbitron font-bold text-sm shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          {getInitials()}
        </motion.div>
        <div className="flex-1">
          <p className="font-orbitron text-sm text-foreground">
            {profile?.display_name || "Ciudadano Korima"}
          </p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Publicación Global
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        <textarea
          placeholder="¿Qué quieres manifestar en el Nexo?"
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 resize-none outline-none text-sm leading-relaxed min-h-[80px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={500}
        />
        
        {/* Character count */}
        <div className="flex justify-end">
          <span className={`text-[10px] font-mono ${content.length > 450 ? "text-destructive" : "text-muted-foreground"}`}>
            {content.length}/500
          </span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between p-4 pt-2 border-t border-primary/5 bg-secondary/20">
        <div className="flex items-center gap-1">
          <ActionIconButton icon={Image} tooltip="Imagen" />
          <ActionIconButton icon={Video} tooltip="Video" />
          <ActionIconButton icon={Smile} tooltip="Emoji" />
          <ActionIconButton icon={AtSign} tooltip="Mencionar" />
          <ActionIconButton icon={Hash} tooltip="Hashtag" />
          
          <button
            onClick={() => setIsEncrypted(!isEncrypted)}
            className={`p-2 rounded-xl transition-all ${
              isEncrypted 
                ? "bg-primary/20 text-primary" 
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        <Button 
          variant="sovereign" 
          size="sm"
          onClick={handleSubmit}
          disabled={!content.trim() || isCreating}
          className="min-w-[120px]"
        >
          {isCreating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-3 h-3 mr-2" />
              Manifestar
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const ActionIconButton = ({ icon: Icon, tooltip }: { icon: React.ElementType; tooltip: string }) => (
  <button 
    className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
    title={tooltip}
  >
    <Icon className="w-4 h-4" />
  </button>
);

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onDelete: () => void;
}

const PostCard = ({ post, onLike, onDelete }: PostCardProps) => {
  const { user } = useAuth();
  const [showActions, setShowActions] = useState(false);
  const isOwner = user?.id === post.author_id;

  const getInitials = () => {
    if (!post.author?.display_name) return "??";
    return post.author.display_name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { 
    addSuffix: false, 
    locale: es 
  });

  return (
    <motion.article 
      className="glass-sovereign rounded-3xl border border-primary/10 hover:border-primary/20 transition-all duration-300 overflow-hidden"
      whileHover={{ y: -2 }}
      layout
    >
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-0">
        <div className="flex items-center gap-3">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-orbitron font-bold text-sm shadow-lg ${
              post.author?.reputation_score && post.author.reputation_score >= 100
                ? "bg-gradient-to-br from-primary to-primary/60 text-primary-foreground"
                : "bg-secondary text-foreground"
            }`}>
              {getInitials()}
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background" />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-orbitron text-sm font-bold text-foreground">
                {post.author?.display_name || "Ciudadano Anónimo"}
              </h3>
              {post.author?.reputation_score && post.author.reputation_score >= 100 && (
                <Award className="w-4 h-4 text-primary" />
              )}
            </div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <span>hace {timeAgo}</span>
              <span>·</span>
              <Globe className="w-3 h-3 inline" />
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* MSR Value Badge */}
          <motion.div 
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-orbitron text-primary font-bold">
              +{post.msr_value.toFixed(2)} MSR
            </span>
          </motion.div>

          {/* Actions Menu */}
          {isOwner && (
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-all"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute right-0 top-full mt-2 w-40 glass-sovereign rounded-xl border border-primary/20 p-2 z-50"
                  >
                    <button 
                      onClick={() => { onDelete(); setShowActions(false); }}
                      className="w-full flex items-center gap-2 p-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {post.is_encrypted ? (
          <div className="relative">
            <p className="text-sm text-foreground/90 leading-relaxed blur-sm select-none">
              {post.content}
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="flex items-center gap-2 px-4 py-2 glass-sovereign rounded-xl border border-primary/30"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-orbitron text-primary">ANUBIS ENCRYPTED</span>
              </motion.div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="px-5 pb-2">
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
          {post.likes_count > 0 && (
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              {post.likes_count} energía MSR
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-primary/5">
        <div className="flex items-center gap-2">
          <EngagementButton 
            icon={Heart} 
            label={post.likes_count > 0 ? post.likes_count.toString() : "Energía"}
            isActive={post.user_has_liked}
            activeColor="text-red-500"
            activeBg="bg-red-500/10"
            onClick={onLike}
          />
          <EngagementButton 
            icon={MessageCircle} 
            label="Comentar"
          />
          <EngagementButton 
            icon={Share2} 
            label="Compartir"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
};

interface EngagementButtonProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  activeColor?: string;
  activeBg?: string;
  onClick?: () => void;
}

const EngagementButton = ({ 
  icon: Icon, 
  label, 
  isActive, 
  activeColor = "text-primary", 
  activeBg = "bg-primary/10",
  onClick 
}: EngagementButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
      isActive 
        ? `${activeColor} ${activeBg} font-medium` 
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    }`}
  >
    <Icon className={`w-4 h-4 ${isActive ? "fill-current" : ""}`} />
    <span className="text-xs">{label}</span>
  </motion.button>
);

export default SocialNexus;
