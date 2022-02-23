import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface TextInputInterface
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  classes?: string;
}

export const TextInput = ({ classes, ...rest }: TextInputInterface) => {
  return (
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${classes}`}
      {...rest}
      type="text"
    />
  );
};
