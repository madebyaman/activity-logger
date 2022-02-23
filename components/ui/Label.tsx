export const Label = ({ labelName, ...rest }: { labelName: string }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2" {...rest}>
      {labelName}
    </label>
  );
};
