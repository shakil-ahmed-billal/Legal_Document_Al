'use client';

import DocumentManager from '@/components/DocumentManager';
import { ErrorMessage } from '@/components/ErrorMessage';
import Header from '@/components/Header';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ResponseDisplay } from '@/components/ResponseDisplay';
import { SearchBar } from '@/components/SearchBar';
import { queryLegalDocuments } from '@/services/api';
import { useState } from 'react';


function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await queryLegalDocuments(query);
      if (result) {
        setResponse({
          answer: result.answer,
          sourceDocuments: result.source_documents,
        });
        setQuery('');
      }
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
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onShowDocuments={() => setShowDocumentManager(true)} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find Legal Information Instantly
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through legal documents with AI-powered analysis. Get relevant information and document summaries in seconds.
          </p>
        </div>

        <div className="">
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
        </div>
        {!response && !isLoading && (
          <div className="">
            <div className="max-w-7xl mx-auto mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="text-3xl mb-3">📄</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Search Documents</h3>
                  <p className="text-gray-600 text-sm">
                    Enter your query to search through legal documents and find relevant information.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Get AI-powered summaries and insights from complex legal documents.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="text-3xl mb-3">⚡</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Instant Results</h3>
                  <p className="text-gray-600 text-sm">
                    Receive relevant document sections and summaries in real-time.
                  </p>
                </div>
              </div>
            </div>
             <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8 mt-5">
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
          </div>
        )}
      </main>

      <DocumentManager
        isOpen={showDocumentManager}
        onClose={() => setShowDocumentManager(false)}
      />
    </div>
  );
}

export default Home;
