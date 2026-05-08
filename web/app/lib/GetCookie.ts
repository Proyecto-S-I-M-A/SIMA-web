
/**
 * Utilidades seguras para manejar cookies (tokens)
 * IMPORTANTE: Los tokens NUNCA se guardan en localStorage
 * Se usan cookies httpOnly cuando es posible (backend) o cookieStore API
 */

export async function readCookieStoreValue(key: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const anyWindow = window as any;
  if (!anyWindow.cookieStore?.get) return null;
  try {
    const cookie = await anyWindow.cookieStore.get(key);
    return cookie?.value ?? null;
  } catch {
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  const fromCookieStore = await readCookieStoreValue("token");
  return fromCookieStore || null;
}

export async function getRefreshToken(): Promise<string | null> {
  const fromCookieStore = await readCookieStoreValue("refresh_token");
  return fromCookieStore || null;
}

export async function saveCookieStoreValue(key: string, value: string): Promise<void> {
  if (typeof window === "undefined") return;
  const anyWindow = window as any;
  if (anyWindow.cookieStore?.set) {
    try {
      await anyWindow.cookieStore.set({
        name: key,
        value,
        path: "/",
        sameSite: "strict",
        // httpOnly no puede ser seteado desde el cliente por seguridad
        // El servidor debe setear httpOnly al enviar el token
      });
    } catch {
      // Ignore errors
    }
  }
}

export async function deleteCookieStoreValue(key: string): Promise<void> {
  if (typeof window === "undefined") return;
  const anyWindow = window as any;
  if (anyWindow.cookieStore?.delete) {
    try {
      await anyWindow.cookieStore.delete(key);
    } catch {
      // Ignore errors
    }
  }
}

export async function deleteAllCookieStoreValue(): Promise<void> {
  if (typeof window === "undefined") return;
  const anyWindow = window as any;
  if (anyWindow.cookieStore?.delete) {
    try {
      const cookies = await anyWindow.cookieStore.getAll();
      for (const cookie of cookies) {
        await anyWindow.cookieStore.delete(cookie.name);
      }
    } catch {
      // Ignore errors
    }
  }
}