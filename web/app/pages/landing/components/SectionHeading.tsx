import { Stack, Typography } from '@mui/material';

interface SectionHeadingProps {
  overline: string;
  title: string;
  subtitle?: string;
}

/** Encabezado compartido por todas las secciones de la landing. */
export default function SectionHeading(props: SectionHeadingProps) {
  const { overline, title, subtitle } = props;
  return (
    <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', mb: { xs: 4, md: 6 } }}>
      <Typography
        variant="body2"
        sx={{
          color: 'primary.main',
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        {overline}
      </Typography>
      <Typography component="h2" variant="h2" sx={{ maxWidth: 780 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640 }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
