/**
 * 🛰️ TAMV SOCIAL NEXUS · MD‑X4 — VISUAL-FIRST FEED
 * 75% visual / 25% texto — Tarjetas inmersivas con glassmorphism
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MessageCircle, Share2, Bookmark,
  TrendingUp, Award, Sparkles, Lock, Send,
  MoreHorizontal, Trash2, Globe, Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { usePosts, Post } from "@/hooks/usePosts";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

// ──────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────

export const SocialNexus = () => {
  const { posts, loading, creating, createPost, toggleLike, deletePost } = usePosts();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-sovereign rounded-3xl p-6 animate-pulse">
            <div className="flex gap-3 items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="h-3 bg-muted rounded w-24" />
            </div>
            <div className="h-40 bg-muted rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Create post */}
      {isAuthenticated && <CreatePostCard onSubmit={createPost} isCreating={creating} />}

      {/* Feed */}
      <AnimatePresence mode="popLayout">
        {posts.length === 0 ? (
          <EmptyFeed />
        ) : (
          posts.map((post, i) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03, duration: 0.3, type: "spring" }}
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

// ──────────────────────────────────────────────
// EMPTY STATE - Visual, not texty
// ──────────────────────────────────────────────

const EmptyFeed = () => (
  <motion.div
    className="card-sovereign rounded-3xl p-8 text-center relative overflow-hidden"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
  >
    {/* Animated background */}
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full"
        style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
    <div className="relative z-10">
      <motion.span
        className="text-5xl block mb-4"
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🌍
      </motion.span>
      <p className="font-orbitron text-sm text-foreground mb-1">El Nexo espera tu voz</p>
      <p className="text-[10px] text-muted-foreground">Sé el primero en manifestar</p>
    </div>
  </motion.div>
);

// ──────────────────────────────────────────────
// CREATE POST - Compact, visual
// ──────────────────────────────────────────────

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
    if (success) { setContent(""); setIsEncrypted(false); }
  };

  const initials = profile?.display_name
    ? profile.display_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "TU";

  return (
    <motion.div
      className={`card-sovereign rounded-3xl overflow-hidden transition-all duration-300 ${
        isFocused ? "border-primary/40 shadow-[0_0_50px_hsla(45,92%,58%,0.12)]" : ""
      }`}
      layout
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar orb */}
          <motion.div
            className="w-10 h-10 rounded-full gold-metallic flex items-center justify-center text-xs font-orbitron font-bold text-primary-foreground shrink-0"
            whileHover={{ scale: 1.1, rotate: -3 }}
          >
            {initials}
          </motion.div>
          <textarea
            placeholder="¿Qué quieres manifestar?"
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none outline-none text-sm leading-relaxed min-h-[60px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={500}
          />
        </div>
      </div>

      {/* Action bar - minimal */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-primary/8 bg-card/40">
        <div className="flex items-center gap-1">
          {["📷", "🎬", "😊"].map((e, i) => (
            <button key={i} className="p-2 rounded-xl hover:bg-secondary text-sm transition-all">{e}</button>
          ))}
          <button
            onClick={() => setIsEncrypted(!isEncrypted)}
            className={`p-2 rounded-xl text-sm transition-all ${isEncrypted ? "bg-primary/15 ring-1 ring-primary/30" : "hover:bg-secondary"}`}
          >
            🔒
          </button>
          <span className={`text-[9px] font-mono ml-1 ${content.length > 450 ? "text-destructive" : "text-muted-foreground/50"}`}>
            {content.length}/500
          </span>
        </div>

        <Button
          variant="sovereign"
          size="sm"
          onClick={handleSubmit}
          disabled={!content.trim() || isCreating}
          className="min-w-[100px]"
        >
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : (
            <><Send className="w-3 h-3 mr-1.5" />Publicar</>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

// ──────────────────────────────────────────────
// POST CARD - Visual-first, glassmorphism
// ──────────────────────────────────────────────

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onDelete: () => void;
}

const PostCard = ({ post, onLike, onDelete }: PostCardProps) => {
  const { user } = useAuth();
  const [showActions, setShowActions] = useState(false);
  const isOwner = user?.id === post.author_id;
  const isSovereign = !!post.author?.reputation_score && post.author.reputation_score >= 100;

  const initials = post.author?.display_name
    ? post.author.display_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: false, locale: es });

  return (
    <motion.article
      className="card-sovereign rounded-3xl overflow-hidden relative group"
      whileHover={{ y: -3 }}
      layout
    >
      {/* Top energy line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Background glow on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(circle, hsla(45, 92%, 58%, 0.06) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-0 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-orbitron text-xs font-bold shrink-0 ${
              isSovereign ? "gold-metallic text-primary-foreground" : "glass-sovereign text-foreground"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            {initials}
          </motion.div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-orbitron text-xs font-bold text-foreground">
                {post.author?.display_name || "Anónimo"}
              </span>
              {isSovereign && <Award className="w-3.5 h-3.5 text-primary" />}
            </div>
            <span className="text-[9px] text-muted-foreground">{timeAgo}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* MSR badge - visual pill */}
          <motion.div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full msr-badge"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-[9px] font-orbitron text-gold-3d font-bold">
              +{post.msr_value.toFixed(1)}
            </span>
          </motion.div>

          {isOwner && (
            <div className="relative">
              <button onClick={() => setShowActions(!showActions)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute right-0 top-full mt-1 w-40 glass-sovereign rounded-xl border border-primary/20 p-1.5 z-50"
                  >
                    <button
                      onClick={() => { onDelete(); setShowActions(false); }}
                      className="w-full flex items-center gap-2 p-2 text-xs text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Eliminar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3 relative z-10">
        {post.is_encrypted ? (
          <EncryptedContent content={post.content} />
        ) : (
          <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        )}
      </div>

      {/* Engagement bar - icon-driven, minimal text */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-primary/6 relative z-10">
        <div className="flex items-center gap-1">
          <EngagementBtn
            icon={Heart}
            count={post.likes_count}
            active={post.user_has_liked}
            activeColor="text-red-500"
            activeBg="bg-red-500/10"
            onClick={onLike}
          />
          <EngagementBtn icon={MessageCircle} count={0} />
          <EngagementBtn icon={Share2} count={0} />
        </div>
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-xl hover:bg-secondary text-muted-foreground transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
};

// ──────────────────────────────────────────────
// ENCRYPTED CONTENT
// ──────────────────────────────────────────────

const EncryptedContent = ({ content }: { content: string }) => (
  <div className="relative rounded-2xl overflow-hidden p-4"
    style={{ background: 'linear-gradient(135deg, hsla(220, 15%, 8%, 0.8), hsla(220, 15%, 5%, 0.9))' }}>
    <p className="text-sm text-foreground/60 blur-sm select-none">{content}</p>
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="flex items-center gap-2 px-4 py-2 glass-sovereign rounded-xl border border-primary/30"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <Lock className="w-4 h-4 text-primary" />
        <span className="text-[9px] font-orbitron text-primary tracking-[0.2em]">ANUBIS ENCRYPTED</span>
      </motion.div>
    </div>
  </div>
);

// ──────────────────────────────────────────────
// ENGAGEMENT BUTTON
// ──────────────────────────────────────────────

interface EngagementBtnProps {
  icon: React.ElementType;
  count: number;
  active?: boolean;
  activeColor?: string;
  activeBg?: string;
  onClick?: () => void;
}

const EngagementBtn = ({ icon: Icon, count, active, activeColor = "text-primary", activeBg = "bg-primary/10", onClick }: EngagementBtnProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all ${
      active ? `${activeColor} ${activeBg} font-medium` : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? "fill-current" : ""}`} />
    {count > 0 && <span className="text-[10px]">{count}</span>}
  </motion.button>
);

export default SocialNexus;
