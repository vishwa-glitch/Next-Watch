// API Service for NextWatch - No Authentication Required
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  // Generic method to make API requests
  async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Discover content
  async discover(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.makeRequest(`/discover/?${queryString}`);
  }

  // Search for movies/TV shows
  async search(query, params = {}) {
    const searchParams = {
      q: query,
      ...params
    };
    const queryString = new URLSearchParams(searchParams).toString();
    return this.makeRequest(`/search/?${queryString}`);
  }

  // Get trending content
  async getTrending(mediaType = 'all', timeWindow = 'week') {
    return this.makeRequest(`/trending/?media_type=${mediaType}&time_window=${timeWindow}`);
  }

  // Get movie details
  async getMovieDetails(movieId) {
    return this.makeRequest(`/movies/${movieId}/`);
  }

  // Get TV show details
  async getTVShowDetails(tvId) {
    return this.makeRequest(`/tv/${tvId}/`);
  }

  // Get person details
  async getPersonDetails(personId) {
    return this.makeRequest(`/person/${personId}/`);
  }

  // Get recommendations based on preferences
  async getRecommendations(preferences) {
    return this.makeRequest('/recommendations/', {
      method: 'POST',
      body: JSON.stringify(preferences)
    });
  }

  // Get content by genre
  async getByGenre(genre, mediaType = 'movie', page = 1) {
    return this.makeRequest(`/discover/?genre=${genre}&media_type=${mediaType}&page=${page}`);
  }

  // Get content by platform/provider
  async getByPlatform(platform, mediaType = 'movie') {
    return this.makeRequest(`/discover/?platform=${platform}&media_type=${mediaType}`);
  }

  // Get similar content
  async getSimilar(mediaType, id) {
    return this.makeRequest(`/${mediaType}/${id}/similar/`);
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
