export interface DatePickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  label: string
}