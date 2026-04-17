import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de login aquí
    console.log("Login attempted with:", { email, password, rememberMe });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          py: 2,
          backgroundColor: "gradient(135deg, #d7ff6b 0%, #FFFFFF 100%)"
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            width: "100%",
          }}
        >
          {/* Logo/Title */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
              FT
            </Typography>
          </Box>

          <Typography component="h1" variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
            FarmaTic
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
          >
            Sistema de Gestión Farmacéutica
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                type="email"
                placeholder="tu@correo.com"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Recuerda mis datos"
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  background: "linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  mt: 2,
                  "&:hover": {
                    background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                  },
                }}
              >
                Iniciar Sesión
              </Button>

              <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center", mt: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ¿No tienes cuenta?
                </Typography>
                <Link
                  href="#"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Regístrate aquí
                </Link>
              </Box>

              <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                <Link
                  href="#"
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>
            </Stack>
          </Box>

          {/* Footer */}
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              mt: 4,
              textAlign: "center",
              maxWidth: "90%",
            }}
          >
            Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
