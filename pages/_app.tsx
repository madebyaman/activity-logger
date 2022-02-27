import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';

import '../styles/globals.css';
import '../styles/nprogress.css';
import { NextPageWithAuth } from '../types';
import {
  FlashMessageProvider,
  FlashMessageWrapper,
} from '../components/FlashMessage';
import { AppLayout } from '../components/ui/AppLayout';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
