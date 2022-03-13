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
import Head from 'next/head';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type ComponentPropsWithAuth = AppProps & {
  Component: NextPageWithAuth;
};

function MyApp({ Component, pageProps }: ComponentPropsWithAuth) {
  return (
    <FlashMessageProvider>
      <Head>
        <title>Activity Logger App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
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
