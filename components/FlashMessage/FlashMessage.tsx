import { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { FlashMessageContext } from '.';

export const FlashMessage = ({
  message,
  title,
  type,
}: {
  message: string;
  title: string;
  type: 'error' | 'warning' | 'success';
}) => {
  const { setFlashMessages } = useContext(FlashMessageContext);

  const removeLastMessage = () => {
    setFlashMessages &&
      setFlashMessages((prevMessages) => prevMessages.slice(1));
  };

  return (
    <div
      className={`${
        type === 'warning'
          ? 'bg-orange-100 border-orange-500 text-orange-700'
          : type === 'error'
          ? 'bg-red-100 border-red-500 text-red-700'
          : 'bg-green-100 border-green-500 text-green-700'
      } border-l-4 p-4 mb-4 relative`}
      role="alert"
      aria-live="assertive"
    >
      <h3 className="font-bold">{title}</h3>
      <button
        className="absolute top-3 right-3 font-bold"
        onClick={removeLastMessage}
        aria-label="Close notification"
      >
        <AiOutlineClose />
      </button>
      <p className="paragraph">{message}</p>
    </div>
  );
};
