import { Controller, Control, FieldValues, Path, FieldErrors } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Label from "@/components/atoms/Label/label";
import FormErrorLabel from "@/components/atoms/FormError/formError";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  formErrors?: FieldErrors;
  className?: string;
}

const SelectField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Selecione uma opção",
  formErrors,
  className,
}: SelectFieldProps<T>) => {
    const errorMessage = formErrors && name ? formErrors[name]?.message : null

  return (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FormErrorLabel>{errorMessage && errorMessage.toString()}</FormErrorLabel>
    </div>
  );
};

export default SelectField;
