import { AlertCircle } from 'lucide-react';


export function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="w-full max-w-4xl bg-red-50 border-2 border-red-200 rounded-lg shadow-lg p-6 animate-fadeIn">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-1">Error</h3>
          <p className="text-red-700">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 font-semibold"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
