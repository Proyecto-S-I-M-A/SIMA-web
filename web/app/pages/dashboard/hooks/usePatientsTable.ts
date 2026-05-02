/**
 * Hook personalizado para gestionar la tabla de pacientes.
 *
 * Obtiene los datos de pacientes usando useGetAllClientes y realiza búsqueda 
 * con normalización de texto (minusculas, sin tildes, sin guiones),
 * ordena los datos por clave y dirección, y pagina el resultado.
 *
 * @returns Objeto con el estado de carga/error, y los manejadores necesarios para:
 *   - gestionar el texto de búsqueda y su retraso,
 *   - ordenar por una clave y dirección,
 *   - paginar los datos procesados,
 *   - acceder a los datos filtrados y ordenados.
 */

import { useState, useMemo, useEffect } from 'react';
import { useGetAllClientes } from '~/lib/api/QueryCliente';
import type { Row, SortKey, SortDir } from '../types';


const normalize = (v: string) =>
  v
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f-]/g, '');

export function usePatientsTable() {  
  const { data = [], isLoading, error, refetch } = useGetAllClientes();
  
  const [rawSearch, setRawSearch] = useState('');
  const [search, setSearch]       = useState('');
  const [sortKey, setSortKey]     = useState<SortKey>('nombre');
  const [sortDir, setSortDir]     = useState<SortDir>('asc');
  const [page, setPage]           = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(rawSearch);
      setPage(0);
    }, 300);
    return () => clearTimeout(t);
  }, [rawSearch]);

  const handleSort = (key: SortKey) => {
    setSortDir((prev) => (sortKey === key && prev === 'asc' ? 'desc' : 'asc'));
    setSortKey(key);
    setPage(0);
  };

  const processedData = useMemo(() => {
    const q = normalize(search);

    const filtered = data.filter((row: Row) => {
      if (!q) return true;
      return (
        normalize(row.nombre   ?? '').includes(q) ||
        normalize(row.apellido ?? '').includes(q) ||
        normalize(row.cedula   ?? '').includes(q) ||
        normalize(row.correo   ?? '').includes(q)
      );
    });

    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      if (av === bv) return 0;
      const cmp = av < bv ? -1 : 1;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, search, sortKey, sortDir]);  

  const paginated = processedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return {
    data,
    rawSearch,
    setRawSearch,
    search,
    sortKey,
    sortDir,
    handleSort,
    processedData,
    paginated,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}


