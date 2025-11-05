import Document from '../models/Document.js';
import AIService from './aiService.js';
import Query from '../models/Query.js';

class DocumentService {
  static async processQuery(queryText) {
    if (!queryText || queryText.trim().length === 0) {
      throw new Error('Query cannot be empty');
    }

    const documents = await Document.searchDocuments(queryText);

    if (documents.length === 0) {
      const allDocs = await Document.getAllDocuments();
      documents.push(...allDocs.slice(0, 2));
    }

    const answer = await AIService.generateResponse(queryText, documents);
    const sourceDocuments = documents.map((doc) => doc.title);

    await Query.logQuery(queryText, answer, sourceDocuments);

    return {
      answer,
      source_documents: sourceDocuments,
      success: true,
      message: 'Query processed successfully',
    };
  }

  static async getAllDocuments() {
    return await Document.getAllDocuments();
  }

  static async getDocumentById(id) {
    return await Document.getDocumentById(id);
  }

  static async createDocument(title, content, category) {
    return await Document.createDocument(title, content, category);
  }

  static async initializeMockDocuments() {
    const existingDocs = await Document.getAllDocuments();

    if (existingDocs.length === 0) {
      const mockDocuments = [
        {
          title: 'Software License Agreement',
          content: `
        This Software License Agreement ("Agreement") is entered into as of January 1, 2024.

        1. GRANT OF LICENSE: Licensor grants Licensee a non-exclusive, non-transferable license to use the software.

        2. RESTRICTIONS: Licensee shall not: (a) reverse engineer, decompile, or disassemble the software;
        (b) rent, lease, or lend the software; (c) transfer the software to any third party.

        3. TERMINATION: This Agreement may be terminated by either party with 30 days written notice.
        Upon termination, Licensee must destroy all copies of the software.

        4. WARRANTY DISCLAIMER: The software is provided "AS IS" without warranty of any kind,
        either express or implied, including but not limited to warranties of merchantability.

        5. LIMITATION OF LIABILITY: In no event shall Licensor be liable for any damages exceeding
        the amount paid by Licensee for the software.

        6. GOVERNING LAW: This Agreement shall be governed by the laws of California, USA.
        `,
          category: 'Software License',
        },
        {
          title: 'Employment Contract',
          content: `
        EMPLOYMENT AGREEMENT dated March 15, 2024, between XYZ Corporation ("Employer") and John Doe ("Employee").

        1. POSITION: Employee shall serve as Senior Software Engineer, reporting to the CTO.

        2. COMPENSATION: Employee shall receive an annual salary of $120,000, payable bi-weekly.

        3. BENEFITS: Employee is entitled to: (a) health insurance coverage; (b) 15 days paid vacation;
        (c) 401(k) retirement plan with 5% employer matching.

        4. CONFIDENTIALITY: Employee agrees to maintain confidentiality of all proprietary information
        and trade secrets during and after employment.

        5. NON-COMPETE: For 12 months following termination, Employee shall not engage in competing
        business activities within 50 miles of Employer's location.

        6. TERMINATION: Either party may terminate this agreement with 2 weeks notice. Employer may
        terminate immediately for cause, including misconduct or breach of agreement.

        7. INTELLECTUAL PROPERTY: All work product created during employment shall be the exclusive
        property of Employer.
        `,
          category: 'Employment',
        },
        {
          title: 'Terms of Service Agreement',
          content: `
        TERMS OF SERVICE - Last Updated: June 1, 2024

        1. ACCEPTANCE OF TERMS: By accessing this website, you agree to be bound by these Terms of Service.

        2. USER ACCOUNTS: Users must: (a) provide accurate information; (b) maintain account security;
        (c) be at least 18 years old; (d) not share login credentials.

        3. ACCEPTABLE USE: Users shall not: (a) violate any laws; (b) infringe on intellectual property;
        (c) transmit malware or harmful code; (d) harass other users; (e) attempt unauthorized access.

        4. CONTENT OWNERSHIP: Users retain ownership of their content but grant us a worldwide,
        royalty-free license to use, display, and distribute such content.

        5. DATA PRIVACY: We collect and process personal data according to our Privacy Policy.
        Users have rights to access, modify, and delete their data.

        6. REFUND POLICY: Subscription fees are non-refundable except as required by law.
        Users may cancel subscriptions at any time.

        7. DISPUTE RESOLUTION: Disputes shall be resolved through binding arbitration in accordance
        with the rules of the American Arbitration Association.

        8. MODIFICATIONS: We reserve the right to modify these terms with 30 days notice to users.
        `,
          category: 'Terms of Service',
        },
      ];

      for (const doc of mockDocuments) {
        await Document.createDocument(doc.title, doc.content, doc.category);
      }

      console.log('Mock documents initialized');
    }
  }
}

export default DocumentService;
