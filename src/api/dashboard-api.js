import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/comments";

const fetchDashboardApi = async (page, limit, searchQuery) => {
  console.log(page, limit);
  try {
    let apiUrl = `${URL}?page=${page}&_limit=${limit}`;

    if (searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery.trim());

      if (/^\d+$/.test(searchQuery.trim())) {
        // Check if searchQuery is a number (ID)
        apiUrl += `&id=${encodedQuery}`;
      } else if (/^\S+@\S+\.\S+$/.test(searchQuery.trim())) {
        // Check if searchQuery is an email format
        apiUrl += `&email=${encodedQuery}`;
      } else {
        // For non-email, non-ID search, include searchQuery in name and body fields
        apiUrl += `&q=${encodedQuery}`;
      }
    }
    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    return error;
  }
};

export default fetchDashboardApi;
