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
      admin_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["admin_role"]
          user_id?: string
        }
        Relationships: []
      }
      citizen_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          dignity_score_decay: string | null
          display_name: string
          governance_power: string | null
          id: string
          reputation_score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          dignity_score_decay?: string | null
          display_name: string
          governance_power?: string | null
          id?: string
          reputation_score?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          dignity_score_decay?: string | null
          display_name?: string
          governance_power?: string | null
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
      deployments: {
        Row: {
          commit_hash: string | null
          completed_at: string | null
          created_at: string
          deployed_by: string | null
          environment: Database["public"]["Enums"]["environment_type"]
          id: string
          logs: string | null
          repository_id: string | null
          started_at: string
          status: Database["public"]["Enums"]["deployment_status"]
          version: string
        }
        Insert: {
          commit_hash?: string | null
          completed_at?: string | null
          created_at?: string
          deployed_by?: string | null
          environment: Database["public"]["Enums"]["environment_type"]
          id?: string
          logs?: string | null
          repository_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["deployment_status"]
          version: string
        }
        Update: {
          commit_hash?: string | null
          completed_at?: string | null
          created_at?: string
          deployed_by?: string | null
          environment?: Database["public"]["Enums"]["environment_type"]
          id?: string
          logs?: string | null
          repository_id?: string | null
          started_at?: string
          status?: Database["public"]["Enums"]["deployment_status"]
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "deployments_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      documentation: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          doc_type: string | null
          id: string
          is_published: boolean | null
          layer: Database["public"]["Enums"]["tamv_layer"] | null
          title: string
          updated_at: string
          version: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          doc_type?: string | null
          id?: string
          is_published?: boolean | null
          layer?: Database["public"]["Enums"]["tamv_layer"] | null
          title: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          doc_type?: string | null
          id?: string
          is_published?: boolean | null
          layer?: Database["public"]["Enums"]["tamv_layer"] | null
          title?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      env_configs: {
        Row: {
          created_at: string
          created_by: string | null
          environment: Database["public"]["Enums"]["environment_type"]
          id: string
          is_secret: boolean | null
          key: string
          repository_id: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          environment: Database["public"]["Enums"]["environment_type"]
          id?: string
          is_secret?: boolean | null
          key: string
          repository_id?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          environment?: Database["public"]["Enums"]["environment_type"]
          id?: string
          is_secret?: boolean | null
          key?: string
          repository_id?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "env_configs_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      governance_powers: {
        Row: {
          description: string | null
          id: string
          level: number
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          level?: number
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          level?: number
          name?: string
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
      modules: {
        Row: {
          created_at: string
          description: string | null
          id: string
          layer: Database["public"]["Enums"]["tamv_layer"]
          name: string
          progress: number | null
          repository_id: string | null
          status: Database["public"]["Enums"]["item_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          layer: Database["public"]["Enums"]["tamv_layer"]
          name: string
          progress?: number | null
          repository_id?: string | null
          status?: Database["public"]["Enums"]["item_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          layer?: Database["public"]["Enums"]["tamv_layer"]
          name?: string
          progress?: number | null
          repository_id?: string | null
          status?: Database["public"]["Enums"]["item_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_repository_id_fkey"
            columns: ["repository_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      msr_events: {
        Row: {
          action: string
          actor_id: string
          created_at: string
          entity_id: string | null
          federation: string | null
          hash: string
          id: string
          payload: Json
        }
        Insert: {
          action: string
          actor_id: string
          created_at?: string
          entity_id?: string | null
          federation?: string | null
          hash: string
          id?: string
          payload?: Json
        }
        Update: {
          action?: string
          actor_id?: string
          created_at?: string
          entity_id?: string | null
          federation?: string | null
          hash?: string
          id?: string
          payload?: Json
        }
        Relationships: []
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
      repositories: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          layer: Database["public"]["Enums"]["tamv_layer"]
          name: string
          stack: string[] | null
          status: Database["public"]["Enums"]["item_status"]
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          layer: Database["public"]["Enums"]["tamv_layer"]
          name: string
          stack?: string[] | null
          status?: Database["public"]["Enums"]["item_status"]
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          layer?: Database["public"]["Enums"]["tamv_layer"]
          name?: string
          stack?: string[] | null
          status?: Database["public"]["Enums"]["item_status"]
          updated_at?: string
          url?: string | null
        }
        Relationships: []
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
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          module_id: string | null
          priority: Database["public"]["Enums"]["task_priority"]
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          module_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          module_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_dignity_decay: { Args: never; Returns: undefined }
      execute_msr_distribution: {
        Args: {
          amount_total: number
          creator_id: string
          description?: string
          reference_id?: string
        }
        Returns: undefined
      }
      has_admin_role: {
        Args: {
          _role: Database["public"]["Enums"]["admin_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_citizen_role: {
        Args: {
          _role: Database["public"]["Enums"]["citizen_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      log_msr_event: {
        Args: {
          p_action: string
          p_actor_id: string
          p_entity_id?: string
          p_payload?: Json
        }
        Returns: string
      }
    }
    Enums: {
      admin_role: "superadmin" | "admin" | "operator" | "viewer"
      citizen_role: "citizen" | "guardian" | "architect" | "sovereign"
      deployment_status:
        | "pending"
        | "building"
        | "deploying"
        | "success"
        | "failed"
        | "rollback"
      environment_type: "development" | "staging" | "production"
      item_status: "active" | "inactive" | "pending" | "archived"
      msr_transaction_type:
        | "EARNING"
        | "RESILIENCE"
        | "INFRASTRUCTURE"
        | "TRANSFER"
        | "LOTTERY_TICKET"
        | "LOTTERY_WIN"
        | "COURSE_REWARD"
      tamv_layer:
        | "identity"
        | "communication"
        | "information"
        | "intelligence"
        | "economy"
        | "governance"
        | "documentation"
      task_priority: "critical" | "high" | "medium" | "low"
      task_status: "todo" | "in_progress" | "review" | "done" | "blocked"
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
      admin_role: ["superadmin", "admin", "operator", "viewer"],
      citizen_role: ["citizen", "guardian", "architect", "sovereign"],
      deployment_status: [
        "pending",
        "building",
        "deploying",
        "success",
        "failed",
        "rollback",
      ],
      environment_type: ["development", "staging", "production"],
      item_status: ["active", "inactive", "pending", "archived"],
      msr_transaction_type: [
        "EARNING",
        "RESILIENCE",
        "INFRASTRUCTURE",
        "TRANSFER",
        "LOTTERY_TICKET",
        "LOTTERY_WIN",
        "COURSE_REWARD",
      ],
      tamv_layer: [
        "identity",
        "communication",
        "information",
        "intelligence",
        "economy",
        "governance",
        "documentation",
      ],
      task_priority: ["critical", "high", "medium", "low"],
      task_status: ["todo", "in_progress", "review", "done", "blocked"],
    },
  },
} as const
