import { FlashMessage } from '../components/FlashMessage/FlashMessage';
import { CenteredLayout } from '../components/ui';

const CheckComponents = () => {
  return (
    <CenteredLayout>
      <FlashMessage
        message="Something not ideal might be happening"
        title="Be warned"
        type="success"
      />
    </CenteredLayout>
  );
};

export default CheckComponents;
