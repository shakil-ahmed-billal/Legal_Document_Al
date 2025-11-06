import { Scale, Database } from 'lucide-react';

export default function Header({ onShowDocuments }) {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Scale className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Legal Document Search</h1>
              <p className="text-slate-300 text-sm">AI-Powered Legal Research Assistant</p>
            </div>
          </div>
          <button
            onClick={onShowDocuments}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            <Database className="w-5 h-5" />
            <span>Manage Documents</span>
          </button>
        </div>
      </div>
    </header>
  );
}