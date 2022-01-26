import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const NewActivityDropDown = ({
  toggleActivityModal,
}: {
  toggleActivityModal: (name: string) => void;
}) => {
  const activities = [
    'Development',
    'Running',
    'Reading',
    'Designing',
    'YouTube',
    'Playing',
    'Netflix',
    'Eating',
    'Driving',
  ];

  type ActivityOptions = {
    label: string;
    value: string;
  }[];

  const options: ActivityOptions = activities.map((activity) => {
    return {
      label: activity,
      value: activity.toLowerCase(),
    };
  });

  const createNewOptions = (input: string) => {
    console.log('New option creating', input);
    toggleActivityModal(input);
  };

  return (
    <div>
      <CreatableSelect
        options={options}
        instanceId="select-activity"
        onCreateOption={createNewOptions}
      />
    </div>
  );
};

export default NewActivityDropDown;
