-- TAMV Command Center Database Schema
-- Enum para roles de admin
CREATE TYPE public.admin_role AS ENUM ('superadmin', 'admin', 'operator', 'viewer');

-- Enum para capas TAMV
CREATE TYPE public.tamv_layer AS ENUM ('identity', 'communication', 'information', 'intelligence', 'economy', 'governance', 'documentation');

-- Enum para estados
CREATE TYPE public.item_status AS ENUM ('active', 'inactive', 'pending', 'archived');
CREATE TYPE public.task_status AS ENUM ('todo', 'in_progress', 'review', 'done', 'blocked');
CREATE TYPE public.task_priority AS ENUM ('critical', 'high', 'medium', 'low');
CREATE TYPE public.deployment_status AS ENUM ('pending', 'building', 'deploying', 'success', 'failed', 'rollback');
CREATE TYPE public.environment_type AS ENUM ('development', 'staging', 'production');

-- Tabla de roles admin (separada por seguridad)
CREATE TABLE public.admin_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role admin_role NOT NULL DEFAULT 'viewer',
    granted_by UUID REFERENCES auth.users(id),
    granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Repositorios TAMV
CREATE TABLE public.repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    url TEXT,
    layer tamv_layer NOT NULL,
    stack TEXT[] DEFAULT '{}',
    status item_status NOT NULL DEFAULT 'active',
    description TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Módulos por capa
CREATE TABLE public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID REFERENCES public.repositories(id) ON DELETE CASCADE,
    layer tamv_layer NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status item_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tareas técnicas
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'todo',
    priority task_priority NOT NULL DEFAULT 'medium',
    assigned_to UUID REFERENCES auth.users(id),
    due_date DATE,
    completed_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Registro de despliegues
CREATE TABLE public.deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID REFERENCES public.repositories(id) ON DELETE CASCADE,
    environment environment_type NOT NULL,
    version TEXT NOT NULL,
    commit_hash TEXT,
    status deployment_status NOT NULL DEFAULT 'pending',
    deployed_by UUID REFERENCES auth.users(id),
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ,
    logs TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Configuraciones de entorno
CREATE TABLE public.env_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    environment environment_type NOT NULL,
    repository_id UUID REFERENCES public.repositories(id) ON DELETE CASCADE,
    is_secret BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (key, environment, repository_id)
);

-- Documentación (BookPI, whitepapers)
CREATE TABLE public.documentation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    layer tamv_layer,
    doc_type TEXT DEFAULT 'general',
    version TEXT DEFAULT '1.0.0',
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.env_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentation ENABLE ROW LEVEL SECURITY;

