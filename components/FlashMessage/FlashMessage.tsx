import { AiOutlineClose } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import { flashMessageState } from './flashMessageState';

export const FlashMessage = ({
  message,
  title,
  type,
}: {
  message: string;
  title: string;
  type: 'error' | 'warning' | 'success';
}) => {
  const setFlashMessages = useSetRecoilState(flashMessageState);

  const removeLastMessage = () => {
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
    >
      <p className="font-bold">{title}</p>
      <button
        className="absolute top-3 right-3 font-bold"
        onClick={removeLastMessage}
      >
        <AiOutlineClose />
      </button>
      <p>{message}</p>
    </div>
  );
};
