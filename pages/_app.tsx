import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithAuth } from '../types';
import ProfileContext from '../components/ProfileContext';

type ComponentPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithAuth) {
  if (Component.protectedRoute) {
    return (
      <ProfileContext>
        <Component {...pageProps} />
      </ProfileContext>
    );
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
