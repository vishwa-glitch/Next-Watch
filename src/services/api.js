// API Service for NextWatch - No Authentication Required
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const DISABLE_API = import.meta.env.VITE_DISABLE_API === 'true';
const DEBUG_MODE = import.meta.env.VITE_DEBUG === 'true' || import.meta.env.DEV;

// Ensure we always use HTTP for local development
const ensureHttpProtocol = (url) => {
  if (url.startsWith('https://127.0.0.1') || url.startsWith('https://localhost')) {
    return url.replace('https://', 'http://');
  }
  return url;
};

const FINAL_API_URL = ensureHttpProtocol(API_BASE_URL);

// Debug logging (only in development or when explicitly enabled)
if (DEBUG_MODE) {
  console.log('API Configuration:', {
    'Environment VITE_API_URL': import.meta.env.VITE_API_URL,
    'Default API_BASE_URL': API_BASE_URL,
    'Final API URL': FINAL_API_URL,
    'API Disabled': DISABLE_API
  });
}

class ApiService {
  // Generic method to make API requests
  async makeRequest(endpoint, options = {}) {
    // Skip API calls if disabled in environment
    if (DISABLE_API) {
      console.log('API calls disabled - skipping request to:', endpoint);
      throw new Error('API calls disabled for development');
    }

    const fullUrl = `${FINAL_API_URL}${endpoint}`;
    if (DEBUG_MODE) console.log('🌐 Making API request to:', fullUrl);
    
    // Log request details for debugging
    if (DEBUG_MODE && options.method === 'POST' && options.body) {
      console.log('📤 Request method:', options.method);
      console.log('📤 Request body:', options.body);
      console.log('📤 Request headers:', {
        'Content-Type': 'application/json',
        ...options.headers
      });
    }
    
    try {
      // Add a timeout to fail faster if backend is not available
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        signal: controller.signal,
        mode: 'cors', // Explicitly set CORS mode
        ...options
      });

      clearTimeout(timeoutId);

