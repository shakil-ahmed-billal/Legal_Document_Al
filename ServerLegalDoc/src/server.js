import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import documentRoutes from './routes/documentRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import DocumentService from './services/documentService.js';
import DBconnect from './config/database.js';
import morgan from 'morgan';

dotenv.config();
DBconnect();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://legal-document-al-4gaq.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.json({
    message: 'Legal Document Search API',
    version: '1.0.0',
    endpoints: {
      'POST /generate': 'Query legal documents',
      'GET /documents': 'Get all documents',
      'GET /documents/:id': 'Get specific document',
      'POST /documents': 'Create new document',
      'GET /health': 'Health check',
    },
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'legal-document-search-api',
    timestamp: new Date().toISOString(),
  });
});

app.use('/', documentRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await DocumentService.initializeMockDocuments();
  } catch (error) {
    console.error('Error initializing mock documents:', error);
  }
});
