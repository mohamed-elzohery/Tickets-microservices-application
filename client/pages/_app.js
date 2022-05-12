import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, yellow } from '@mui/material/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import buildClient from '../api/build-client';
import Header from '../components/layout/header/Header';
import App from 'next/app';

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
  console.log(currentUser)
  // Component.getServerSideProps = async (context) => {
  //   console.log("App");
  //   console.log(context);
  //   
  // }

    return <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar={true} theme='dark' position='top-right'/>
      <Header currentUser={currentUser} />
      <Component {...pageProps}  currentUser={currentUser}/>
      </ThemeProvider>
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (App.getInitialProps) {
    console.log('get in')
    pageProps = await App.getInitialProps(appContext);
  }

  // console.log(data.data.currentUser)
  return {
    ...pageProps,
    currentUser: data.data.currentUser
  };
};

export default AppComponent;