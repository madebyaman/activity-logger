import { Button, TextInput } from '../components/ui';
import { Label } from '../components/ui/Label';

const CheckComponents = () => {
  return (
    <div>
      <Label htmlFor="name" labelName="Name" />
      <TextInput id="name" value={'Aman'} />
      <Button buttonType="disabled" buttonName="Submit" />
    </div>
  );
};

export default CheckComponents;
