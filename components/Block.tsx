import { OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Activity } from '../types';
import { blockTypeColors } from './TimeGrid';

// PROPS
// 1. activityOptions to show activity options
// 2. `setNewActivityName` func to update newActivityName state in parent which sends it to `NewActivityModal` so it comes pre-filled with whatever user has typed in when clicking create new option
// 3. `selectedActivity` prop to get selected activity for a given block
// 4. `updateSelectedActivity` prop to updated selected activity for that block
// QUESTION: Why `selectedActivity` and `updatedSelectedActivity` are not localized for this component? B/c
// 1. We need to get, send the selected activity from database. In doing it once state gets initiliazed we are saving db costs.
// 2. Once we create a new activity using the modal, we need to set that new activity as selected activity for that block.
const Block = ({
  activityOptions,
  setNewActivityName,
  activity,
  id,
  onUpdate,
}: {
  activityOptions: Activity[];
  setNewActivityName: (input: string, blockId: string) => void;
  activity: Activity | undefined;
  id: string;
  onUpdate: (blockId: string, newActivity: Activity | null) => void;
}) => {
  const selectedActivity = activity;

  // what happens when user selects `Create New Option` option
  const createNewOptions = (input: string) => {
    // We should set the input to `newActivityName` so it gets passed to `NewActivityModal`.
    setNewActivityName(input, id);
  };

  // What happens when `CreatableSelect` changes
  const handleSelectChange = (newVal: OnChangeValue<Activity, false>) => {
    // setSelectedActivity(newVal);
    onUpdate(id, newVal);
  };

  const formatOptionLabel = ({ label, type }: Activity) => {
    return (
      <div className="flex items-center">
        <span
          className={`w-3 h-3 mr-2 inline-block rounded-full ${blockTypeColors[type]}`}
        ></span>
        <p className="font-light text-gray-700">{label}</p>
      </div>
    );
  };

  return (
    <div>
      <CreatableSelect
        placeholder="Select an activity"
        instanceId="select-activity"
        className="font-light text-gray-700"
        onCreateOption={createNewOptions}
        value={selectedActivity}
        onChange={handleSelectChange}
        options={activityOptions}
        formatOptionLabel={formatOptionLabel}
        isClearable
      />
      {/* Why NewActivityModal is located here? */}
      {/* B/c once a new activity type is created, we should set that option as selected. This would be impossible to achieve if `NewActivityModal` is located in dashboard page. */}
    </div>
  );
};

export default Block;
