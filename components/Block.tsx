import { Activity } from '@prisma/client';
import { OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useActivities } from '../utils/hooks';
import { blockTypeColors } from './TimeGrid';

// PROPS
// 1. `onAddActivity` func to call when adding a new activity.
// 2. `onUpdate` func to call when updating activity for a block.
// 3. `id` of the block.
// 3. `activityId` prop to updated selected activity for that block
const Block = ({
  onAddActivity,
  activityId,
  id,
  onUpdate,
}: {
  onAddActivity: (input: string, blockId: number) => void;
  activityId: number | null;
  id: number;
  onUpdate: (blockId: number, activityId: number) => void;
}) => {
  const { activities, isLoading, isError } = useActivities();
  const selectedActivity = activities.find(
    (activity) => Number(activity.id) === activityId
  );

  const createNewOptions = (input: string) => {
    onAddActivity(input, id);
  };

  // What happens when `CreatableSelect` changes
  const handleSelectChange = (newVal: OnChangeValue<Activity, false>) => {
    // setSelectedActivity(newVal);
    if (!newVal) return;
    onUpdate(id, newVal.id);
  };

  const formatOptionLabel = ({ name, type }: Activity) => {
    return (
      <div className="flex items-center">
        <span
          className={`w-3 h-3 mr-2 inline-block rounded-full ${blockTypeColors[type]}`}
        ></span>
        <p className="font-light text-gray-700">{name}</p>
      </div>
    );
  };

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div>
      <CreatableSelect
        options={activities}
        placeholder="Select an activity"
        isLoading={isLoading}
        instanceId="select-activity"
        className="font-light text-gray-700 border-0"
        onCreateOption={createNewOptions}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id.toString()}
        value={selectedActivity || null}
        onChange={handleSelectChange}
        formatOptionLabel={formatOptionLabel}
        isClearable
      />
    </div>
  );
};

export default Block;
