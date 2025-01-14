import { Operation } from '@/types/sortation';

export const validateInput = (input: string): boolean => {
  return Boolean(input && input.trim().length > 0);
};

export const createOperation = (
  operationType: Operation['operation_type'],
  sku: string,
  status: Operation['status'],
  destinationBin?: string,
  errorCode?: string
): Operation => ({
  timestamp: new Date().toISOString(),
  operation_type: operationType,
  sku,
  destination_bin: destinationBin,
  status,
  error_code: errorCode,
  operator_id: 'OP001', // In a real app, this would come from auth context
  station_id: 'SORT-01' // In a real app, this would be configured per station
});