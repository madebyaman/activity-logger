import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithAuth } from '../types';
import { RecoilRoot } from 'recoil';
import FlashMessageWrapper from '../components/FlashMessage/FlashMessageWrapper';
import AppLayout from '../components/AppLayout';

type ComponentPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithAuth) {
  if (Component.protectedRoute) {
    return (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
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
