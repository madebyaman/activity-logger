import { ReactNode } from 'react';

type ButtonType = 'outline' | 'disabled' | 'iconButton';

interface ButtonPropsInterface {
  buttonType?: ButtonType;
  icon?: ReactNode;
  buttonName: string;
}

const baseButtonStyles =
  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
const disabledButtonStyles = baseButtonStyles + ' cursor-not-allowed';
const outlineButtonStyles =
  baseButtonStyles +
  ' bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border-blue-500 hover:border-transparent';
const iconButtonStyles = baseButtonStyles + ' inline-flex items-center';

export const Button = ({
  buttonName,
  icon,
  buttonType,
  ...rest
}: ButtonPropsInterface) => {
  switch (buttonType) {
    case 'disabled':
      return (
        <button className={disabledButtonStyles} type="button">
          {buttonName}
        </button>
      );
    case 'outline':
      return (
        <button className={outlineButtonStyles} type="button">
          {buttonName}
        </button>
      );

    case 'iconButton':
      return (
        <button className={iconButtonStyles} type="button">
          {icon}
          {buttonName}
        </button>
      );
    default:
      return (
        <button className={baseButtonStyles} type="button">
          {buttonName}
        </button>
      );
  }
};
