import {
  ButtonHTMLAttributes,
  Children,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
import { classNames } from '../../utils';

type ButtonType = 'outline' | 'disabled';

interface ButtonPropsInterface
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonType?: ButtonType;
  classes?: string;
  children: ReactNode;
}

const baseButtonStyles = 'font-bold py-2 px-4 rounded';
const defaultButtonStyles =
  baseButtonStyles +
  ' ' +
  'bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline';
const disabledButtonStyles =
  baseButtonStyles + ' bg-blue-500 text-white opacity-50 cursor-not-allowed';
const outlineButtonStyles =
  baseButtonStyles +
  ' bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent';

export const Button = ({
  children,
  buttonType,
  classes,
  ...rest
}: ButtonPropsInterface) => {
  return (
    <button
      {...rest}
      className={classNames(
        classes || '',
        buttonType === 'disabled'
          ? disabledButtonStyles
          : buttonType === 'outline'
          ? outlineButtonStyles
          : defaultButtonStyles,
        Children.count(children) > 1 ? 'inline-flex items-center' : ''
      )}
      type="button"
    >
      {children}
    </button>
  );
};
