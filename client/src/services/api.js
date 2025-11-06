import useAxiosPublic from "@/hooks/useAxiosPublic";


const axiosPublic = useAxiosPublic();

class ApiError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export async function queryLegalDocuments(query) {
  try {
    const response = await axiosPublic.post(`/generate`, { query });
    const data = response.data;
    // write error handle code
    console.log(data)
    return data;
  } catch (error) {
    //write error handle code
  }
}

export async function checkHealth() {
  try {
    const response = await axiosPublic.get('/health');
    return response.data
  } catch {
    return false;
  }
}
