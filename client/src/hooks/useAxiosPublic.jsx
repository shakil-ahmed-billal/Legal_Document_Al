import axios from 'axios';

// Axios instance setup
const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_LIVE_API_URL,
  withCredentials: true,
});

// Custom hook for axiosPublic
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
