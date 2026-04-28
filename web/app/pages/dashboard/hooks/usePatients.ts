import { useState, useEffect } from 'react';
import type { Row } from '../types';
import { patientService } from '../services/patientService';  

export function usePatients() {
  const [data,    setData]    = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tick,    setTick]    = useState(0);

  useEffect(() => {
    let cancelled = false;




    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const patients = await patientService.getAll();  
        if (!cancelled) setData(patients);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return { data, loading, error, refetch };
}


    /**
     * Carga la lista de pacientes desde el servicio de pacientes.
     * Establece el estado de carga en verdadero, limpia cualquier error previo,
     * intenta obtener todos los pacientes y actualiza los datos si no se ha cancelado.
     * En caso de error, establece el mensaje de error si no se ha cancelado.
     * Finalmente, establece el estado de carga en falso si no se ha cancelado.
     * @async
     * @function load
     * @returns {Promise<void>} Una promesa que se resuelve cuando la carga se completa.
     */