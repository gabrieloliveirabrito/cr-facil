import { useEffect, useState, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import DashAppBar from "./appbar";
import { useAuth } from '../../contexts';

export default function DashboardContainer({ children }: PropsWithChildren<any>) {
  const auth = useAuth();
  const [authenticated, setAuthenticated] = useState(0);

  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await auth.isAuthenticated();
        setAuthenticated(result ? 1 : -1);
      } catch (e) {
        setAuthenticated(-1);
      }
    }

    checkAuth();
  }, [auth]);

  if (authenticated === -1)
    return <Navigate replace to="/login" />
  else if (authenticated === 0)
    return <h1>Checking, please wait...</h1>
  else
    return (<Box sx={{ flexGrow: 1 }}>
      <DashAppBar />

      <div>{children}</div>
    </Box>
    );
}