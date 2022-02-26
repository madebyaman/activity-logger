import type { AppProps } from 'next/app';

import '../styles/globals.css';
import { NextPageWithAuth } from '../types';
import {
  FlashMessageProvider,
  FlashMessageWrapper,
} from '../components/FlashMessage';
import { AppLayout } from '../components/ui/AppLayout';

type ComponentPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithAuth) {
  return (
    <FlashMessageProvider>
      {Component.protectedRoute ? (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      ) : (
        <Component {...pageProps} />
      )}
      <FlashMessageWrapper />
    </FlashMessageProvider>
  );
}

export default MyApp;
