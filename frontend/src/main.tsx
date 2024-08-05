import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from '@mui/material/styles';
import Button from './components/ui/button'
import theme from './theme'; // Import your MUI theme file
import { App } from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Create a client
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </ThemeProvider>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);