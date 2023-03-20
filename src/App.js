import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Chat from './components/Chat';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f9a825',
    },
    secondary: {
      main: '#f6f6f6',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Chat />
    </ThemeProvider>
  );
}

export default App;
