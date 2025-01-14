export type OperationStatus = 'ready' | 'waiting' | 'success' | 'error';
export type SortationStep = 'order' | 'item' | 'bin';
export type BinStatus = 'empty' | 'full' | 'partial';
export type OrderStatus = 'open' | 'closed';

export interface Operation {
  timestamp: string;
  operation_type: 'sku_scan' | 'putaway' | 'new_assignment' | 'order_start' | 'order_close';
  sku: string;
  destination_bin?: string;
  status: 'success' | 'error' | 'new_assignment_needed';
  error_code?: string;
  operator_id: string;
  station_id: string;
  order_id?: string;
}

export interface SortationError {
  message: string;
  details: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: Map<string, boolean>; // SKU -> sorted status
  created_at: string;
  closed_at?: string;
}