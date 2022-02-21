import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithAuth } from '../types';
import ProfileContext from '../components/ProfileContext';
import { RecoilRoot } from 'recoil';
import FlashMessageWrapper from '../components/FlashMessage/FlashMessageWrapper';

type ComponentPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithAuth) {
  if (Component.protectedRoute) {
    return (
      <ProfileContext>
        <RecoilRoot>
          <Component {...pageProps} />
          <FlashMessageWrapper />
        </RecoilRoot>
      </ProfileContext>
    );
  } else {
    return (
      <RecoilRoot>
        <Component {...pageProps} />
        <FlashMessageWrapper />
      </RecoilRoot>
    );
  }
}

export default MyApp;
