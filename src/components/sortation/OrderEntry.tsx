import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useEffect, useRef } from "react";

interface OrderEntryProps {
  orderId: string;
  onOrderIdChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function OrderEntry({ orderId, onOrderIdChange, onSubmit, disabled }: OrderEntryProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && orderId.trim()) {
      onSubmit();
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-4 md:p-6">
        <div className="space-y-6">
          <div className="text-2xl md:text-4xl font-bold text-center p-4 md:p-6 border-b bg-gray-50 mb-4 md:mb-6">
            <div className="flex items-center justify-center gap-4">
              <Package className="w-8 h-8 md:w-12 md:h-12" />
              <span>START ORDER</span>
            </div>
          </div>
          
          <div>
            <label className="block text-lg md:text-2xl font-medium mb-2 md:mb-4">
              Enter Order Number
            </label>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Scan or enter order number..."
              className="text-2xl md:text-4xl p-4 md:p-8 font-mono h-16 md:h-24 bg-white"
              value={orderId}
              onChange={(e) => onOrderIdChange(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              onBlur={() => inputRef.current?.focus()}
              disabled={disabled}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}