import { Search } from 'lucide-react';



export function SearchBar({ query, onQueryChange, onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Ask a question about legal documents (e.g., 'What are the termination clauses?')"
          className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-black"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}
