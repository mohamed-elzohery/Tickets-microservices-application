import * as React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

function App() {

  return <Button variant="contained"></Button>;
}

export async function getServerSideProps({req: {headers}}) {
  console.log(headers);
  const res = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
    headers
  });

  console.log(res.data);
  return { 
    props: { title: 'My Title', content: 'bla vbla bla' }
  }
}

export default App;