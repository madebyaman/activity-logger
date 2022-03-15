import { NextPageWithAuth } from '../types';
import { Blocks } from '../components/dashboard';
import { Modal } from '../components/modal';

const Home: NextPageWithAuth = () => {
  return (
    <div>
      <div>
        <Blocks />
      </div>
      <Modal />
    </div>
  );
};

Home.protectedRoute = true;

export default Home;
