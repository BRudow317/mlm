import { useState } from 'react';

// Hook: API Manager (GET/POST/PUT/DELETE)
export const useApi = (baseUrl = '') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body: body ? JSON.stringify(body) : null,
      };
      const response = await fetch(`${baseUrl}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'API Error');
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    get: (endpoint) => request(endpoint, 'GET'),
    post: (endpoint, body) => request(endpoint, 'POST', body),
    put: (endpoint, body) => request(endpoint, 'PUT', body),
    del: (endpoint) => request(endpoint, 'DELETE'),
    loading,
    error,
  };
};
