import { useContext, useState } from 'react';

import { ModalContext } from '.';
import { SlideOver } from '../ui';
import { AddActivity } from './AddActivity';
import { EditBlock } from './EditBlock';

export const Modal = () => {
  const { modalState: modal, setModalState: setModal } =
    useContext(ModalContext);
  const [showEditBlock, setShowEditBlock] = useState(true);

  if (!modal.showModal) return null;

  return (
    <SlideOver
      title={showEditBlock ? 'Edit Block' : 'Add Activity'}
      onClose={() => setModal && setModal({ ...modal, showModal: false })}
    >
      {showEditBlock ? (
        <EditBlock changeTab={() => setShowEditBlock((state) => !state)} />
      ) : (
        <AddActivity changeTab={() => setShowEditBlock((state) => !state)} />
      )}
    </SlideOver>
  );
};
