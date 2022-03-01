import { NextPageWithAuth } from '../types';
import { Blocks } from '../components/dashboard';
import { Modal } from '../components/modal';
import Head from 'next/head';

const Home: NextPageWithAuth = () => {
  return (
    <div>
      <Head>
        <title>Activity Logger App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <Blocks />
      </div>
      <Modal />
    </div>
  );
};

Home.protectedRoute = true;

export default Home;
