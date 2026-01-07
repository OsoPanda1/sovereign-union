-- ⚖️ ESQUEMA SOBERANO TAMV MD-X4™ - LEDGER MSR Y JUSTICIA 70/20/10

-- Enum para tipos de transacción MSR
CREATE TYPE public.msr_transaction_type AS ENUM (
  'EARNING',           -- 70% al creador
  'RESILIENCE',        -- 20% fondo Fénix
  'INFRASTRUCTURE',    -- 10% kernel
  'TRANSFER',          -- transferencia entre ciudadanos
  'LOTTERY_TICKET',    -- participación en lotería
  'LOTTERY_WIN',       -- ganancia de lotería
  'COURSE_REWARD'      -- recompensa por curso completado
);

-- Enum para roles de ciudadanos
CREATE TYPE public.citizen_role AS ENUM ('citizen', 'guardian', 'architect', 'sovereign');

-- ===============================================
-- TABLA: citizen_profiles (Perfiles de Ciudadanos)
-- ===============================================
CREATE TABLE public.citizen_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  reputation_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ===============================================
-- TABLA: citizen_roles (Roles separados por seguridad)
-- ===============================================
CREATE TABLE public.citizen_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role citizen_role NOT NULL DEFAULT 'citizen',
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  granted_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, role)
);

-- ===============================================
-- TABLA: msr_wallets (Billeteras MSR)
-- ===============================================
CREATE TABLE public.msr_wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance DECIMAL(18,2) NOT NULL DEFAULT 1000.00,
  locked_balance DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- ===============================================
