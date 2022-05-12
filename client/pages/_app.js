import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, white  } from '@mui/material/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import buildClient from '../api/build-client';
import Header from '../components/layout/header/Header';
import App from 'next/app';
import '../public/style/custom.css'
const theme = createTheme({
    palette: {
      primary: {
        main: '#FFF',
      },
      secondary: red
    },
    typography: {
      allVariants: {
        color: 'black'
      }
    }
  });

const AppComponent = ({Component, pageProps, currentUser}) => {
    console.log(currentUser)
    return <ThemeProvider theme={theme}>
      <Header currentUser={currentUser} />
      <Component {...pageProps}  currentUser={currentUser}/>
      <ToastContainer hideProgressBar={true} theme='dark' position='top-right'/>
      </ThemeProvider>
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  console.log(data);
  let pageProps = {};
  if (App.getInitialProps) {
    pageProps = await App.getInitialProps(appContext);
  }

  // console.log(data.data.currentUser)
  return {
    ...pageProps,
    currentUser: data.data.currentUser
  };
};

export default AppComponent;