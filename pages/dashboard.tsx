import { NextPageWithAuth } from '../types';
import { Blocks } from '../components/dashboard';
import { Modal } from '../components/modal';
import { useBlocks, useProfile } from '../utils';
import { defaultProps } from 'react-select/dist/declarations/src/Select';

const Home: NextPageWithAuth = () => {
  const { profile } = useProfile();
  const { blocks, isLoading, isError } = useBlocks();

  return (
    <div>
      <div>
        {isLoading === 'LOADING' ? (
          <Blocks isLoading="LOADING" />
        ) : isLoading === 'ERROR' ? (
          <Blocks
            isLoading="ERROR"
            isError={isError || 'Error fetching data'}
          />
        ) : (
          <Blocks profile={profile} blocks={blocks} isLoading={isLoading} />
        )}
      </div>
      <Modal />
    </div>
  );
};

Home.protectedRoute = true;

export default Home;
