import * as React from "react";

import { cn } from "@/lib/utils";
import usePrevious from "react-use/lib/usePrevious";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface DebounceInputProps extends React.ComponentProps<typeof Input> {
  debounce?: number;
  onChangeDebounce: (value: string) => void;
}

const DebounceInput = ({
  onChangeDebounce,
  debounce = 300,
  value,
  ...props
}: DebounceInputProps) => {
  const [debouncedValue, setDebouncedValue] = React.useState<string>(
    value as string
  );
  const preValue = usePrevious(debouncedValue);

  React.useEffect(() => {
    if (!preValue) {
      return;
    }

    const handler = setTimeout(() => {
      onChangeDebounce(debouncedValue);
    }, debounce);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue]);

  return (
    <Input
      value={debouncedValue}
      onChange={e => setDebouncedValue(e.target.value)}
      {...props}
    ></Input>
  );
};
DebounceInput.displayName = "DebounceInput";

export { Input, DebounceInput };
