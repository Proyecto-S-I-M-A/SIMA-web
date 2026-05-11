import type { ReactNode } from 'react';
import { useProtectedRoute } from '../lib/useProtectedRoute';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Componente wrapper para rutas protegidas
 * Valida la sesión antes de renderizar el contenido
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useProtectedRoute();

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
