import { NextPageWithAuth } from '@/types';
import { Blocks } from '@/components/dashboard';
import { Modal } from '@/components/modal';
import { useBlocks, useProfile } from '@/utils';

const Dashboard: NextPageWithAuth = () => {
  const { profile } = useProfile();
  const { blocks, isLoading, isError } = useBlocks();

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Blocks profile={profile} blocks={blocks} isError={isError} />
        )}
      </div>
      <Modal />
    </div>
  );
};

Dashboard.protectedRoute = true;

export default Dashboard;
