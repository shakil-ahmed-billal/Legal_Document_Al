import { FileText, CheckCircle } from 'lucide-react';



export function ResponseDisplay({ answer, sourceDocuments }) {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
      <div className="flex items-center gap-2 mb-4 text-green-600">
        <CheckCircle size={24} />
        <h2 className="text-xl font-semibold">Response</h2>
      </div>

      <div className="prose max-w-none mb-6">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{answer}</p>
      </div>

      {sourceDocuments.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={18} className="text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-700">Source Documents:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {sourceDocuments.map((doc, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {doc}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
