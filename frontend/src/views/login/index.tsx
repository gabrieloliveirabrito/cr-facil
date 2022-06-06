import { useEffect, useState } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../../contexts';
import ThemeToggle from '../../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://gobrito.com.br/">
        Projeto Rendas
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginView() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      if (await auth.isAuthenticated()) {
        navigate('/');
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await auth.signIn(email, password);
    setLoading(false);
  };

  async function authWithGoogle(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setLoading(true);
    await auth.authWithProvider('google');
    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>

          <ThemeToggle />
        </Box>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Manter-se conectado"
            disabled={loading}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            Entrar
          </Button>
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}
            onClick={authWithGoogle} disabled={loading}>
            Entrar com Google
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Não possui conta? Cadastre-se!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}