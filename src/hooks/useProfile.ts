/**
 * 🛰️ TAMV Profile Hook
 * Gestión del perfil de ciudadano
 */
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface CitizenProfile {
  id: string;
  user_id: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  reputation_score: number;
  created_at: string;
}

export interface MSRWallet {
  id: string;
  user_id: string;
  balance: number;
  locked_balance: number;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CitizenProfile | null>(null);
  const [wallet, setWallet] = useState<MSRWallet | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setWallet(null);
      setLoading(false);
      return;
    }

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("citizen_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setProfile(profileData);

      // Fetch wallet
      const { data: walletData } = await supabase
        .from("msr_wallets")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setWallet(walletData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<CitizenProfile>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("citizen_profiles")
        .update(updates)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error) {
      console.error("Error updating profile:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    wallet,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
};
