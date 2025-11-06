import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col items-center justify-center gap-4 max-w-7xl">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-gray-600 text-lg">Processing your query...</p>
      </div>
    </div>
  );
}
