'use client';

import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { SearchBar } from '@/components/SearchBar';
import { queryLegalDocuments } from '@/services/api';
import { useState } from 'react';


function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await queryLegalDocuments(query);
      setResponse({
        answer: result.answer,
        sourceDocuments: result.source_documents,
      });
    } catch (err) {
      if (err) {
        setError(
          err.details
            ? `${err.message}: ${err.details}`
            : err.message
        );
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="">


      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center mb-4">
            <p className="text-gray-700 text-lg max-w-2xl">
              Search through legal documents using natural language queries.
              Ask questions about contracts, agreements, and policies.
            </p>
          </div>

          <SearchBar
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {isLoading && <LoadingSpinner />}

          {error && (
            <ErrorMessage message={error} onDismiss={handleDismissError} />
          )}

          {response && !isLoading && (
            <ResponseDisplay
              answer={response.answer}
              sourceDocuments={response.sourceDocuments}
            />
          )}

          {!response && !isLoading && !error && (
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Example Queries:
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>What are the termination clauses in the employment contract?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>What warranty information is provided in the software license?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>What are the payment terms and refund policies?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>What restrictions apply to software usage?</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
