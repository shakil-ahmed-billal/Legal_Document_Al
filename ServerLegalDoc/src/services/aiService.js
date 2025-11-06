import useAxiosPublic from "@/hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();


class ApiError extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode || 500;
    this.details = details || null;
  }
}


export async function queryLegalDocuments(query) {
  try {
    if (!query || query.trim() === "") {
      throw new ApiError("Query text cannot be empty", 400);
    }

    const response = await axiosPublic.post(`/generate`, { query });

    if (response.status !== 200) {
      throw new ApiError(
        "Failed to fetch legal documents",
        response.status,
        response.data?.message
      );
    }

    const data = response.data;

    // Handle unsuccessful API responses
    if (!data.success) {
      throw new ApiError(
        data.message || "Query was not successful",
        response.status,
        data
      );
    }

    console.log("Legal Document Response:", data);
    return data;
  } catch (error) {
    console.error("Error in queryLegalDocuments:", error);

    if (error.response) {
      throw new ApiError(
        error.response.data?.message || "Server responded with an error",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      throw new ApiError(
        "No response received from the server",
        503,
        "Please check your network or server connection."
      );
    } else if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(
        error.message || "Unexpected error occurred",
        500,
        error.stack
      );
    }
  }
}


export async function checkHealth() {
  try {
    const response = await axiosPublic.get(`/health`);

    if (response.status === 200) {
      console.log("Server Health:", response.data);
      return response.data;
    }

    throw new ApiError(
      "Server health check failed",
      response.status,
      response.data
    );
  } catch (error) {
    console.error("Health Check Failed:", error);

    if (error.response) {
      throw new ApiError(
        "Health endpoint returned an error",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      throw new ApiError(
        "No response from the server",
        503,
        "Please ensure the backend is running."
      );
    } else {
      throw new ApiError("Unknown error occurred during health check", 500);
    }
  }
}
