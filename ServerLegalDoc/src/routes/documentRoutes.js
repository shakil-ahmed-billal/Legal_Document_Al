import express from 'express';
import DocumentController from '../controllers/documentController.js';

const router = express.Router();

router.post('/generate', DocumentController.generateResponse);
router.get('/documents', DocumentController.getAllDocuments);
router.get('/documents/:id', DocumentController.getDocumentById);
router.post('/documents', DocumentController.createDocument);
router.delete('/documents/:id', DocumentController.deleteDocument);

export default router;