      if (DEBUG_MODE) console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (DEBUG_MODE) console.log('📥 Response data keys:', Object.keys(data));
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('⏰ API request timed out - backend may not be running');
      } else {
        console.warn('❌ API request failed:', error.message);
      }
      throw error;
    }
  }

  // Transform backend data to frontend format
  transformMediaItem(item) {
    if (!item) return null;
    
    // Handle image URL properly
    let imageUrl = 'https://picsum.photos/400/600'; // Default fallback
    if (item.poster_url) {
      imageUrl = item.poster_url;
    } else if (item.poster_path) {
      // If it's a relative path, prefix with TMDB base URL
      imageUrl = item.poster_path.startsWith('http') 
        ? item.poster_path 
        : `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    }
    
    return {
      id: item.id,
      title: item.title || item.name,
      type: item.media_type === 'tv' ? 'series' : (item.media_type || 'movie'),
      year: item.release_date ? new Date(item.release_date).getFullYear() : 
            (item.first_air_date ? new Date(item.first_air_date).getFullYear() : null),
      duration: item.runtime ? `${item.runtime} min` : 
                (item.episode_run_time && item.episode_run_time[0] ? `${item.episode_run_time[0]} min/ep` : 'N/A'),
      rating: item.vote_average || 0,
      genres: item.genres ? item.genres.map(g => g.name) : (item.genre_names || []),
      platform: 'multiple', // Backend doesn't specify single platform
      image: imageUrl,
      description: item.overview || 'No description available.'
    };
  }

  // Discover content with proper backend parameters
  async discover(params = {}) {
    try {
      const backendParams = {
        type: params.type || 'movie',
        page: params.page || 1,
        language: params.language || 'en-US',
        sort_by: params.sort_by || 'popularity.desc'
      };

      // Add optional parameters only if they exist
      if (params.genres) backendParams.with_genres = params.genres;
      if (params.providers) backendParams.with_watch_providers = params.providers;
      if (params.region) backendParams.watch_region = params.region;
      if (params.year) backendParams.year = params.year;
      if (params.release_date_gte) backendParams.release_date_gte = params.release_date_gte;
      if (params.release_date_lte) backendParams.release_date_lte = params.release_date_lte;
      if (params.runtime_min) backendParams.with_runtime_gte = params.runtime_min;
      if (params.runtime_max) backendParams.with_runtime_lte = params.runtime_max;
      if (params.rating_min) backendParams.vote_average_gte = params.rating_min;
      
      const queryString = new URLSearchParams(backendParams).toString();
      const data = await this.makeRequest(`/discover/?${queryString}`);
      
      return {
        ...data,
        results: data.results ? data.results.map(item => this.transformMediaItem(item)).filter(Boolean) : []
      };
    } catch (error) {
      console.error('Discover request failed:', error);
      throw error;
    }
  }

  // Search for movies/TV shows with correct parameter
  async search(query, params = {}) {
    try {
      const searchParams = {
        query: query, // Correct parameter name
        type: params.type || 'multi',
        page: params.page || 1,
        language: params.language || 'en-US'
      };
      const queryString = new URLSearchParams(searchParams).toString();
      const data = await this.makeRequest(`/search/?${queryString}`);
      
      return {
        ...data,
        results: data.results ? data.results.map(item => this.transformMediaItem(item)).filter(Boolean) : []
      };
    } catch (error) {
      console.error('Search request failed:', error);
      throw error;
    }
  }

  // Get trending content with correct parameters
  async getTrending(mediaType = 'all', timeWindow = 'day', page = 1) {
    try {
      const params = new URLSearchParams({
        media_type: mediaType,
        time_window: timeWindow,
        page: page
      });
      const data = await this.makeRequest(`/trending/?${params}`);
      
      return {
        ...data,
        results: data.results ? data.results.map(item => this.transformMediaItem(item)).filter(Boolean) : []
      };
    } catch (error) {
      console.error('Trending request failed:', error);
      throw error;
    }
  }

  // Get movie details
  async getMovieDetails(movieId) {
    const data = await this.makeRequest(`/movies/${movieId}/`);
    return this.transformMediaItem(data);
  }

  // Get TV show details
  async getTVShowDetails(tvId) {
    const data = await this.makeRequest(`/tv/${tvId}/`);
    return this.transformMediaItem(data);
  }

  // Get person details
  async getPersonDetails(personId) {
    return this.makeRequest(`/person/${personId}/`);
  }

  // Get category content (popular, top_rated, etc.)
  async getMoviesByCategory(category = 'popular', page = 1) {
    const data = await this.makeRequest(`/movies/${category}/?page=${page}`);
    return {
      ...data,
      results: data.results.map(item => this.transformMediaItem(item))
    };
  }

  async getTVByCategory(category = 'popular', page = 1) {
    const data = await this.makeRequest(`/tv/${category}/?page=${page}`);
    return {
      ...data,
      results: data.results.map(item => this.transformMediaItem(item))
    };
  }

  // Get recommendations based on preferences using new backend API
  async getRecommendations(preferences = {}) {
    try {
      if (DEBUG_MODE) console.log('🎯 Frontend: getRecommendations called with preferences:', preferences);
      
      const requestBody = {
        preferences: {
          genres: preferences.genres || [],
          platforms: preferences.platforms || [],
          contentTypes: preferences.contentTypes || ['movies'],
          releaseYear: preferences.releaseYear || {
            min: 2000,
            max: new Date().getFullYear()
          },
          duration: preferences.duration || {
            min: 60,
            max: 180
          }
        },
        page: preferences.page || 1,
        raw: false
      };

      if (DEBUG_MODE) {
        console.log('📤 Frontend: Sending request body to backend:', JSON.stringify(requestBody, null, 2));
        console.log('🌐 Frontend: Making POST request to /recommendations endpoint');
      }

      const data = await this.makeRequest('/recommendations', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });
      
      if (DEBUG_MODE) {
        console.log('📥 Frontend: Received response from backend:', {
          totalResults: data.total_results,
          totalPages: data.total_pages,
          currentPage: data.page,
          resultsCount: data.results?.length,
          preferencesApplied: data.preferences_applied
        });
      }
      
      if (DEBUG_MODE && data.results && data.results.length > 0) {
        console.log('🎬 Frontend: Sample recommendations received:', 
          data.results.slice(0, 3).map(item => ({
            title: item.title,
            genres: item.genre_names,
            rating: item.vote_average
          }))
        );
      }
      
      return {
        ...data,
        results: data.results ? data.results.map(item => this.transformMediaItem(item)).filter(Boolean) : []
      };
    } catch (error) {
      console.error('❌ Frontend: Recommendations request failed:', error);
      // Fallback to discover if recommendations endpoint fails
      if (DEBUG_MODE) console.log('🔄 Frontend: Falling back to discover endpoint...');
      const discoverParams = {
        type: preferences.contentTypes?.[0] || 'movie',
        genres: preferences.genres?.join(','),
        providers: preferences.platforms?.join(','),
        page: preferences.page || 1
      };
      return this.discover(discoverParams);
    }
  }

  // Get content by genre (using correct discover parameters)
  async getByGenre(genreIds, mediaType = 'movie', page = 1) {
    return this.discover({
      type: mediaType,
      genres: Array.isArray(genreIds) ? genreIds.join(',') : genreIds,
      page: page
    });
  }

  // Get content by platform/provider (using correct discover parameters)
  async getByPlatform(providerIds, mediaType = 'movie', page = 1) {
    return this.discover({
      type: mediaType,
      providers: Array.isArray(providerIds) ? providerIds.join(',') : providerIds,
      page: page
    });
  }

  // Get similar content (from details endpoint)
  async getSimilar(mediaType, id) {
    const details = mediaType === 'movie' ? 
      await this.makeRequest(`/movies/${id}/`) : 
      await this.makeRequest(`/tv/${id}/`);
    
    return {
      results: details.similar?.results?.map(item => this.transformMediaItem(item)) || []
    };
  }

  // Get available genres for recommendations
  async getGenres() {
    try {
      return await this.makeRequest('/recommendations/genres');
    } catch (error) {
      console.error('Failed to fetch genres:', error);
      // Return fallback genres if API fails
      return {
        genres: [
          { name: 'Action', value: 'action' },
          { name: 'Comedy', value: 'comedy' },
          { name: 'Drama', value: 'drama' },
          { name: 'Horror', value: 'horror' },
          { name: 'Thriller', value: 'thriller' },
          { name: 'Sci-Fi', value: 'sci-fi' },
          { name: 'Fantasy', value: 'fantasy' },
          { name: 'Romance', value: 'romance' },
          { name: 'Adventure', value: 'adventure' },
          { name: 'Mystery', value: 'mystery' },
          { name: 'Animation', value: 'animation' },
          { name: 'Documentary', value: 'documentary' }
        ]
      };
    }
  }

  // Get available streaming providers for recommendations
  async getProviders() {
    try {
      return await this.makeRequest('/recommendations/providers');
    } catch (error) {
      console.error('Failed to fetch providers:', error);
      // Return fallback providers if API fails
      return {
        providers: [
          { name: 'Netflix', value: 'netflix', tmdb_id: 8 },
          { name: 'Prime Video', value: 'prime-video', tmdb_id: 119 },
          { name: 'Disney+', value: 'disney+', tmdb_id: 337 },
          { name: 'HBO Max', value: 'hbo-max', tmdb_id: 384 },
          { name: 'Hulu', value: 'hulu', tmdb_id: 15 },
          { name: 'Apple TV+', value: 'apple-tv+', tmdb_id: 350 },
          { name: 'Crunchyroll', value: 'crunchyroll', tmdb_id: 283 }
        ]
      };
    }
  }

  // Health check endpoint
  async getHealth() {
    return this.makeRequest('/health');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
