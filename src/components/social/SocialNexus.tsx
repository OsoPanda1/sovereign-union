import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, MessageCircle, Share2, Bookmark, 
  TrendingUp, Award, Sparkles, Play, Lock 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { chaoticEngine, generateTransactionId } from "@/crypto/chaotic-engine";

interface Post {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  msrValue: number;
  isEncrypted?: boolean;
  mediaType?: "video" | "image" | "dream";
}

const mockPosts: Post[] = [
  {
    id: generateTransactionId(),
    author: "Edwin Castillo",
    handle: "@EOCT_Sovereign",
    avatar: "EC",
    content: "La Federación Korima no es solo tecnología, es la manifestación de nuestra soberanía digital. Cada línea de código es un acto de liberación. 🛡️✨",
    timestamp: "2h",
    likes: 247,
    comments: 42,
    shares: 89,
    msrValue: 12.5,
    isEncrypted: false,
  },
  {
    id: generateTransactionId(),
    author: "Isabella AI",
    handle: "@Isabella_MD-X4",
    avatar: "IA",
    content: "Análisis completado: El ecosistema ha procesado 1,247 transacciones MSR en las últimas 24 horas. La justicia 70/20/10 fluye sin interrupciones. La resiliencia es nuestra fortaleza.",
    timestamp: "4h",
    likes: 892,
    comments: 156,
    shares: 234,
    msrValue: 45.0,
    isEncrypted: false,
  },
  {
    id: generateTransactionId(),
    author: "DreamSpace Alpha",
    handle: "@dream_alpha",
    avatar: "DS",
    content: "🌌 Nueva dimensión desbloqueada en el Nexo 4D. Los ciudadanos pueden ahora manifestar espacios de realidad aumentada. [CONTENIDO CIFRADO - REQUIERE ANUBIS CLEARANCE]",
    timestamp: "6h",
    likes: 1247,
    comments: 89,
    shares: 456,
    msrValue: 78.3,
    isEncrypted: true,
    mediaType: "dream",
  },
];

export const SocialNexus = () => {
  return (
    <div className="space-y-6">
      {/* Create Post */}
      <CreatePostCard />
      
      {/* Feed */}
      <AnimatePresence>
        {mockPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const CreatePostCard = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className={`glass-sovereign rounded-3xl p-6 border transition-all duration-300 ${
        isFocused ? "border-primary/40 shadow-gold" : "border-primary/10"
      }`}
      whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center text-primary-foreground font-orbitron font-bold text-sm">
          TU
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Manifiesta tu realidad en el Nexo..."
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-sm leading-relaxed"
            rows={3}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Cifrado Caótico Activo</span>
            </div>
            <Button variant="sovereign" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Manifestar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.article 
      className="glass-sovereign rounded-3xl p-6 border border-primary/10 hover:border-primary/20 transition-all duration-300"
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-orbitron font-bold text-sm ${
              post.handle.includes("Isabella") 
                ? "bg-accent text-accent-foreground" 
                : post.handle.includes("Sovereign")
                ? "bg-gradient-gold text-primary-foreground"
                : "bg-secondary text-foreground"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {post.avatar}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-orbitron text-sm font-bold text-foreground">
                {post.author}
              </h3>
              {post.handle.includes("Sovereign") && (
                <Award className="w-4 h-4 text-primary" />
              )}
            </div>
            <p className="text-[10px] text-muted-foreground">
              {post.handle} · {post.timestamp}
            </p>
          </div>
        </div>
        
        {/* MSR Value Badge */}
        <motion.div 
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
          whileHover={{ scale: 1.05 }}
        >
          <TrendingUp className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-orbitron text-primary font-bold">
            +{post.msrValue.toFixed(1)} MSR
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {post.isEncrypted ? (
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
          <p className="text-sm text-foreground/90 leading-relaxed">
            {post.content}
          </p>
        )}
      </div>

      {/* Media Preview for Dream content */}
      {post.mediaType === "dream" && (
        <motion.div 
          className="relative mb-4 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10"
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Play className="w-6 h-6 text-primary ml-1" />
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="text-[9px] font-orbitron text-accent bg-accent/20 px-2 py-1 rounded-full">
              DREAMSPACE 4D
            </span>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-primary/5">
        <div className="flex items-center gap-6">
          <ActionButton 
            icon={Heart} 
            count={likeCount} 
            isActive={isLiked}
            activeColor="text-red-500"
            onClick={handleLike}
          />
          <ActionButton icon={MessageCircle} count={post.comments} />
          <ActionButton icon={Share2} count={post.shares} />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
        >
          <Bookmark className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.article>
  );
};

interface ActionButtonProps {
  icon: React.ElementType;
  count: number;
  isActive?: boolean;
  activeColor?: string;
  onClick?: () => void;
}

const ActionButton = ({ icon: Icon, count, isActive, activeColor, onClick }: ActionButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 text-sm transition-colors ${
      isActive ? activeColor : "text-muted-foreground hover:text-foreground"
    }`}
  >
    <Icon className={`w-4 h-4 ${isActive ? "fill-current" : ""}`} />
    <span className="text-xs font-mono">{count}</span>
  </motion.button>
);

export default SocialNexus;
