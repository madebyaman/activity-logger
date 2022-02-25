import { useEffect, useState } from 'react';
import { OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalState } from './state';
import { activitiesState } from '../activities/activitiesState';

// PROPS
// 1. `onAddActivity` func to call when adding a new activity.
// 2. `activityId` prop to updated selected activity for that block
// 3. `onUpdate` func to call when updating activity for a block.
// 4. `id` of the current block.
const Block = ({
  activityId,
  onUpdate,
  id,
}: {
  onUpdate: (blockId: number, activityId: number) => Promise<void>;
  activityId: number | null;
  id: number;
}) => {
  const activities = useRecoilValue(activitiesState);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivitySelect | null>(null);
  const setModalState = useSetRecoilState(modalState);

  useEffect(() => {
    if (!activityId) setSelectedActivity(null);

    if (activities) {
      const newSelectedActivity =
        activities.find((activity) => Number(activity.value) === activityId) ||
        null;
      setSelectedActivity(newSelectedActivity);
    }
  }, [activities, activityId]);

  const createNewOptions = (input: string) => {
    setModalState({ name: input, showModal: true, currentBlockId: id });
  };

  // What happens when a new option is selected.
  const handleSelectChange = async (
    newVal: OnChangeValue<ActivitySelect, false>
  ) => {
    if (!newVal) return;
    onUpdate(id, newVal.value);
  };

  /**
   * Formats how the options should be displayed by react-select.
   */
  const formatOptionLabel = ({
    label,
    type,
  }: {
    label: string;
    type: ActivityType;
  }) => {
    return (
      <div className="flex items-center">
        <span
          className={`w-3 h-3 mr-2 inline-block rounded-full ${blockTypeColors[type]}`}
        ></span>
        <span>{label}</span>
      </div>
    );
  };

  const customStyles = {
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      background: state.isSelected ? '#262626' : '#ffffff',
      color: state.isSelected ? '#f9fafb' : '#374151',
      padding: '0.5rem 1rem',
      ':hover': {
        background: !state.isSelected && '#f3f4f6',
      },
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      top: '40px',
    }),
  };

  return (
    <>
      <CreatableSelect
        styles={customStyles}
        options={activities}
        placeholder="Pick your activity"
        instanceId="select-activity"
        className="font-light text-gray-700 border-0"
        onCreateOption={createNewOptions}
        value={selectedActivity}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
        })}
        onChange={handleSelectChange}
        formatOptionLabel={formatOptionLabel}
        formatCreateLabel={(input) => `New activity: ${input}`}
      />
    </>
  );
};

export default Block;
