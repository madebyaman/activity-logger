import { useRecoilState } from 'recoil';

import { NextPageWithAuth } from '../types';
import { modalState } from '../components/dashboard/state';
import { addActivity } from '../components/dashboard/utils';
import { flashMessageState } from '../components/FlashMessage/flashMessageState';
import { Activity } from '@prisma/client';
import { Blocks } from '../components/dashboard';

const Home: NextPageWithAuth = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [flashMessages, setFlashMessages] = useRecoilState(flashMessageState);

  /**
   * When a new activity is submitted
   * @param Object New Activity to be added
   */
  // const onSubmitNewActivity = async ({
  //   name,
  //   type,
  // }: {
  //   name: string;
  //   type: Activity;
  // }) => {
  //   // Hide activity modal
  //   setModal({ ...modal, showModal: false });
  //   try {
  //     // 1. Add the new activity
  //     const newActivity = await addActivity(name, type);
  //     // 2. Update the selectedActivity for that Block.
  //     if (modal.currentBlockId)
  //       updateBlock(modal.currentBlockId, newActivity.id);
  //   } catch (e) {
  //     setFlashMessages([
  //       ...flashMessages,
  //       {
  //         title: 'Error adding new activity',
  //         message:
  //           'There was a network error while adding a new activity. Try to refresh the page.',
  //         type: 'error',
  //       },
  //     ]);
  //   }
  // };

  return (
    <div>
      <div>
        <Blocks />
        {/* Grid Table */}
      </div>
      {/* Modal */}
      {/* <Modal onSubmit={onSubmitNewActivity} /> */}
    </div>
  );
};

Home.protectedRoute = true;

export default Home;
