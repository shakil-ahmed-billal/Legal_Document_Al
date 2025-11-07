import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const client = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

class AIService {
  static async generateResponse(query, documents) {
    if (!client) {
      return this.generateFallbackResponse(query, documents);
    }

    try {
      const context = documents
        .map((doc) => `Document: ${doc.title}\nContent: ${doc.content}`)
        .join('\n\n');

      const prompt = `You are a legal document assistant. Based on the following legal documents, answer the user's query concisely and accurately. Cite specific sections when relevant.

Legal Documents:
${context}

User Query: ${query}

Provide a clear, professional response referencing the relevant document sections.`;

      const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful legal document assistant.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('AI generation error:', error);
      return this.generateFallbackResponse(query, documents);
    }
  }

  static generateFallbackResponse(query, documents) {
    const queryLower = query.toLowerCase();
    const responses = [];

    for (const doc of documents) {
      const docLines = doc.content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      for (let i = 0; i < docLines.length; i++) {
        const line = docLines[i];
        const lineLower = line.toLowerCase();
        const queryWords = queryLower
          .split(' ')
          .filter((word) => word.length > 3);

        if (queryWords.some((word) => lineLower.includes(word))) {
          const contextStart = Math.max(0, i - 1);
          const contextEnd = Math.min(docLines.length, i + 3);
          const context = docLines.slice(contextStart, contextEnd).join('\n');

          responses.push(`From '${doc.title}':\n${context}`);
          break;
        }
      }
    }

    if (responses.length > 0) {
      return `Based on the relevant legal documents:\n\n${responses.join('\n\n')}`;
    }

    return `I found the following documents that may be relevant to your query about "${query}":\n\n${documents
      .map((doc) => `- ${doc.title}`)
      .join('\n')}\n\nFor specific information, please rephrase your query with more details about what you'd like to know.`;
  }
}

export default AIService;
