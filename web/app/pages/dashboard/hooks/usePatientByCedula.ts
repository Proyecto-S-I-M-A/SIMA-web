import { useState, useEffect } from 'react';
import type { Row } from '../types';
import { patientService } from '../services/patientService';

type State = {
  data:    Row | null;
  loading: boolean;
  error:   string | null;
  refetch: () => void;
};

export function usePatientByCedula(cedula: string): State {
  const [data,    setData]    = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tick,    setTick]    = useState(0);

  useEffect(() => {
    if (!cedula) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const patient = await patientService.getById(cedula);
        if (!cancelled) setData(patient);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [cedula, tick]);

  const refetch = () => setTick((t) => t + 1);

  return { data, loading, error, refetch };
}