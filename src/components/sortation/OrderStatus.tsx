import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/sortation";
import { Package, XCircle } from "lucide-react";

interface OrderStatusProps {
  order: Order;
  onCloseOrder: () => void;
}

export function OrderStatus({ order, onCloseOrder }: OrderStatusProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Package className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-mono text-base md:text-lg">{order.id}</span>
          </div>
          
          <Button 
            variant="outline" 
            className="ml-2 md:ml-4 text-sm md:text-base"
            onClick={onCloseOrder}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Close Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}