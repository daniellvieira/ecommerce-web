import React from 'react';
import MainComponent from '../components/shared/MainComponent';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <MainComponent>
      <h1>Hello World</h1>
      <button onClick={() => router.push('/Auth/Login')}>Login</button>
    </MainComponent>
  )
}

export default Home;