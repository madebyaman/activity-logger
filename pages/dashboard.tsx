import { NextPageWithAuth } from '@/types';
import { Blocks } from '@/components/dashboard';
import { Modal } from '@/components/modal';
import { useBlocks, useProfile } from '@/utils';
import { Spinner } from '@/components/ui';

const Dashboard: NextPageWithAuth = () => {
  const { profile } = useProfile();
  const { blocks, isLoading, isError } = useBlocks();

  return (
    <div>
      <div>
        {isLoading ? (
          <Spinner />
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
