import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GetSession } from './GetSession';
import { useGetAccesos } from './api/QueryAcceso';

/**
 * Hook para proteger rutas que requieren autenticación
 * Valida que exista session_id y redirige a no autorizado si no existe
 */
export function useProtectedRoute() {
  const navigate = useNavigate();
  const sessionID = GetSession();
  const {data: sessionData, isLoading} = useGetAccesos(sessionID || "", true)
  if (sessionData?.length === 0) {
    navigate("/no-autorizado");
  }
  return {
    isAuthenticated: !!sessionID,
    sessionID,
    isLoading
  };
}
