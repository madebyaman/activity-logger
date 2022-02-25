import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPageWithAuth } from '../types';
import { RecoilRoot } from 'recoil';
import FlashMessageWrapper from '../components/FlashMessage/FlashMessageWrapper';
import { AppLayout } from '../components/ui/AppLayout';

type ComponentPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithAuth) {
  return (
    <RecoilRoot>
      {Component.protectedRoute ? (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      ) : (
        <Component {...pageProps} />
      )}
      <FlashMessageWrapper />
    </RecoilRoot>
  );
}

export default MyApp;
