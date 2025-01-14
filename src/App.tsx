import { Header } from '@/components/sortation/Header';
import { OrderEntry } from '@/components/sortation/OrderEntry';
import { OrderStatus } from '@/components/sortation/OrderStatus';
import { SortationScreen } from '@/components/sortation/SortationScreen';
import { OperationLog } from '@/components/sortation/OperationLog';
import { useSortationState } from '@/hooks/useSortationState';

export default function App() {
  const {
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
    setOrderId,
    handleOrderSubmit,
    handleCloseOrder,
    handleSKUSubmit,
    handleBinSubmit,
    setCurrentSKU,
    setCurrentBin,
    setError
  } = useSortationState();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-2 md:p-4 space-y-4">
        <Header />

        {currentOrder && (
          <OrderStatus
            order={currentOrder}
            onCloseOrder={handleCloseOrder}
          />
        )}

        {step === 'order' ? (
          <OrderEntry
            orderId={orderId}
            onOrderIdChange={setOrderId}
            onSubmit={handleOrderSubmit}
          />
        ) : (
          <SortationScreen
            step={step}
            status={status}
            currentSKU={currentSKU}
            currentBin={currentBin}
            destinationBin={destinationBin}
            error={error}
            binScanned={binScanned}
            onSKUChange={(value) => {
              setCurrentSKU(value);
              setError(null);
            }}
            onBinChange={(value) => {
              setCurrentBin(value);
              setError(null);
            }}
            onSKUSubmit={handleSKUSubmit}
            onBinSubmit={handleBinSubmit}
          />
        )}

        <OperationLog operations={operations} />
      </div>
    </div>
  );
}