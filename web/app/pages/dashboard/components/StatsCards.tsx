import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPeopleGroup,
  faCircleCheck,
  faPerson,
  faPersonDress,
} from '@fortawesome/free-solid-svg-icons';
import type { Row } from '../types';
import { cardStyle, iconStyle } from '../styles/cardStyles';

type Props = { data: Row[] };

export function StatsCards({ data }: Props) {
  const total      = data.length;
  const asegurados = data.filter((d) => d.asegurado).length;
  const masculinos = data.filter((d) => d.sexo === 'M').length;
  const femeninos  = data.filter((d) => d.sexo === 'F').length;

  const cards = [
    {
      label: 'Total Pacientes',
      value: total,
      icon: faPeopleGroup,
      iconColor: 'rgb(27, 59, 187)',
      bgColor: '#e3eaf2',
    },
    {
      label: 'Asegurados',
      value: asegurados,
      icon: faCircleCheck,
      iconColor: '#16a34a',
      bgColor: '#e6f7ee',
    },
    {
      label: 'Masculinos',
      value: masculinos,
      icon: faPerson,
      iconColor: '#2563eb',
      bgColor: '#e8f0fe',
    },
    {
      label: 'Femeninos',
      value: femeninos,
      icon: faPersonDress,
      iconColor: '#db2777',
      bgColor: '#fde8ef',
    },
  ];

  return (
    <Box sx={{ px: 4, pt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {cards.map(({ label, value, icon, iconColor, bgColor }) => (
          <Box key={label} sx={cardStyle}>
            <Box sx={iconStyle(bgColor)}>
              <FontAwesomeIcon icon={icon} style={{ color: iconColor, fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                {label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}