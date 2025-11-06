# Legal Document Search Portal

An AI-powered legal document search portal that allows users to query legal documents using natural language. Built with Node.js/Express backend (MVC pattern), MongoDB database, and React or Next.js frontend.

## Features

- Natural language query processing for legal documents
- AI-powered response generation using OpenAI GPT models
- Clean, responsive UI with loading states and error handling
- Mock legal documents stored in MongoDB (Software License Agreement, Employment Contract, Terms of Service)
- RESTful API with proper error handling
- MVC architecture for scalable backend
- MongoDB integration for data persistence
- Vercel for deployment
- Query logging and analytics

## Technology Stack

### Frontend
- React 18.3
- Next.js
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### Backend
- Node.js 20+
- Express.js
- MongoDB (Mongoose)
- OpenAI API (GPT-3.5-turbo)
- MVC Architecture

### Database
- MongoDB (Mongoose)
- Full-text search support
- Row-level security (RLS)

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # MongoDB configuration
│   │   ├── models/
│   │   │   ├── Document.js           # Legal documents model
│   │   │   └── Query.js              # Query logs model
│   │   ├── controllers/
│   │   │   └── documentController.js # Request handlers
│   │   ├── services/
│   │   │   ├── documentService.js    # Business logic
│   │   │   └── aiService.js          # AI integration
│   │   ├── middleware/
│   │   │   └── errorHandler.js       # Error handling
│   │   ├── routes/
│   │   │   └── documentRoutes.js     # API routes
│   │   └── server.js                 # Express app & server setup
│   ├── package.json
│   ├── .env.example
│  
├── src/
│   ├── components/                   # React components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ResponseDisplay.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── services/
│   │   └── api.ts                    # API integration layer
│   ├── App.tsx                       # Main application component
│   └── main.tsx                      # Application entry point
└── README.md                         # This file
```

## Prerequisites

- Node.js 20+ (for local development)
- Vercel CLI (for deployment)
- MongoDB account (for database)
- OpenAI API key (optional - fallback responses work without it)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/shakil-ahmed-billal/Legal_Document_Al.git
   cd legal-document-search
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your MongoDB and OpenAI credentials:
   ```
   MONGO_URI=your_mongodb_uri_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Verify environment variables**
   ```bash
   cat .env
   ```

4. **Access the application**
   - Frontend: https://legal-document-al-4gaq.vercel.app
   - Backend API: https://server-legal-doc.vercel.app/
   - Health Check: https://server-legal-doc.vercel.app/health

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment file**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your MongoDB and OpenAI credentials

4. **Run the backend**
   ```bash
   npm run dev
   ```

   Backend will start on http://localhost:8000

#### Frontend Setup

1. **Navigate to project root**
   ```bash
   cd ..
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

   Set `VITE_API_URL=http://localhost:8000`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## MVC Architecture

The backend follows the Model-View-Controller (MVC) pattern for clean code organization:

### Models (`src/models/`)
- **Document.js** - Handles all database operations for legal documents
  - `getAllDocuments()` - Fetch all documents
  - `getDocumentById(id)` - Fetch specific document
  - `createDocument(title, content, category)` - Create new document
  - `searchDocuments(query)` - Search documents by query
  - `deleteDocument(id)` - Delete specific document

- **Query.js** - Manages query logs
  - `logQuery(queryText, response, sourceDocuments)` - Store query records
  - `getQueryHistory(limit)` - Fetch query history

### Services (`src/services/`)
- **documentService.js** - Business logic layer
  - `processQuery(queryText)` - Main query processing
  - `getAllDocuments()` - Retrieve documents
  - `initializeMockDocuments()` - Initialize database with sample data

- **aiService.js** - AI integration
  - `generateResponse(query, documents)` - Generate AI responses
  - `generateFallbackResponse()` - Fallback when AI unavailable

### Controllers (`src/controllers/`)
- **documentController.js** - Request handlers
  - `generateResponse()` - Handle query requests
  - `getAllDocuments()` - List all documents
  - `getDocumentById()` - Get specific document
  - `createDocument()` - Create new document
  - `deleteDocument()` - Delete specific document

### Routes (`src/routes/`)
- **documentRoutes.js** - API endpoint definitions

## API Endpoints

### POST /generate
Query legal documents with natural language

**Request Body:**
```json
{
  "query": "What are the termination clauses?"
}
```

**Response:**
```json
{
  "answer": "Based on the relevant legal documents...",
  "source_documents": ["Employment Contract", "Software License Agreement"],
  "success": true,
  "message": "Query processed successfully"
}
```

### GET /documents
Get all legal documents

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Software License Agreement",
      "content": "...",
      "category": "Software License",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET /documents/:id
Get specific document by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Software License Agreement",
    "content": "...",
    "category": "Software License",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### POST /documents
Create a new legal document

**Request Body:**
```json
{
  "title": "New Agreement",
  "content": "Agreement content...",
  "category": "General"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Document created successfully"
}
```

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "service": "legal-document-search-api",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### DELETE /documents/:id
Delete a legal document by ID

