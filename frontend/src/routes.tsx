import { useMemo } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes as Switch, Route } from "react-router-dom"

import App from './App'
import { DashboardContainer } from './containers'
import { LoginView } from './views';
import { useSettings } from "./contexts";
import { CssBaseline } from "@mui/material";

export default function Routes() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const settings = useSettings();

    const theme = useMemo(
        () => {
            let theme = settings.getTheme();
            console.log(theme);

            if (theme == "system") theme = prefersDarkMode ? 'dark' : 'light';

            return createTheme({
                palette: {
                    mode: theme,
                },
            });
        }, [prefersDarkMode, settings],
    );

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {prefersDarkMode && <link rel="stylesheet" type="text/css" href={require('@sweetalert2/theme-dark/dark.css')} />}

        <Switch>
            <Route path='/' element={<DashboardRoutes />} />
            <Route path='/login' element={<LoginView />} />
            <Route path="*" element={<h1>404 App</h1>} />
        </Switch>
    </ThemeProvider>
}

function DashboardRoutes() {
    return <DashboardContainer>
        <Switch>
            <Route index element={<h1>Authenticated</h1>} />
            <Route path="*" element={<h1>404 Dashboard</h1>} />
        </Switch>
    </DashboardContainer>
}