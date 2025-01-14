import { Package } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Package className="w-5 h-5 md:w-6 md:h-6" />
      <h1 className="text-lg md:text-xl font-semibold">Sortation System</h1>
    </div>
  );
}