-- TABLA: msr_ledger (Registro Inmutable de Transacciones)
-- ===============================================
CREATE TABLE public.msr_ledger (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(18,2) NOT NULL,
  type msr_transaction_type NOT NULL,
  reference_id UUID,
  description TEXT,
  chaos_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================================
-- TABLA: system_vaults (Bóvedas del Sistema)
-- ===============================================
CREATE TABLE public.system_vaults (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  balance DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insertar bóvedas del sistema
INSERT INTO public.system_vaults (id, name, description) VALUES
  ('RESILIENCE', 'Fondo Fénix', 'Fondo de resiliencia para ciudadanos en crisis (20%)'),
  ('KERNEL', 'Infraestructura', 'Mantenimiento del kernel y evolución de Isabella (10%)');

-- ===============================================
-- TABLA: social_posts (Posts del Nexo Social)
-- ===============================================
CREATE TABLE public.social_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  encrypted_content TEXT,
  is_encrypted BOOLEAN NOT NULL DEFAULT false,
  msr_value DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================================
-- TABLA: post_likes (Likes = Micro-transacciones MSR)
-- ===============================================
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  msr_amount DECIMAL(18,2) NOT NULL DEFAULT 0.01,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- ===============================================
-- TABLA: lottery_rounds (Rondas de Lotería Cuántica)
-- ===============================================
CREATE TABLE public.lottery_rounds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prize_pool DECIMAL(18,2) NOT NULL DEFAULT 0.00,
  ticket_price DECIMAL(18,2) NOT NULL DEFAULT 1.00,
  participants_count INTEGER NOT NULL DEFAULT 0,
  winner_id UUID REFERENCES auth.users(id),
  chaos_seed TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================================
-- TABLA: lottery_tickets (Tickets de Lotería)
-- ===============================================
CREATE TABLE public.lottery_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  round_id UUID NOT NULL REFERENCES public.lottery_rounds(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ticket_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ===============================================
-- FUNCIONES DE SEGURIDAD (Security Definer)
-- ===============================================

-- Función para verificar rol de ciudadano
CREATE OR REPLACE FUNCTION public.has_citizen_role(_user_id UUID, _role citizen_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.citizen_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ===============================================
-- ⚖️ FUNCIÓN DE JUSTICIA DISTRIBUTIVA 70/20/10
-- ===============================================
CREATE OR REPLACE FUNCTION public.execute_msr_distribution(
  amount_total DECIMAL,
  creator_id UUID,
  reference_id UUID DEFAULT NULL,
  description TEXT DEFAULT 'Transacción Soberana'
)
RETURNS VOID AS $$
DECLARE
  creator_amount DECIMAL := amount_total * 0.70;
  resilience_amount DECIMAL := amount_total * 0.20;
  kernel_amount DECIMAL := amount_total * 0.10;
BEGIN
  -- 70% para el Ciudadano/Creador
  INSERT INTO msr_ledger (user_id, amount, type, reference_id, description)
  VALUES (creator_id, creator_amount, 'EARNING', reference_id, description);
  
  UPDATE msr_wallets 
  SET balance = balance + creator_amount, updated_at = now()
  WHERE user_id = creator_id;

  -- 20% para Fondo de Resiliencia Fénix
  UPDATE system_vaults 
  SET balance = balance + resilience_amount, updated_at = now()
  WHERE id = 'RESILIENCE';

  -- 10% para el Kernel (Infraestructura)
  UPDATE system_vaults 
  SET balance = balance + kernel_amount, updated_at = now()
  WHERE id = 'KERNEL';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ===============================================
-- FUNCIÓN: Crear perfil y wallet al registrarse
-- ===============================================
CREATE OR REPLACE FUNCTION public.handle_new_citizen()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Crear perfil de ciudadano
  INSERT INTO public.citizen_profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'display_name', 'Ciudadano Korima'));
  
  -- Crear wallet MSR con balance inicial
  INSERT INTO public.msr_wallets (user_id, balance)
  VALUES (NEW.id, 1000.00);
  
  -- Asignar rol de ciudadano
  INSERT INTO public.citizen_roles (user_id, role)
  VALUES (NEW.id, 'citizen');
  
  RETURN NEW;
END;
$$;

-- Trigger para nuevos ciudadanos
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_citizen();

-- ===============================================
-- FUNCIÓN: Actualizar timestamps
-- ===============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers de actualización
CREATE TRIGGER update_citizen_profiles_updated_at
  BEFORE UPDATE ON public.citizen_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_msr_wallets_updated_at
  BEFORE UPDATE ON public.msr_wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at
  BEFORE UPDATE ON public.social_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===============================================
-- ROW LEVEL SECURITY (RLS)
-- ===============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.citizen_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizen_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.msr_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.msr_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lottery_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lottery_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_vaults ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS: citizen_profiles
CREATE POLICY "Perfiles visibles por todos" ON public.citizen_profiles
  FOR SELECT USING (true);

CREATE POLICY "Ciudadanos pueden actualizar su perfil" ON public.citizen_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- POLÍTICAS: citizen_roles (solo lectura pública)
CREATE POLICY "Roles visibles por todos" ON public.citizen_roles
  FOR SELECT USING (true);

-- POLÍTICAS: msr_wallets
CREATE POLICY "Ciudadanos ven su propia wallet" ON public.msr_wallets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Sistema puede actualizar wallets" ON public.msr_wallets
  FOR UPDATE USING (auth.uid() = user_id);

-- POLÍTICAS: msr_ledger
CREATE POLICY "Ciudadanos ven sus transacciones" ON public.msr_ledger
  FOR SELECT USING (auth.uid() = user_id);

-- POLÍTICAS: social_posts
CREATE POLICY "Posts visibles por todos" ON public.social_posts
  FOR SELECT USING (true);

CREATE POLICY "Ciudadanos pueden crear posts" ON public.social_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autores pueden actualizar sus posts" ON public.social_posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Autores pueden eliminar sus posts" ON public.social_posts
  FOR DELETE USING (auth.uid() = author_id);

-- POLÍTICAS: post_likes
CREATE POLICY "Likes visibles por todos" ON public.post_likes
  FOR SELECT USING (true);

CREATE POLICY "Ciudadanos pueden dar likes" ON public.post_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Ciudadanos pueden quitar sus likes" ON public.post_likes
  FOR DELETE USING (auth.uid() = user_id);

-- POLÍTICAS: lottery_rounds
CREATE POLICY "Loterías visibles por todos" ON public.lottery_rounds
  FOR SELECT USING (true);

-- POLÍTICAS: lottery_tickets
CREATE POLICY "Ciudadanos ven sus tickets" ON public.lottery_tickets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Ciudadanos pueden comprar tickets" ON public.lottery_tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- POLÍTICAS: system_vaults (solo lectura pública)
CREATE POLICY "Bóvedas visibles por todos" ON public.system_vaults
  FOR SELECT USING (true);

-- ===============================================
-- ÍNDICES PARA RENDIMIENTO
-- ===============================================
CREATE INDEX idx_msr_ledger_user_id ON public.msr_ledger(user_id);
CREATE INDEX idx_msr_ledger_created_at ON public.msr_ledger(created_at DESC);
CREATE INDEX idx_social_posts_author_id ON public.social_posts(author_id);
CREATE INDEX idx_social_posts_created_at ON public.social_posts(created_at DESC);
CREATE INDEX idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX idx_lottery_tickets_round_id ON public.lottery_tickets(round_id);