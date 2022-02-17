import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithoutAuth } from '../types';
import ProfileContext from '../components/ProfileContext';

type ComponentPropsWithoutAuth = AppProps & {
  Component: NextPageWithoutAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithoutAuth) {
  if (Component.protectedRoute === false) {
    return <Component {...pageProps} />;
  } else {
    return (
      <ProfileContext>
        <Component {...pageProps} />
      </ProfileContext>
    );
  }
}

export default MyApp;
