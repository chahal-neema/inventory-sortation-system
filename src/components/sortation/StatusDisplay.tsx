interface StatusDisplayProps {
  status: SortationStatus;
  step: 'item' | 'bin';
}

export function StatusDisplay({ status, step }: StatusDisplayProps) {
  return (
    <div className="text-2xl md:text-4xl font-bold text-center p-4 md:p-6 border-b bg-gray-50 mb-4 md:mb-6 flex-shrink-0">
      {status === 'ready' && 'SCAN ITEM'}
      {status === 'waiting' && 'SCAN EMPTY BIN'}
      {status === 'success' && step === 'bin' && 'SCAN DESTINATION'}
      {status === 'error' && '⚠️ ERROR ⚠️'}
    </div>
  );
}