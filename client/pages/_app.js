import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
    palette: {
      primary: yellow,
      secondary: green,
    },
    status: {
      danger: 'orange',
    },
  });

export default ({Component, pageProps}) => {
    return <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar={true} theme='dark' position='top-right'/>
      <Component {...pageProps} />
      </ThemeProvider>
}