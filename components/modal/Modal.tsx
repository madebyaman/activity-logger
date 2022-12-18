import { MouseEvent, useContext, useState } from 'react';

import { ModalContext } from '.';
import { SlideOver } from '@/components/ui';
import { AddActivity } from './AddActivity';
import { EditBlock } from './EditBlock';

export const Modal = () => {
  const { modalState: modal, setModalState: setModal } =
    useContext(ModalContext);
  const [showEditBlock, setShowEditBlock] = useState(true);

  if (!modal.showModal) {
    return null;
  }

  const changeTab = (e?: MouseEvent<HTMLButtonElement>) => {
    e && e.preventDefault();
    setShowEditBlock((state) => !state);
  };

  return (
    <SlideOver
      title={showEditBlock ? 'Edit Block' : 'Add Activity'}
      onClose={() => setModal && setModal({ ...modal, showModal: false })}
    >
      {showEditBlock ? (
        <EditBlock changeTab={changeTab} />
      ) : (
        <AddActivity changeTab={changeTab} />
      )}
    </SlideOver>
  );
};
