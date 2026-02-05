/**
 * 🛰️ TAMV SOCIAL NEXUS · MD‑X4
 * Consola civilizacional de estado social + MSR + Kórima
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MessageCircle, Share2, Bookmark,
  TrendingUp, Award, Sparkles, Lock, Send,
  MoreHorizontal, Trash2, Globe, Image, Video,
  Smile, AtSign, Hash, Loader2, Shield, Activity
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { usePosts, Post } from "@/hooks/usePosts";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

/**
 * Estado agregado del Nexo: energía MSR total, entropía, nivel de Kórima, etc.
 * Hook opcional: podrías enlazarlo a tu backend MD‑X4 / ISABELLA.
 */
interface NexusState {
  totalMsr: number;
  activeCitizens: number;
  encryptedRatio: number;       // % de posts ANUBIS ENCRYPTED
  korimaIndex: number;          // índice Kórima (solidaridad/ayuda mutua)
}

const mockNexusState: NexusState = {
  totalMsr: 12874.42,
  activeCitizens: 87,
  encryptedRatio: 0.34,
  korimaIndex: 0.78,
};

// ──────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ──────────────────────────────────────────────────────────────

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
      {/* Banner de estado civilizacional */}
      <NexusStatusBar state={mockNexusState} />

      {/* Crear manifestación en el Nexo */}
      {isAuthenticated && (
        <CreatePostCard onSubmit={createPost} isCreating={creating} />
      )}

      {/* Feed civilizacional */}
      <AnimatePresence mode="popLayout">
        {posts.length === 0 ? (
          <EmptyFeed />
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.04, duration: 0.35, type: "spring" }}
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

// ──────────────────────────────────────────────────────────────
// ESTADO GLOBAL DEL NEXO (MSR + KÓRIMA + CIFRADO)
// ──────────────────────────────────────────────────────────────

const NexusStatusBar = ({ state }: { state: NexusState }) => {
  const encryptedPercent = Math.round(state.encryptedRatio * 100);
  const korimaPercent = Math.round(state.korimaIndex * 100);

  return (
    <motion.section
      className="glass-sovereign rounded-3xl border border-primary/30 p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="relative">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-background" />
        </div>
        <div>
          <p className="font-orbitron text-xs md:text-sm text-foreground">
            TAMV SOCIAL NEXUS · <span className="text-primary">MD‑X4</span>
          </p>
          <p className="text-[10px] md:text-[11px] text-muted-foreground">
            Estado vivo de la Federación Kórima · MSR como energía social
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] md:text-[11px] font-mono">
        <StatusPill
          icon={TrendingUp}
          label="MSR en órbita"
          value={`${state.totalMsr.toFixed(2)} MSR`}
        />
        <StatusPill
          icon={Activity}
          label="Ciudadanos activos"
          value={state.activeCitizens.toString()}
        />
        <StatusPill
          icon={Shield}
          label="Tráfico cifrado"
          value={`${encryptedPercent}% ANUBIS`}
        />
        <StatusPill
          icon={Award}
          label="Índice Kórima"
          value={`${korimaPercent}/100`}
        />
      </div>
    </motion.section>
  );
};

const StatusPill = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-primary/5 border border-primary/20">
    <Icon className="w-3 h-3 text-primary" />
    <div className="flex flex-col leading-tight">
      <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <span className="text-[11px] text-primary font-semibold">{value}</span>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────
// ESTADOS VACÍOS / CARGA
// ──────────────────────────────────────────────────────────────

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
    className="glass-sovereign rounded-3xl p-12 border border-primary/10 text-center relative overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#22d3ee33,_transparent_60%),_radial-gradient(circle_at_bottom,_#d946ef33,_transparent_60%)]" />
    <div className="relative">
      <Globe className="w-16 h-16 text-primary/40 mx-auto mb-4" />
      <h3 className="font-orbitron text-lg text-foreground mb-2">
        El Nexo está en silencio
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        Sé el primero en manifestar tu línea de tiempo. Todo lo que publiques aquí
        alimenta la memoria viva de TAMV MD‑X4.
      </p>
    </div>
  </motion.div>
);

