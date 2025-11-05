// Define the API base URL from Vite's environment variables or fallback to localhost
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const API_BASE_URL = 'http://localhost:8000';

// API Error class to handle errors consistently
class ApiError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Function to query legal documents
export async function queryLegalDocuments(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to process your query';
      let errorDetails = '';

      try {
        const errorData = await response.json();
        errorDetails = errorData.detail || errorData.message || '';
      } catch {
        errorDetails = `Server returned status ${response.status}`;
      }

      throw new ApiError(errorMessage, response.status, errorDetails);
    }

    const data = await response.json();

    if (!data.success) {
      throw new ApiError('Query was not successful', undefined, data.message);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Unable to connect to the server',
        undefined,
        'Please ensure the backend service is running'
      );
    }

    throw new ApiError(
      'An unexpected error occurred',
      undefined,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Function to check server health
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