**Response:**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}

## Database Schema

### legal_documents table
- `id` (UUID) - Primary key
- `title` (TEXT UNIQUE) - Document title
- `content` (TEXT) - Full document content
- `category` (TEXT) - Document category
- `created_at` (TIMESTAMPTZ) - Creation timestamp
- `updated_at` (TIMESTAMPTZ) - Last update timestamp

### query_logs table
- `id` (UUID) - Primary key
- `query_text` (TEXT) - User query
- `response` (TEXT) - AI response
- `source_documents` (TEXT[]) - Referenced documents
- `created_at` (TIMESTAMPTZ) - Log timestamp

## Usage

1. Open the application in your browser
2. Enter a natural language query in the search box (e.g., "What are the payment terms?")
3. Press Enter or click the search button
4. View the AI-generated response with source document references

### Example Queries

- "What are the termination clauses in the employment contract?"
- "What warranty information is provided in the software license?"
- "What are the payment terms and refund policies?"
- "What restrictions apply to software usage?"
- "Tell me about confidentiality requirements"
- "What are the employee benefits?"

## Mock Legal Documents

The system initializes with three legal documents:

1. **Software License Agreement** - Covers licensing terms, restrictions, termination, warranties, and liability limitations
2. **Employment Contract** - Details position, compensation, benefits, confidentiality, non-compete, and termination clauses
3. **Terms of Service Agreement** - Outlines user accounts, acceptable use, content ownership, privacy, and dispute resolution

These documents are automatically populated in MongoDB on first run.

## AI Integration

The application uses OpenAI's GPT-3.5-turbo model for generating responses. Key features:

- Contextual understanding of legal terminology
- Citation of relevant document sections
- Fallback to keyword-based search if OpenAI API is unavailable
- Error handling for API failures

**AI Tools Used:**
- OpenAI GPT-3.5-turbo for text generation and query understanding
- Source: https://platform.openai.com/

## Error Handling

The application includes comprehensive error handling:

- Network connectivity errors
- API failures
- Invalid queries
- Missing environment variables
- Database connection errors
- User-friendly error messages

Error handling is implemented at multiple layers:
- Middleware error handler in Express
- Service layer error catching
- Controller-level try-catch blocks
- Frontend error boundary and display components

## Building for Production

### Frontend
```bash
npm run build
```

### Backend
No build step needed. Ensure dependencies are installed:
```bash
cd backend && npm install
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)

### Backend (.env)
- `PORT` - Server port (default: 8000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URL` - MongoDB connection string
- `OPENAI_API_KEY` - OpenAI API key (optional)

## Testing

The application can be tested by:

1. Running the health check:
   ```bash
   curl http://localhost:8000/health
   ```

2. Testing the API directly:
   ```bash
   curl -X POST http://localhost:8000/generate \
     -H "Content-Type: application/json" \
     -d '{"query":"What are termination clauses?"}'
   ```

3. Fetching documents:
   ```bash
   curl http://localhost:8000/documents
   ```

## Troubleshooting

### Backend won't start
- Ensure Node.js 20+ is installed: `node --version`
- Check that all dependencies are installed: `npm install`
- Verify MongoDB credentials are correct in `.env`
- Ensure port 8000 is not in use

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check `.env` file has correct `VITE_API_URL`
- Verify CORS is enabled (it is by default)
- Check network connectivity


### Database connection errors
- Verify MongoDB credentials are correct
- Check MongoDB project is active
- Ensure database tables are created (migrations ran)
- Check MongoDB firewall rules allow your IP

### No AI responses
- Verify OpenAI API key is set correctly
- Check API key has sufficient credits
- The system will fall back to keyword-based search if AI is unavailable
- Check OpenAI API status: https://status.openai.com/

## Development Workflow

1. **Make changes** to frontend or backend code
2. **For frontend**: Changes auto-reload with Vite hot module replacement
3. **For backend**: Use `npm run dev` to auto-restart on file changes
4. **Test your changes** using the API endpoints
5. **Commit changes** with clear commit messages

## Performance Optimization

- Frontend: Built with Vite for fast development and optimized production builds
- Backend: Express.js for minimal overhead and fast request handling
- Database: Indexed columns for fast searches (title, content, category)
- Caching: Query results can be cached using standard HTTP caching headers
- Lazy loading: MongoDB queries are optimized to fetch only needed data

## Security Considerations

- Row-level security (RLS) enabled on all database tables
- CORS configured to allow frontend requests
- Error messages sanitized to not expose sensitive information
- Environment variables for all sensitive configuration
- Input validation on all API endpoints

## License

This project is for educational purposes as part of the FSD-AAI assignment.

## Acknowledgments

- OpenAI for GPT API
- Express.js framework
- MongoDB for database backend
- React and Next.js for frontend
- Tailwind CSS
- Lucide React icons

## Contact

For any questions or feedback, please reach out to [Shakil Ahmed Billal](https://github.com/shakil-ahmed-billal).


