import { DetailedHTMLProps, ReactNode, SelectHTMLAttributes } from 'react';

interface SelectPropsInterface
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  children: ReactNode;
  classes?: string;
}
export const Select = ({
  children,
  classes,
  ...rest
}: SelectPropsInterface) => {
  return (
    <select
      {...rest}
      className={`block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
        classes || ''
      }`}
    >
      {children}
    </select>
  );
};
