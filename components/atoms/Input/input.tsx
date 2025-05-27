import { FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { InputProps } from "./types";

const Input = <T extends FieldValues>({
  register,
  name,
  className,
  ...props
}: InputProps<T>) => {
  return (
    <input
      className={cn(
        " hover:border-b-blue-200 h-11 items-center gap-1 rounded-lg border border-gray-300 px-3 text-xs outline-none focus-within:ring-1 focus-within:ring-offset-2",
        className
      )}
      {...props}
      {...(register && name ? register(name) : {})}
    />
  );
};

export default Input;
