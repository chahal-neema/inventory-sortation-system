import { Operation } from '@/types/sortation';
import { Card, CardContent } from "@/components/ui/card";
import { format } from 'date-fns';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface OperationLogProps {
  operations: Operation[];
}

export function OperationLog({ operations }: OperationLogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-gray-50">
      <CardContent className="p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="font-medium text-sm md:text-base">Recent Operations</h3>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="space-y-2 text-xs md:text-sm">
              {operations.map((op, i) => (
                <div key={i} className="text-gray-600 grid grid-cols-4 gap-2 md:gap-4">
                  <span>{format(new Date(op.timestamp), 'HH:mm:ss')}</span>
                  <span>{op.operation_type}</span>
                  <span>{op.sku}</span>
                  <span className={
                    op.status === 'success' ? 'text-green-600' :
                    op.status === 'error' ? 'text-red-600' :
                    'text-blue-600'
                  }>
                    {op.status}
                  </span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}