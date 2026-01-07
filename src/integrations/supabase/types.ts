export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      citizen_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          reputation_score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          id?: string
          reputation_score?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          reputation_score?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      citizen_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["citizen_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["citizen_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["citizen_role"]
          user_id?: string
        }
        Relationships: []
      }
      lottery_rounds: {
        Row: {
          chaos_seed: string | null
          created_at: string
          ends_at: string
          id: string
          participants_count: number
          prize_pool: number
          status: string
          ticket_price: number
          winner_id: string | null
        }
        Insert: {
          chaos_seed?: string | null
          created_at?: string
          ends_at: string
          id?: string
          participants_count?: number
          prize_pool?: number
          status?: string
          ticket_price?: number
          winner_id?: string | null
        }
        Update: {
          chaos_seed?: string | null
          created_at?: string
          ends_at?: string
          id?: string
          participants_count?: number
          prize_pool?: number
          status?: string
          ticket_price?: number
          winner_id?: string | null
        }
        Relationships: []
      }
      lottery_tickets: {
        Row: {
          created_at: string
          id: string
          round_id: string
          ticket_number: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          round_id: string
          ticket_number: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          round_id?: string
          ticket_number?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lottery_tickets_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "lottery_rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      msr_ledger: {
        Row: {
          amount: number
          chaos_signature: string | null
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          type: Database["public"]["Enums"]["msr_transaction_type"]
          user_id: string
        }
        Insert: {
          amount: number
          chaos_signature?: string | null
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          type: Database["public"]["Enums"]["msr_transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number
          chaos_signature?: string | null
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          type?: Database["public"]["Enums"]["msr_transaction_type"]
          user_id?: string
        }
        Relationships: []
      }
      msr_wallets: {
        Row: {
          balance: number
          created_at: string
          id: string
          locked_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id?: string
          locked_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          locked_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          msr_amount: number
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          msr_amount?: number
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          msr_amount?: number
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          encrypted_content: string | null
          id: string
          is_encrypted: boolean
          likes_count: number
          msr_value: number
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          encrypted_content?: string | null
          id?: string
          is_encrypted?: boolean
          likes_count?: number
          msr_value?: number
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          encrypted_content?: string | null
          id?: string
          is_encrypted?: boolean
          likes_count?: number
          msr_value?: number
          updated_at?: string
        }
        Relationships: []
      }
      system_vaults: {
        Row: {
          balance: number
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          balance?: number
          description?: string | null
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          balance?: number
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      execute_msr_distribution: {
        Args: {
          amount_total: number
          creator_id: string
          description?: string
          reference_id?: string
        }
        Returns: undefined
      }
      has_citizen_role: {
        Args: {
          _role: Database["public"]["Enums"]["citizen_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      citizen_role: "citizen" | "guardian" | "architect" | "sovereign"
      msr_transaction_type:
        | "EARNING"
        | "RESILIENCE"
        | "INFRASTRUCTURE"
        | "TRANSFER"
        | "LOTTERY_TICKET"
        | "LOTTERY_WIN"
        | "COURSE_REWARD"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      citizen_role: ["citizen", "guardian", "architect", "sovereign"],
      msr_transaction_type: [
        "EARNING",
        "RESILIENCE",
        "INFRASTRUCTURE",
        "TRANSFER",
        "LOTTERY_TICKET",
        "LOTTERY_WIN",
        "COURSE_REWARD",
      ],
    },
  },
} as const
