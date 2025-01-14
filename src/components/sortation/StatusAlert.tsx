import { Alert, AlertDescription } from "@/components/ui/alert";
import { SortationStatus } from '@/types/sortation';
import { CheckCircle2 } from 'lucide-react';

interface StatusAlertProps {
  status: SortationStatus;
  destinationBin: string | null;
  error?: { message: string; details: string; } | null;
  binScanned: boolean;
}

export function StatusAlert({ status, destinationBin, error, binScanned }: StatusAlertProps) {
  if (status === 'success' && destinationBin) {
    return (
      <Alert className="bg-green-50 border-green-200 p-4 md:p-6">
        <AlertDescription className="flex flex-col items-center">
          <div className="text-xl md:text-2xl text-green-700 mb-2">Destination:</div>
          <div className="text-3xl md:text-5xl font-bold text-green-700 mb-4">{destinationBin}</div>
          {binScanned && <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-500 animate-[fadeIn_0.5s_ease-in]" />}
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'waiting') {
    return (
      <Alert className="bg-blue-50 border-blue-200">
        <AlertDescription className="text-lg md:text-xl text-blue-700">
          New item! Scan any empty bin to create assignment.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'error' && error) {
    return (
      <Alert className="bg-red-50 border-red-200">
        <AlertDescription>
          <div className="text-xl md:text-2xl font-bold text-red-700">{error.message}</div>
          <div className="text-base md:text-lg text-red-600 mt-2">{error.details}</div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}