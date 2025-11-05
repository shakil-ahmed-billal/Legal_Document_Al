import mongoose from 'mongoose';

// Define the document schema for MongoDB using Mongoose
const legalDocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: 'legal_documents', // specify the collection name
  }
);

// Create the model for the document
const LegalDocument = mongoose.model('LegalDocument', legalDocumentSchema);

class Document {
  // Fetch all documents from the database
  static async getAllDocuments() {
    try {
      const documents = await LegalDocument.find().sort({ created_at: -1 }); // sort by created_at descending
      return documents || [];
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  // Fetch a document by its ID
  static async getDocumentById(id) {
    try {
      const document = await LegalDocument.findById(id); // find document by ID
      return document;
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  // Create a new document in the database
  static async createDocument(title, content, category) {
    try {
      const document = new LegalDocument({
        title,
        content,
        category,
      });

      const savedDocument = await document.save(); // save the document to the database
      return savedDocument;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Search documents by keywords (case-insensitive search in title and content)
  static async searchDocuments(query) {
    try {
      const queryLower = query.toLowerCase();
      const keywords = queryLower.split(' ').filter(word => word.length > 3);

      const documents = await LegalDocument.find({
        $or: keywords.map(keyword => ({
          $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { content: { $regex: keyword, $options: 'i' } },
          ],
        })),
      }).sort({ created_at: -1 }); // sort by created_at descending

      return documents || [];
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }
}

export default Document;
