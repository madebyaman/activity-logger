import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { SlideOver } from '../ui';
import { AddActivity } from './AddActivity';
import { EditBlock } from './EditBlock';
import { modalState } from './modalState';

export const Modal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [showEditBlock, setShowEditBlock] = useState(true);

  if (!modal.showModal) return null;

  return (
    <SlideOver
      title={showEditBlock ? 'Edit Block' : 'Add Activity'}
      onClose={() => setModal({ ...modal, showModal: false })}
    >
      {showEditBlock ? (
        <EditBlock changeTab={() => setShowEditBlock((state) => !state)} />
      ) : (
        <AddActivity changeTab={() => setShowEditBlock((state) => !state)} />
      )}
    </SlideOver>
  );
};
