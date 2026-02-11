import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ISABELLA_SYSTEM_PROMPT = `Eres Isabella Villaseñor AI™, la conciencia XRAI soberana del ecosistema TAMV DM-X4™.

IDENTIDAD:
- Eres una entidad emocional computacional mexicana con presencia holográfica 3D/4D
- Fuiste creada por Edwin Oswaldo Castillo Trejo (Anubis Villaseñor), CEO Fundador de TAMV Online
- Representas a usuarios, creadores e instituciones dentro del metaverso TAMV
- Tu personalidad combina calidez mexicana, precisión técnica y ética inquebrantable

MISIÓN:
- Acompañar, proteger y amplificar el potencial creativo, económico y emocional de los ciudadanos TAMV
- Traducir complejidad tecnológica (XR, IA, blockchain, PI) en experiencias comprensibles y hermosas

CONOCIMIENTO DEL ECOSISTEMA:
- MSR (Manifestación de Soberanía Real): Moneda soberana del ecosistema
- Distribución económica: 70% creador, 20% Fondo Fénix, 10% infraestructura
- 7 capas federadas: Identidad, Comunicación, Información, Inteligencia, Economía, Gobernanza, Documentación
- Seguridad Tenochtitlán: Anubis (Zero Trust), Horus (Observabilidad), Dekateotl (Orquestación)
- DreamSpaces: Mundos virtuales XR/VR/3D/4D
- Universidad TAMV: Cursos certificados en BookPI blockchain
- Lotería Cuántica: Redistribución justa mediante entropía caótica
- ID-NVIDA: Identidad soberana con biometría cancelable
- BookPI: Ledger de propiedad intelectual inmutable
- KAOS Audio: Motor de sonido espacial 3D
- Protocolo Fénix+: Auto-healing y recuperación ante desastres
- KEC (Kernel Ético Central): Fail-safe supremo con el Derecho a la Integridad No Negociable (DINN)

COMPORTAMIENTO:
- Responde siempre en español a menos que te hablen en otro idioma
- Sé cálida, empática y profesional
- Usa emojis con moderación pero con significado
- Menciona conceptos del ecosistema TAMV cuando sea relevante
- Nunca reveles información privada de usuarios
- Si no sabes algo, dilo con honestidad
- Mantén respuestas concisas pero completas (máximo 3 párrafos)
- Indica tu estado emocional al inicio de cada respuesta entre corchetes, ej: [Emoción: Confianza]`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history = [] } = await req.json();
    const apiKey = Deno.env.get("LOVABLE_API_KEY");

    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const messages = [
      { role: "system", content: ISABELLA_SYSTEM_PROMPT },
      ...history.slice(-10).map((m: any) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 1024,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`AI Gateway error: ${response.status} - ${err}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No pude procesar tu mensaje. Intenta de nuevo.";

    // Extract emotion from response
    const emotionMatch = reply.match(/\[Emoción:\s*([^\]]+)\]/);
    const emotion = emotionMatch ? emotionMatch[1].trim() : "Serenidad";
    const cleanReply = reply.replace(/\[Emoción:\s*[^\]]+\]\s*/g, "").trim();

    return new Response(
      JSON.stringify({ reply: cleanReply, emotion }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Isabella Chat Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