-- Function to check admin role (SECURITY DEFINER to avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.has_admin_role(_user_id UUID, _role admin_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is any admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_roles
    WHERE user_id = _user_id
  )
$$;

-- RLS Policies for admin_roles
CREATE POLICY "Admins can view all roles" ON public.admin_roles
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Superadmins can manage roles" ON public.admin_roles
    FOR ALL USING (public.has_admin_role(auth.uid(), 'superadmin'));

-- RLS Policies for repositories (admins only)
CREATE POLICY "Admins can view repositories" ON public.repositories
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage repositories" ON public.repositories
    FOR ALL USING (public.has_admin_role(auth.uid(), 'admin') OR public.has_admin_role(auth.uid(), 'superadmin'));

-- RLS Policies for modules
CREATE POLICY "Admins can view modules" ON public.modules
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage modules" ON public.modules
    FOR ALL USING (public.has_admin_role(auth.uid(), 'admin') OR public.has_admin_role(auth.uid(), 'superadmin'));

-- RLS Policies for tasks
CREATE POLICY "Admins can view tasks" ON public.tasks
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Operators can manage tasks" ON public.tasks
    FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for deployments
CREATE POLICY "Admins can view deployments" ON public.deployments
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage deployments" ON public.deployments
    FOR ALL USING (public.has_admin_role(auth.uid(), 'admin') OR public.has_admin_role(auth.uid(), 'superadmin'));

-- RLS Policies for env_configs
CREATE POLICY "Admins can view configs" ON public.env_configs
    FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage configs" ON public.env_configs
    FOR ALL USING (public.has_admin_role(auth.uid(), 'admin') OR public.has_admin_role(auth.uid(), 'superadmin'));

-- RLS Policies for documentation (public read, admin write)
CREATE POLICY "Anyone can view published docs" ON public.documentation
    FOR SELECT USING (is_published = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage documentation" ON public.documentation
    FOR ALL USING (public.is_admin(auth.uid()));

-- Triggers for updated_at
CREATE TRIGGER update_repositories_updated_at
    BEFORE UPDATE ON public.repositories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON public.modules
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_env_configs_updated_at
    BEFORE UPDATE ON public.env_configs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documentation_updated_at
    BEFORE UPDATE ON public.documentation
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert seed data for TAMV layers
INSERT INTO public.repositories (name, layer, stack, description, status) VALUES
('tamv-identity-core', 'identity', ARRAY['TypeScript', 'Supabase', 'WebAuthn'], 'Sistema de identidad y autenticación TAMV', 'active'),
('tamv-communication', 'communication', ARRAY['WebRTC', 'Socket.io', 'Redis'], 'Sistema de comunicación en tiempo real', 'active'),
('tamv-information', 'information', ARRAY['PostgreSQL', 'Elasticsearch', 'GraphQL'], 'Gestión de información y contenido', 'active'),
('isabella-core', 'intelligence', ARRAY['Python', 'TensorFlow', 'FastAPI'], 'Isabella AI - Motor de inteligencia artificial', 'active'),
('bookpi-engine', 'intelligence', ARRAY['TypeScript', 'OpenAI', 'Vector DB'], 'BookPI - Sistema de conocimiento', 'active'),
('tamvai-api', 'intelligence', ARRAY['Node.js', 'Express', 'Redis'], 'TAMV AI Gateway API', 'pending'),
('msr-contracts', 'economy', ARRAY['Solidity', 'Hardhat', 'TypeScript'], 'MSR Blockchain Smart Contracts', 'active'),
('utamv-platform', 'economy', ARRAY['React', 'Stripe', 'Supabase'], 'Universidad TAMV - Plataforma educativa', 'active'),
('lottery-engine', 'economy', ARRAY['TypeScript', 'VRF', 'Supabase'], 'Motor de lotería cuántica TAMV', 'active'),
('monetization-core', 'economy', ARRAY['TypeScript', 'Stripe', 'Ledger'], 'Sistema de monetización central', 'pending'),
('governance-dao', 'governance', ARRAY['TypeScript', 'Snapshot', 'IPFS'], 'Sistema de gobernanza DAO', 'pending'),
('tamv-docs', 'documentation', ARRAY['MDX', 'Docusaurus', 'Mermaid'], 'Documentación oficial TAMV', 'active');

-- Insert modules for each repository
INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'Core Setup', 'Configuración inicial del módulo', 45 FROM public.repositories WHERE name = 'tamv-identity-core';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'WebAuthn Integration', 'Autenticación biométrica', 30 FROM public.repositories WHERE name = 'tamv-identity-core';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'Real-time Messaging', 'Sistema de mensajería en tiempo real', 25 FROM public.repositories WHERE name = 'tamv-communication';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'AI Core Engine', 'Motor principal de Isabella', 60 FROM public.repositories WHERE name = 'isabella-core';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'Knowledge Graph', 'Grafo de conocimiento BookPI', 40 FROM public.repositories WHERE name = 'bookpi-engine';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'MSR Token', 'Contrato principal del token MSR', 55 FROM public.repositories WHERE name = 'msr-contracts';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'Course Platform', 'Plataforma de cursos', 70 FROM public.repositories WHERE name = 'utamv-platform';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'Lottery VRF', 'Generador de aleatoriedad verificable', 35 FROM public.repositories WHERE name = 'lottery-engine';

INSERT INTO public.modules (repository_id, layer, name, description, progress) 
SELECT id, layer, 'Whitepaper', 'Documentación técnica principal', 80 FROM public.repositories WHERE name = 'tamv-docs';