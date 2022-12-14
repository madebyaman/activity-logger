import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { lazy } from 'react';
import {
  FlashMessageProvider,
  FlashMessageWrapper,
} from '../components/FlashMessage';
import '../styles/globals.css';
import '../styles/nprogress.css';
import { NextPageWithAuth } from '../types';

const AppLayout = lazy(() => import('../components/ui/AppLayout'));

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
      <a
        href="#main"
        className="absolute top-0 right-full focus:right-0 w-full bg-yellow-400 underline pl-2 py-2 outline-none text-blue-700"
      >
        Skip to main content
      </a>
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
