import axios from 'axios';

// Axios instance setup
const axiosPublic = axios.create({
  baseURL: process.env. NEXT_PUBLIC_API_URL || 'https://server-legal-doc.vercel.app',  
  withCredentials: true,                     
});

// Custom hook for axiosPublic
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
