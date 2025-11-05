import mongoose from 'mongoose';

// Define the schema for query logs in MongoDB
const queryLogSchema = new mongoose.Schema(
  {
    query_text: { type: String, required: true },
    response: { type: String, required: true },
    source_documents: { type: [String], required: true }, // array of document IDs or titles
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: 'query_logs', // specify the collection name
  }
);

// Create the model for query logs
const QueryLog = mongoose.model('QueryLog', queryLogSchema);

class Query {
  // Log a new query in the database
  static async logQuery(queryText, response, sourceDocuments) {
    try {
      const queryLog = new QueryLog({
        query_text: queryText,
        response,
        source_documents: sourceDocuments,
      });

      const savedQueryLog = await queryLog.save(); // save the log in the database
      return savedQueryLog;
    } catch (error) {
      console.error('Error logging query:', error);
      throw error;
    }
  }

  // Get the query history with a limit (default: 50)
  static async getQueryHistory(limit = 50) {
    try {
      const queryLogs = await QueryLog.find()
        .sort({ created_at: -1 }) // sort by created_at in descending order
        .limit(limit); // limit the number of logs returned

      return queryLogs || [];
    } catch (error) {
      console.error('Error fetching query history:', error);
      throw error;
    }
  }
}

export default Query;
