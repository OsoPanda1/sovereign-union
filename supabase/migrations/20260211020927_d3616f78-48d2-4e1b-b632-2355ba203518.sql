
-- ═══ CITEMESH INTEGRATION: Dignity Score, MSR Events, Governance Powers ═══

-- 1. Add dignity_score to citizen_profiles (CITEMESH ID-NVIDA v0)
ALTER TABLE public.citizen_profiles 
ADD COLUMN IF NOT EXISTS dignity_score_decay timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS governance_power text DEFAULT 'LOGICAL';

-- 2. Create MSR Events table (Metaverse Sovereign Registry - immutable audit log)
CREATE TABLE IF NOT EXISTS public.msr_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_id uuid NOT NULL,
  action text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}',
  hash text NOT NULL,
  entity_id uuid,
  federation text DEFAULT 'community',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.msr_events ENABLE ROW LEVEL SECURITY;

-- MSR Events are append-only and publicly readable for transparency
CREATE POLICY "MSR events are publicly readable"
ON public.msr_events FOR SELECT
USING (true);

-- Only authenticated users can log events about themselves
CREATE POLICY "Users can log own MSR events"
ON public.msr_events FOR INSERT
WITH CHECK (auth.uid() = actor_id);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_msr_events_actor ON public.msr_events (actor_id);
CREATE INDEX IF NOT EXISTS idx_msr_events_action ON public.msr_events (action);

-- 3. Create governance_powers reference table
CREATE TABLE IF NOT EXISTS public.governance_powers (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  level integer NOT NULL DEFAULT 0
);

ALTER TABLE public.governance_powers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Governance powers are publicly readable"
ON public.governance_powers FOR SELECT
USING (true);

-- Insert CITEMESH governance powers
INSERT INTO public.governance_powers (id, name, description, level) VALUES
  ('LOGICAL', 'Acceso Lógico', 'Lectura de datos públicos del ecosistema', 0),
  ('OBSERVER', 'Observador', 'Monitoreo y auditoría de actividades', 1),
  ('EXECUTIVE', 'Ejecutivo', 'Escritura y modificación de datos', 2),
  ('HUMAN', 'Control Humano', 'Control total con override de IA', 3)
ON CONFLICT (id) DO NOTHING;

-- 4. Create dignity_decay function (reduces all dignity scores by 1 every 24h)
CREATE OR REPLACE FUNCTION public.apply_dignity_decay()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE citizen_profiles 
  SET reputation_score = GREATEST(reputation_score - 1, 0),
      dignity_score_decay = now()
  WHERE reputation_score > 0;
END;
$$;

-- 5. Function to log MSR events with hash
CREATE OR REPLACE FUNCTION public.log_msr_event(
  p_actor_id uuid,
  p_action text,
  p_payload jsonb DEFAULT '{}',
  p_entity_id uuid DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_hash text;
  v_id uuid;
BEGIN
  -- Generate SHA-256 hash for immutability verification
  v_hash := encode(
    sha256(
      convert_to(
        p_actor_id::text || p_action || p_payload::text || now()::text, 
        'UTF8'
      )
    ), 
    'hex'
  );
  
  INSERT INTO msr_events (actor_id, action, payload, hash, entity_id)
  VALUES (p_actor_id, p_action, p_payload, v_hash, p_entity_id)
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;
