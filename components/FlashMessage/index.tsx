const FlashMessage = ({
  message,
  title,
  type,
}: {
  message: string;
  title: string;
  type: 'error' | 'warning';
}) => {
  return (
    <div
      className={`${
        type === 'warning'
          ? 'bg-orange-100 border-orange-500 text-orange-700'
          : 'bg-red-100 border-red-500 text-red-700'
      } border-l-4 p-4 mb-4`}
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default FlashMessage;
