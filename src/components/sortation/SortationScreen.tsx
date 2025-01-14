import { Card, CardContent } from "@/components/ui/card";
import { StatusDisplay } from './StatusDisplay';
import { ScanInput } from './ScanInput';
import { StatusAlert } from './StatusAlert';

interface SortationScreenProps {
  step: 'item' | 'bin';
  status: 'ready' | 'waiting' | 'success' | 'error';
  currentSKU: string;
  currentBin: string;
  destinationBin: string | null;
  error: { message: string; details: string; } | null;
  binScanned: boolean;
  onSKUChange: (value: string) => void;
  onBinChange: (value: string) => void;
  onSKUSubmit: (sku: string) => void;
  onBinSubmit: (bin: string) => void;
}

export function SortationScreen({
  step,
  status,
  currentSKU,
  currentBin,
  destinationBin,
  error,
  binScanned,
  onSKUChange,
  onBinChange,
  onSKUSubmit,
  onBinSubmit
}: SortationScreenProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-6">
          <StatusDisplay status={status} step={step} />

          <div className="space-y-6">
            <div className={step === 'bin' ? 'opacity-50' : ''}>
              <ScanInput
                type="sku"
                value={currentSKU}
                onChange={(e) => onSKUChange(e.target.value.toUpperCase())}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSKUSubmit(currentSKU);
                  }
                }}
                disabled={step === 'bin'}
                autoFocus={step === 'item'}
              />
            </div>

            {step === 'bin' && (
              <ScanInput
                type="bin"
                value={currentBin}
                onChange={(e) => onBinChange(e.target.value.toUpperCase())}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onBinSubmit(currentBin);
                  }
                }}
                autoFocus
              />
            )}

            <StatusAlert
              status={status}
              destinationBin={destinationBin}
              error={error}
              binScanned={binScanned}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}