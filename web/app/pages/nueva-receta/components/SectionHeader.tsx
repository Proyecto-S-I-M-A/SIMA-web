import { Box, Typography } from '@mui/material';

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  color?: string;
};

export default function SectionHeader({
  icon,
  title,
  subtitle,
  color = 'primary.main',
}: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mb: 2.5,
        pb: 1.5,
        borderBottom: '2px solid',
        borderColor: color,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: color,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
