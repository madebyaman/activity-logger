import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

interface LabelPropsInterface
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  labelName: string;
  classes?: string;
}

export const Label = ({ labelName, classes, ...rest }: LabelPropsInterface) => {
  return (
    <label
      className={`block text-gray-700 text-sm font-bold mb-2 ${classes}`}
      {...rest}
    >
      {labelName}
    </label>
  );
};
