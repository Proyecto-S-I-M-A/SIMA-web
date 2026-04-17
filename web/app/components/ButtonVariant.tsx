import { Button } from '@mui/material';
import type { ComponentProps } from 'react';

interface ButtonProps {
  variant?: 'Primary' | 'Secondary';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export default function ButtonVariant(props: ButtonProps) {
  const {
    variant = 'Primary',
    size = 'medium',
    children = <p>Sample</p>,
    type = 'button',
  } = props;
  return (
    <>
      { variant === 'Primary' 
      ? <Button
          fullWidth
          variant="contained"
          size={size}
          type={type}
          sx={(theme) => ({
            py: 1.5,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
            fontWeight: 600,
            fontSize: '1rem',
            mt: 2,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            }
          })}
        >
          {children}
        </Button>
      : <Button
          fullWidth
          variant="contained"
          type={type}
          size={size}
          sx={(theme) => ({
            py: 1.5,
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
            fontWeight: 600,
            fontSize: '1rem',
            mt: 2,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
            }
          })}
        >
          {children}
        </Button>}
    </>
    
  );
}
