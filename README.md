# Diagnóstico de Patrones — Angélica Vargas

Lead magnet interactivo: cuestionario de 12 preguntas que identifica cuál de 4 patrones emocionales domina la vida de la persona. Incluye panel admin para ver resultados.

## Setup

### 1. Supabase

1. Crear cuenta en [supabase.com](https://supabase.com) → nuevo proyecto
2. Ir a **SQL Editor** → ejecutar:

```sql
CREATE TABLE diagnosticos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  patron_dominante TEXT NOT NULL,
  puntaje_espejo INTEGER DEFAULT 0,
  puntaje_niebla INTEGER DEFAULT 0,
  puntaje_peso INTEGER DEFAULT 0,
  puntaje_laberinto INTEGER DEFAULT 0,
  respuestas JSONB NOT NULL,
  click_whatsapp BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_patron ON diagnosticos(patron_dominante);

ALTER TABLE diagnosticos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON diagnosticos
  FOR INSERT TO anon WITH CHECK (true);
```

3. Ir a **Settings > API** → copiar: Project URL, anon key, service_role key

### 2. Variables de entorno

Crear `.env.local` en la raíz:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
ADMIN_PASSWORD=angelica2026
NEXT_PUBLIC_WHATSAPP_NUMBER=50600000000
```

### 3. Desarrollo local

```bash
npm install
npm run dev
```

### 4. Deploy a Vercel

1. Subir el repo a GitHub
2. Ir a [vercel.com](https://vercel.com) → importar el repo
3. Agregar las variables de entorno del paso 2
4. Deploy

### 5. Dominio (opcional)

En Vercel > Settings > Domains → agregar `diagnostico.angelicavargas.com`

## URLs

- **Diagnóstico público:** `/`
- **Panel admin:** `/admin` (contraseña: la definida en `ADMIN_PASSWORD`)
