import { useState } from 'react';
import type { Operation, SortationStep, OperationStatus, SortationError, Order } from '@/types/sortation';
import { validateInput, createOperation } from '@/lib/sortation';

interface Assignments {
  skuToBin: Map<string, string>;
  binToSku: Map<string, string>;
}

// Initialize with both mappings
const initialAssignments: Assignments = {
  skuToBin: new Map([
    ['ABC123', 'A01-123'],
    ['XYZ789', 'B02-456']
  ]),
  binToSku: new Map([
    ['A01-123', 'ABC123'],
    ['B02-456', 'XYZ789']
  ])
};

export function useSortationState() {
  // Core state
  const [step, setStep] = useState<SortationStep>('order');
  const [status, setStatus] = useState<OperationStatus>('ready');
  const [binScanned, setBinScanned] = useState(false);
  
  // Input state
  const [orderId, setOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [currentSKU, setCurrentSKU] = useState('');
  const [currentBin, setCurrentBin] = useState('');
  const [destinationBin, setDestinationBin] = useState<string | null>(null);
  
  // Error handling
  const [error, setError] = useState<SortationError | null>(null);
  
  // Database - using combined assignments state
  const [assignments, setAssignments] = useState<Assignments>(initialAssignments);
  const [operations, setOperations] = useState<Operation[]>([]);

  const clearError = () => {
    setError(null);
  };

  const logOperation = (operation: Operation) => {
    setOperations(prev => [operation, ...prev].slice(0, 10));
  };

  const resetState = () => {
    setCurrentOrder(null);
    setOrderId('');
    setCurrentSKU('');
    setCurrentBin('');
    setDestinationBin(null);
    setError(null);
    setStep('order');
    setStatus('ready');
    setBinScanned(false);
  };

  const handleOrderSubmit = () => {
    clearError();
    
    if (!validateInput(orderId)) {
      setError({ message: 'Invalid Input', details: 'Order number cannot be empty' });
      setStatus('error');
      return;
    }

    const newOrder: Order = {
      id: orderId,
      status: 'open',
      items: new Map(),
      created_at: new Date().toISOString()
    };

    setCurrentOrder(newOrder);
    setStep('item');
    setStatus('ready');
    logOperation({
      ...createOperation('order_start', '', 'success'),
      order_id: orderId
    });
  };

  const handleCloseOrder = () => {
    if (!currentOrder) return;

    logOperation({
      ...createOperation('order_close', '', 'success'),
      order_id: currentOrder.id
    });

    // Reset all state including assignments and operations
    resetState();
    setAssignments({ skuToBin: new Map(), binToSku: new Map() });
    setOperations([]);
  };

  const handleSKUSubmit = (input: string) => {
    clearError();
    
    if (!validateInput(input)) {
      setError({ message: 'Invalid Input', details: 'Input cannot be empty' });
      setStatus('error');
      return;
    }

    // Check existing assignment
    const assigned = assignments.skuToBin.get(input);
    if (assigned) {
      setDestinationBin(assigned);
      setStatus('success');
      setBinScanned(false);
      logOperation({
        ...createOperation('sku_scan', input, 'success', assigned),
        order_id: currentOrder?.id
      });
    } else {
      setDestinationBin(null);
      setStatus('waiting');
      setBinScanned(false);
      logOperation({
        ...createOperation('sku_scan', input, 'new_assignment_needed'),
        order_id: currentOrder?.id
      });
    }
    setStep('bin');
    setCurrentSKU(input);
  };

  const createNewAssignment = (sku: string, bin: string) => {
    setAssignments(prev => {
      // Create new maps to avoid mutation
      const newSkuToBin = new Map(prev.skuToBin);
      const newBinToSku = new Map(prev.binToSku);

      // Update both mappings
      newSkuToBin.set(sku, bin);
      newBinToSku.set(bin, sku);

      return {
        skuToBin: newSkuToBin,
        binToSku: newBinToSku
      };
    });
  };

  const handleBinSubmit = (binId: string) => {
    // Clear any previous error state first
    clearError();
    
    if (!validateInput(binId)) {
      setError({ message: 'Invalid Input', details: 'Input cannot be empty' });
      setStatus('error');
      return;
    }

    // For items that need a new bin assignment
    if (status === 'waiting') {
      // Check if bin is already assigned
      const existingSKU = assignments.binToSku.get(binId);
      if (existingSKU) {
        setError({ 
          message: 'Bin Already Assigned', 
          details: `This bin contains SKU: ${existingSKU}` 
        });
        setStatus('error');
        setCurrentBin(''); // Clear bin input for next attempt
        logOperation(createOperation('new_assignment', currentSKU, 'error', binId, 'bin_occupied'));
        return;
      }

      // Create new assignment
      createNewAssignment(currentSKU, binId);
      setDestinationBin(binId);
      setBinScanned(true);
      setStatus('success');
      logOperation(createOperation('new_assignment', currentSKU, 'success', binId));

      // Auto-reset after success
      setTimeout(() => {
        setCurrentSKU('');
        setCurrentBin('');
        setDestinationBin(null);
        setError(null);
        setStep('item');
        setStatus('ready');
        setBinScanned(false);
      }, 1000);
    } 
    // For items with existing bin assignments - including recovery from wrong bin
    else {
      if (binId !== destinationBin) {
        setError({ 
          message: 'Wrong Bin', 
          details: `Item belongs in bin ${destinationBin}` 
        });
        setStatus('error');
        setCurrentBin(''); // Clear bin input for next attempt
        logOperation(createOperation('putaway', currentSKU, 'error', binId, 'wrong_bin'));
        return;
      }
      
      // Correct bin scanned
      setBinScanned(true);
      setStatus('success');
      logOperation(createOperation('putaway', currentSKU, 'success', binId));

      // Auto-reset after success
      setTimeout(() => {
        setCurrentSKU('');
        setCurrentBin('');
        setDestinationBin(null);
        setError(null);
        setStep('item');
        setStatus('ready');
        setBinScanned(false);
      }, 1000);
    }
  };

  return {
    // State
    step,
    status,
    binScanned,
    orderId,
    currentOrder,
    currentSKU,
    currentBin,
    destinationBin,
    error,
    operations,

    // Actions
    setOrderId,
    handleOrderSubmit,
    handleCloseOrder,
    handleSKUSubmit,
    handleBinSubmit,
    setCurrentSKU,
    setCurrentBin,
    clearError,
    setError
  };
}