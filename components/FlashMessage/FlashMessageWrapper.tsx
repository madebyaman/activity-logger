import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { FlashMessage } from '../ui';
import { flashMessageState } from './state';

const FlashMessageWrapper = () => {
  const [flashMessages, setFlashMessages] = useRecoilState(flashMessageState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashMessages((prevMessages) => prevMessages.slice(1));
    }, 5_000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="fixed top-8 right-4">
      {flashMessages.map((flashMessage, index) => (
        <FlashMessage
          key={index}
          message={flashMessage.message}
          type={flashMessage.type}
          title={flashMessage.title}
        />
      ))}
    </div>
  );
};

export default FlashMessageWrapper;