// ──────────────────────────────────────────────────────────────
// CREAR MANIFESTACIÓN (POST)
// ──────────────────────────────────────────────────────────────

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
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      className={`glass-sovereign rounded-3xl border transition-all duration-300 overflow-hidden ${
        isFocused
          ? "border-primary/50 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
          : "border-primary/15"
      }`}
      layout
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-0">
        <motion.div
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 flex items-center justify-center text-primary-foreground font-orbitron font-bold text-sm shadow-xl"
          whileHover={{ scale: 1.05, rotate: -1 }}
        >
          {getInitials()}
        </motion.div>
        <div className="flex-1">
          <p className="font-orbitron text-sm text-foreground">
            {profile?.display_name || "Ciudadano Kórima"}
          </p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Globe className="w-3 h-3" />
            Manifiesto público en el Nexo
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        <textarea
          placeholder="¿Qué quieres inscribir en la memoria de TAMV hoy?"
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 resize-none outline-none text-sm leading-relaxed min-h-[96px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={500}
        />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>
              MSR se acuña desde la interacción real, no desde la explotación de datos.
            </span>
          </div>
          <span
            className={`text-[10px] font-mono ${
              content.length > 450 ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {content.length}/500
          </span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between p-4 pt-2 border-t border-primary/10 bg-secondary/20">
        <div className="flex items-center gap-1">
          <ActionIconButton icon={Image} tooltip="Adjuntar imagen" />
          <ActionIconButton icon={Video} tooltip="Adjuntar video" />
          <ActionIconButton icon={Smile} tooltip="Añadir emociones" />
          <ActionIconButton icon={AtSign} tooltip="Mencionar ciudadano" />
          <ActionIconButton icon={Hash} tooltip="Vincular narrativa" />

          <button
            onClick={() => setIsEncrypted(!isEncrypted)}
            className={`ml-1 p-2 rounded-xl flex items-center gap-1 text-[11px] transition-all ${
              isEncrypted
                ? "bg-primary/20 text-primary"
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline-block">
              ANUBIS
            </span>
          </button>
        </div>

        <Button
          variant="sovereign"
          size="sm"
          onClick={handleSubmit}
          disabled={!content.trim() || isCreating}
          className="min-w-[140px]"
        >
          {isCreating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-3 h-3 mr-2" />
              Manifestar en el Nexo
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const ActionIconButton = ({
  icon: Icon,
  tooltip,
}: {
  icon: React.ElementType;
  tooltip: string;
}) => (
  <button
    className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
    title={tooltip}
  >
    <Icon className="w-4 h-4" />
  </button>
);

// ──────────────────────────────────────────────────────────────
// TARJETA DE POST · MSR + CIFRADO ANUBIS + REPUTACIÓN
// ──────────────────────────────────────────────────────────────

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
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: false,
    locale: es,
  });

  const isSovereignCreator = !!post.author?.reputation_score && post.author.reputation_score >= 100;

  return (
    <motion.article
      className="glass-sovereign rounded-3xl border border-primary/12 hover:border-primary/35 transition-all duration-300 overflow-hidden relative"
      whileHover={{ y: -2 }}
      layout
    >
      {/* Halo MD‑X4 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-primary opacity-70" />

      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-0">
        <div className="flex items-center gap-3">
          <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-orbitron font-bold text-sm shadow-lg ${
                isSovereignCreator
                  ? "bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {getInitials()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-background" />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-orbitron text-sm font-bold text-foreground">
                {post.author?.display_name || "Ciudadano anónimo"}
              </h3>
              {isSovereignCreator && <Award className="w-4 h-4 text-primary" />}
            </div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              <span>hace {timeAgo}</span>
              <span>·</span>
              <Globe className="w-3 h-3 inline" />
              <span>Transacción social MSR</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Badge MSR */}
          <motion.div
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-orbitron text-primary font-bold">
              +{post.msr_value.toFixed(2)} MSR
            </span>
          </motion.div>

          {/* Acciones dueño */}
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
                    className="absolute right-0 top-full mt-2 w-44 glass-sovereign rounded-xl border border-primary/30 p-2 z-50"
                  >
                    <button
                      onClick={() => {
                        onDelete();
                        setShowActions(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar manifestación
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
          <EncryptedContent content={post.content} />
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
              {post.likes_count} unidades de energía MSR
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-primary/8 bg-secondary/10">
        <div className="flex items-center gap-2">
          <EngagementButton
            icon={Heart}
            label={post.likes_count > 0 ? post.likes_count.toString() : "Energizar"}
            isActive={post.user_has_liked}
            activeColor="text-red-500"
            activeBg="bg-red-500/10"
            onClick={onLike}
          />
          <EngagementButton icon={MessageCircle} label="Resonar" />
          <EngagementButton icon={Share2} label="Expandir" />
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

// Contenido cifrado visualmente “ANUBIS ENCRYPTED”
const EncryptedContent = ({ content }: { content: string }) => (
  <div className="relative">
    <p className="text-sm text-foreground/90 leading-relaxed blur-sm select-none">
      {content}
    </p>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="flex items-center gap-2 px-4 py-2 glass-sovereign rounded-xl border border-primary/40 bg-background/80"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <Lock className="w-4 h-4 text-primary" />
        <span className="text-[10px] font-orbitron text-primary tracking-[0.2em]">
          ANUBIS ENCRYPTED
        </span>
      </motion.div>
    </div>
  </div>
);

// ──────────────────────────────────────────────────────────────
// BOTONES DE INTERACCIÓN
// ──────────────────────────────────────────────────────────────

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
  onClick,
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
