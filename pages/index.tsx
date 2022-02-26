import { NextPageWithAuth } from '../types';
import { Blocks } from '../components/dashboard';
import { Modal } from '../components/modal';

const Home: NextPageWithAuth = () => {
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
      <Modal />
    </div>
  );
};

Home.protectedRoute = true;

export default Home;
