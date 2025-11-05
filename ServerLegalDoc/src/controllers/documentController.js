import DocumentService from '../services/documentService.js';

class DocumentController {
  static async generateResponse(req, res) {
    try {
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Query is required',
        });
      }

      const result = await DocumentService.processQuery(query); // Process query with AI
      res.json(result);
    } catch (error) {
      console.error('Error in generateResponse:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request',
        detail: error.message,
      });
    }
  }

  static async getAllDocuments(req, res) {
    try {
      const documents = await DocumentService.getAllDocuments(); // Fetch all documents from DB
      res.json({
        success: true,
        data: documents,
      });
    } catch (error) {
      console.error('Error in getAllDocuments:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch documents',
        detail: error.message,
      });
    }
  }

  static async getDocumentById(req, res) {
    try {
      const { id } = req.params;
      const document = await DocumentService.getDocumentById(id); // Fetch document by ID

      if (!document) {
        return res.status(404).json({
          success: false,
          message: 'Document not found',
        });
      }

      res.json({
        success: true,
        data: document,
      });
    } catch (error) {
      console.error('Error in getDocumentById:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch document',
        detail: error.message,
      });
    }
  }

  static async createDocument(req, res) {
    try {
      const { title, content, category } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          success: false,
          message: 'Title and content are required',
        });
      }

      const document = await DocumentService.createDocument(
        title,
        content,
        category || 'General'
      ); // Create new document

      res.status(201).json({
        success: true,
        data: document,
        message: 'Document created successfully',
      });
    } catch (error) {
      console.error('Error in createDocument:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create document',
        detail: error.message,
      });
    }
  }
}

export default DocumentController;
