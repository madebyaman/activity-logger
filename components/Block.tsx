import { useState } from 'react';
import { OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ActivityOption, ActivityType } from '../types';

type ActivitySelectOption = {
  readonly label: string;
  readonly value: string;
  readonly type: ActivityType;
};

// Accepts 2 props
// 1. activityOptions to show activity options
// 2. `setNewActivityName` func to update newActivityName state in parent which sends it to `NewActivityModal` so it comes pre-filled with whatever user has typed in when clicking create new option
const Block = ({
  activityOptions,
  setNewActivityName,
}: {
  activityOptions: ActivityOption[];
  setNewActivityName: (input: string) => void;
}) => {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivitySelectOption | null>(null);

  const options: ActivitySelectOption[] = activityOptions.map((activity) => {
    return {
      label: activity.name,
      value: activity.name.toLowerCase(),
      type: activity.type,
    };
  });

  // what happens when user selects `Create New Option` option
  const createNewOptions = (input: string) => {
    // We should set the input to `newActivityName` so it gets passed to `NewActivityModal`.
    setNewActivityName(input);
  };

  // What happens when `CreatableSelect` changes
  const handleSelectChange = (
    newVal: OnChangeValue<ActivitySelectOption, false>
  ) => {
    setSelectedActivity(newVal);
  };

  return (
    <div>
      <CreatableSelect
        instanceId="select-activity"
        onCreateOption={createNewOptions}
        value={selectedActivity}
        onChange={handleSelectChange}
        options={options}
        isClearable
      />
      {/* Why NewActivityModal is located here? */}
      {/* B/c once a new activity type is created, we should set that option as selected. This would be impossible to achieve if `NewActivityModal` is located in dashboard page. */}
    </div>
  );
};

export default Block;
