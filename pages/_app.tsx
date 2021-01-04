import { AppProps } from 'next/app'
import Head from 'next/head'
// importando o Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

// imports relacionado ao redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';

// React.FC eh um componente funcional
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Só o Mi Fortaleza</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp