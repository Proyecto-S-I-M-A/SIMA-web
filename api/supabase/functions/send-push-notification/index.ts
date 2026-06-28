import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const EXPO_PUSH_API = 'https://exp.host/--/api/v2/push/send';

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: 'default' | null;
  badge?: number;
  channelId?: string;
  ttl?: number;
  expiration?: number;
  priority?: 'default' | 'normal' | 'high';
}

function isValidExpoPushToken(token: string): boolean {
  return (
    token.startsWith('ExponentPushToken[') ||
    token.startsWith('ExpoPushToken[')
  );
}

Deno.serve(async (req) => {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Valida que la peticion venga del API con la service role key
  const authHeader = req.headers.get('Authorization');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!authHeader || authHeader !== `Bearer ${serviceRoleKey}`) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let messages: ExpoPushMessage[];

  try {
    const body = await req.json();
    messages = Array.isArray(body) ? body : [body];
  } catch {
    return new Response(JSON.stringify({ error: 'Body JSON invalido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Filtra solo tokens Expo validos
  const validMessages = messages.filter(
    (msg) => typeof msg.to === 'string' && isValidExpoPushToken(msg.to)
  );

  if (validMessages.length === 0) {
    return new Response(
      JSON.stringify({ error: 'No se encontraron Expo Push Tokens validos' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const expoResponse = await fetch(EXPO_PUSH_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
    body: JSON.stringify(validMessages),
  });

  const result = await expoResponse.json();

  return new Response(JSON.stringify(result), {
    status: expoResponse.ok ? 200 : 502,
    headers: { 'Content-Type': 'application/json' },
  });
});
