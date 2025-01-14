import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

interface ScanInputProps {
  type: 'sku' | 'bin';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function ScanInput({
  type,
  value,
  onChange,
  onKeyPress,
  disabled,
  autoFocus
}: ScanInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const label = type === 'sku' ? 'Scan SKU' : 'Scan Bin Location';
  const placeholder = type === 'sku' ? 'Scan item barcode...' : 'Scan bin barcode...';

  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRef.current?.focus();
    }
  }, [autoFocus, disabled]);

  return (
    <div className="h-full flex flex-col">
      <label className="block text-lg md:text-2xl font-medium mb-2 md:mb-4">
        {label}
      </label>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="text-2xl md:text-4xl p-4 md:p-8 font-mono h-16 md:h-24 bg-white flex-shrink-0"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onBlur={() => {
          if (autoFocus && !disabled) {
            inputRef.current?.focus();
          }
        }}
        disabled={disabled}
      />
    </div>
  );
}