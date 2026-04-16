import { Request, Response } from 'express';
import { LoginRequest } from '../types/Login.js';
import { supabase } from '../config/supabase.js';

export async function Login(request: Request, response: Response) {
    try {
        const { email, password }: LoginRequest = request.body;
        if (!email || !password) {
            return response.status(400).json({ error: 'Email y contraseña son requeridos' });
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !data.session) {
            return response.status(401).json({ error: 'Credenciales invalidas' });
        }
        return response.status(200).json({ message: 'Inicio de sesión exitoso', session: { access_token: data.session.access_token, refresh_token: data.session.refresh_token } });

    } catch (error) {
        return response.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function SingUp(request: Request, response: Response) {
    try {
        const { email, password }: LoginRequest = request.body;
        if (!email || !password) {
            return response.status(400).json({ error: 'Email y contraseña son requeridos' });
        }
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            return response.status(400).json({ error: 'Error al crear la cuenta', details: error.message });
        }
        return response.status(201).json({ message: 'Cuenta creada exitosamente', session: { access_token: data.session?.access_token, refresh_token: data.session?.refresh_token } });
    } catch (error) {
        return response.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function RefreshToken(request: Request, response: Response) {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!token) {
            return response.status(400).json({ error: 'Token Bearer requerido' });
        }
        const { data, error } = await supabase.auth.refreshSession({ refresh_token: token });
        if (error || !data.session) {
            return response.status(401).json({ error: 'Token invalido o expirado' });
        }
        return response.status(200).json({ message: 'Token actualizado exitosamente', session: data.session });
    } catch (error) {
        return response.status(500).json({ error: 'Error interno del servidor' });
    }
}