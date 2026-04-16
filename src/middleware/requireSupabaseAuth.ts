import type { NextFunction, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

export default async function requireSupabaseAuth(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return response.status(401).json({ error: 'Token Bearer requerido' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return response.status(401).json({ error: 'Token invalido o expirado' });
    }

    next();
  } catch {
    return response.status(500).json({ error: 'Error al validar autenticacion' });
  }
}