import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import buildClient from '../api/build-client';


const theme = createTheme({
    palette: {
      primary: yellow,
      secondary: green,
    },
    status: {
      danger: 'orange',
    },
  });

const AppComponent = ({Component, pageProps, currentUser}) => {

  // Component.getServerSideProps = async (context) => {
  //   console.log("App");
  //   console.log(context);
  //   
  // }

    return <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar={true} theme='dark' position='top-right'/>
      {currentUser && <h1>{currentUser.email}</h1>}
      <Component {...pageProps} />
      </ThemeProvider>
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;