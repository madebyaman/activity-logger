import {
  Button,
  Select,
  TextInput,
  Option,
  Heading,
  TextLink,
  FlashMessage,
  CenteredLayout,
} from '../components/ui';
import { Label } from '../components/ui/Label';

const CheckComponents = () => {
  return (
    <CenteredLayout>
      <Heading type="h1">Check components</Heading>
      <Label htmlFor="name" labelName="Name" />
      <TextInput id="name" />
      <Heading type="h2">Button</Heading>
      <Button>
        <svg
          className="fill-current w-4 h-4 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </Button>
      <Heading type="h2">Select</Heading>
      <Label htmlFor="select" labelName="Select" />
      <Select id="select">
        <Option>New Mexico</Option>
        <Option>New York</Option>
        <Option>New Jersey</Option>
        <Option>New Hampshire</Option>
      </Select>
      <Heading type="h2">Link Component</Heading>
      <TextLink href="https://www.google.com">Google</TextLink>
      <Heading type="h2">Flash Message</Heading>
      <FlashMessage
        message="Something not ideal might be happening"
        title="Be warned"
        type="success"
      />
    </CenteredLayout>
  );
};

export default CheckComponents;
