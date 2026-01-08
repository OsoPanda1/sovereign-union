/**
 * 🛰️ TAMV SOCIAL NEXUS - Posts Hook
 * Gestión de posts con transacciones MSR reales
 */
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Post {
  id: string;
  author_id: string;
  content: string;
  encrypted_content: string | null;
  is_encrypted: boolean;
  msr_value: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    display_name: string;
    avatar_url: string | null;
    reputation_score: number;
  };
  user_has_liked?: boolean;
}

export const usePosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Fetch posts with author info
  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("social_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (postsError) throw postsError;

      // Fetch author profiles for all posts
      const authorIds = [...new Set(postsData?.map(p => p.author_id) || [])];
      
      const { data: profiles } = await supabase
        .from("citizen_profiles")
        .select("user_id, display_name, avatar_url, reputation_score")
        .in("user_id", authorIds);

      // Fetch user's likes if authenticated
      let userLikes: string[] = [];
      if (user) {
        const { data: likesData } = await supabase
          .from("post_likes")
          .select("post_id")
          .eq("user_id", user.id);
        userLikes = likesData?.map(l => l.post_id) || [];
      }

      // Combine data
      const enrichedPosts = postsData?.map(post => ({
        ...post,
        author: profiles?.find(p => p.user_id === post.author_id),
        user_has_liked: userLikes.includes(post.id),
      })) || [];

      setPosts(enrichedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Error al cargar el feed");
    } finally {
      setLoading(false);
    }
  };

  // Create new post
  const createPost = async (content: string, isEncrypted: boolean = false) => {
    if (!user) {
      toast.error("Debes iniciar sesión para manifestar");
      return null;
    }

    if (!content.trim()) {
      toast.error("El contenido no puede estar vacío");
      return null;
    }

    setCreating(true);
    try {
      const { data, error } = await supabase
        .from("social_posts")
        .insert({
          author_id: user.id,
          content: content.trim(),
          is_encrypted: isEncrypted,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("✨ Manifestación publicada en el Nexo");
      await fetchPosts(); // Refresh feed
      return data;
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error al manifestar tu realidad");
      return null;
    } finally {
      setCreating(false);
    }
  };

  // Like/Unlike post with MSR micro-transaction
  const toggleLike = async (postId: string, currentlyLiked: boolean) => {
    if (!user) {
      toast.error("Debes iniciar sesión para dar energía MSR");
      return;
    }

    try {
      if (currentlyLiked) {
        // Remove like
        const { error } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (error) throw error;

        // Update local state
        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, likes_count: p.likes_count - 1, user_has_liked: false }
            : p
        ));
      } else {
        // Add like with MSR micro-transaction (0.01 MSR)
        const { error } = await supabase
          .from("post_likes")
          .insert({
            post_id: postId,
            user_id: user.id,
            msr_amount: 0.01,
          });

        if (error) throw error;

        // Update local state
        setPosts(prev => prev.map(p => 
          p.id === postId 
            ? { ...p, likes_count: p.likes_count + 1, user_has_liked: true }
            : p
        ));

        // Update likes_count in social_posts table
        await supabase
          .from("social_posts")
          .update({ likes_count: posts.find(p => p.id === postId)!.likes_count + 1 })
          .eq("id", postId);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Error al procesar la energía MSR");
    }
  };

  // Delete post
  const deletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("social_posts")
        .delete()
        .eq("id", postId)
        .eq("author_id", user.id);

      if (error) throw error;

      setPosts(prev => prev.filter(p => p.id !== postId));
      toast.success("Post eliminado");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error al eliminar el post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("social_posts_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "social_posts" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    posts,
    loading,
    creating,
    createPost,
    toggleLike,
    deletePost,
    refetch: fetchPosts,
  };
};
