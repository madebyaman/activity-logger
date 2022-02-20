import { useEffect, useState } from 'react';
import { OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState } from 'recoil';
import { ActivitySelect, ActivityType } from '../../types';
import { activitiesState } from './activitiesState';
import { blockTypeColors } from './TimeGrid';

// PROPS
// 1. `onAddActivity` func to call when adding a new activity.
// 2. `activityId` prop to updated selected activity for that block
// 3. `onUpdate` func to call when updating activity for a block.
// 4. `id` of the current block.
const Block = ({
  onAddActivity,
  activityId,
  onUpdate,
  id,
}: {
  onAddActivity: (input: string, blockId: number) => void;
  onUpdate: (blockId: number, activityId: number) => Promise<void>;
  activityId: number | null;
  id: number;
}) => {
  const [activities, setActivities] = useRecoilState(activitiesState);
  const [selectedActivity, setSelectedActivity] = useState<
    ActivitySelect | undefined
  >(undefined);

  useEffect(() => {
    if (activities && activityId) {
      setSelectedActivity(
        activities.find((activity) => Number(activity.value) === activityId)
      );
    }
  }, [activities, activityId]);

  const createNewOptions = (input: string) => {
    onAddActivity(input, id);
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
        <span className="font-light text-gray-700">{label}</span>
      </div>
    );
  };

  return (
    <>
      <CreatableSelect
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
