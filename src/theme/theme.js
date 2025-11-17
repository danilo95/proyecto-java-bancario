const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#2E7D32',
      light: '#60AD5E',
      dark: '#005005',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#FFA726',
      light: '#FFD95B',
      dark: '#C77800'
    },
    background: {
      default: mode === 'light' ? '#F5F5F5' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  shape: {
    borderRadius: 8
  }
});
export default getTheme;