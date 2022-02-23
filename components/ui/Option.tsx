import { DetailedHTMLProps, OptionHTMLAttributes, ReactNode } from 'react';

interface OptionPropsInterface
  extends DetailedHTMLProps<
    OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  > {
  children: ReactNode;
  classes?: string;
}

export const Option = ({
  children,
  classes,
  ...rest
}: OptionPropsInterface) => {
  return (
    <option
      {...rest}
      className={`block text-gray-700 text-sm font-bold mb-2 ${classes || ''}`}
    >
      {children}
    </option>
  );
};
