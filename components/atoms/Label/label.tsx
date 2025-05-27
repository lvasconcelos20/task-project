import { LabelProps } from "./types";

const Label = ({ children, name }: LabelProps) => {
  return (
    <label className="text-xs font-medium text-gray-700" htmlFor={name}>
      {children}
    </label>
  );
};

export default Label;
