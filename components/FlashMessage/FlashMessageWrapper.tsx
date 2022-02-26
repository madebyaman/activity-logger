import { useContext, useEffect } from 'react';

import { FlashMessageContext } from '.';
import { FlashMessage } from './FlashMessage';

export const FlashMessageWrapper = () => {
  const { flashMessages, setFlashMessages } = useContext(FlashMessageContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashMessages &&
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
