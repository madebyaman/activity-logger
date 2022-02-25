import { Activity } from '@prisma/client';
import { FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from './state';

const Modal = ({
  onSubmit,
}: {
  onSubmit: ({ name, type }: { name: string; type: Activity }) => Promise<void>;
}) => {
  const [activityType, setActivityType] = useState<Activity>('Neutral');
  const [modal, setModalState] = useRecoilState(modalState);

  const activityTypeOptions: Activity[] = [
    'Neutral',
    'Productive',
    'Very Productive',
    'Distracting',
    'Very Distracting',
  ];

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit inputs
    onSubmit({ name: modal.name, type: activityType });
    // Clear local state
    setActivityType('Neutral');
    // Reset modal
    setModalState({ currentBlockId: undefined, name: '', showModal: false });
  };

  if (modal.showModal) {
    return (
      <div>
        <div className="fixed top-0 right-1/3 left-0 bg-black bottom-0 opacity-50"></div>
        <div className="fixed top-0 left-2/3 overflow-y-hidden z-10 right-0 bottom-0 bg-white">
          <div className="mt-12 px-5">
            <h3 className="text-3xl uppercase font-bold">
              Create new activity
            </h3>
            <form onSubmit={submitForm}>
              <label className="uppercase font-light mt-5 block">
                Activity Name:
                <input
                  className="block bg-gray-200 mt-1 mb-5 outline-0 appearance-none border border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="name"
                  value={modal.name}
                  onChange={(e) =>
                    setModalState({ ...modal, name: e.target.value })
                  }
                />
              </label>
              <label
                htmlFor="activitySelector"
                className="uppercase font-light mt-5 block"
              >
                Type of activity:
              </label>
              <select
                id="activitySelector"
                value={activityType}
                className="mt-1 mb-5 block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) =>
                  setActivityType(e.target.value as ActivityType)
                }
              >
                {activityTypeOptions.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                className="bg-gray-500 uppercase hover:bg-gray-700 text-white py-3 px-4"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
