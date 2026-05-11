import { saveCookieStoreValue, deleteCookieStoreValue } from "~/lib/GetCookie";

export function useLogin() {
  /**
   * Guarda tokens de forma segura SOLO en cookies
   * IMPORTANTE: NUNCA usa localStorage para tokens
   */
  async function SaveOnCookie(token: string, refreshToken: string) {
    try {
      // Guardar tokens en cookies seguras (NO en localStorage)
      await saveCookieStoreValue("token", token);
      await saveCookieStoreValue("refresh_token", refreshToken);
    } catch {
      console.error("Error al guardar tokens en cookies");
    }
  }

  /**
   * Obtiene tokens de las cookies
   */
  async function GetFromCookie() {
    // Nota: Esta es una función síncrona que devuelve sesión de sessionStorage
    // Los tokens (access/refresh) se obtienen de manera asíncrona con getAccessToken() y getRefreshToken()
    const token = sessionStorage.getItem('token');
    const refreshToken = sessionStorage.getItem('refresh_token');
    return { token, refreshToken };
  }

  /**
   * Guarda la sesión ID en sessionStorage (temporal, por sesión del navegador)
   */
  function SaveSession(sessionID: string) {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('sessionID', sessionID);
  }

  /**
   * Guarda el ID del usuario en sessionStorage
   */
  function SaveID(ID: number) {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('ID', ID.toString());
  }

  /**
   * Limpia los tokens de las cookies
   */
  async function ClearTokens() {
    try {
      await deleteCookieStoreValue("token");
      await deleteCookieStoreValue("refresh_token");
    } catch {
      console.error("Error al limpiar tokens");
    }
  }

  return {
    SaveOnCookie,
    GetFromCookie,
    SaveSession,
    SaveID,
    ClearTokens,
  };
}