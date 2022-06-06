import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider, APIProvider, DialogsProvider, SettingsProvider } from './contexts';

export default function App({ children }: React.PropsWithChildren<any>) {
  return (<>

    <SettingsProvider>
      <DialogsProvider>
        <APIProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </APIProvider>
      </DialogsProvider>
    </SettingsProvider>
  </>
  );
}
