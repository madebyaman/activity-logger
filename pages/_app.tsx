import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithAuth } from '../types';
import ProfileContext from '../components/ProfileContext';
import { RecoilRoot } from 'recoil';

type ComponentPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithAuth) {
  if (Component.protectedRoute) {
    return (
      <ProfileContext>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ProfileContext>
    );
  } else {
    return (
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    );
  }
}

export default MyApp;
