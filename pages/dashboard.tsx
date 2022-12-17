import { NextPageWithAuth } from '../types';
import { Blocks } from '../components/dashboard';
import { Modal } from '../components/modal';
import { useBlocks, useProfile } from '../utils';

const Dashboard: NextPageWithAuth = () => {
  const { profile } = useProfile();
  const { blocks, isLoading, isError } = useBlocks();

  return (
    <div>
      <div>
        {isLoading === 'LOADING' ? (
          // <Blocks isLoading="LOADING" />
          <div>Loadng...</div>
        ) : isLoading === 'ERROR' ? (
          <Blocks
            isLoading="ERROR"
            isError={isError || 'Error fetching data'}
          />
        ) : (
          <Blocks
            profile={profile.profile}
            blocks={blocks}
            isLoading={'LOADED'}
          />
        )}
      </div>
      <Modal />
    </div>
  );
};

Dashboard.protectedRoute = true;

export default Dashboard;
