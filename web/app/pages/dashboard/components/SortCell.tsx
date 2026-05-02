import { TableCell, TableSortLabel } from '@mui/material';
import type { SortKey, SortDir } from '../types';

type Props = {
  label: string;
  field: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
};

export function SortCell({ label, field, sortKey, sortDir, onSort }: Props) {
  return (
    <TableCell>
      <TableSortLabel
        active={sortKey === field}
        direction={sortKey === field ? sortDir : 'asc'}
        onClick={() => onSort(field)}
        sx={{
          color: '#374151',
          fontWeight: 600,
          '& .MuiTableSortLabel-icon': { color: '#6b7280' },
          '&.Mui-active': { color: '#111827' },
        }}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
}