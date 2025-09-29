# NextWatch Backend Integration Guide

## 🔧 Configuration Status

### ✅ **Fixed Issues**
- **API Endpoints**: Updated to match backend documentation exactly
- **Parameter Names**: Corrected search (`query` not `q`), discover (`with_genres`, `with_watch_providers`)
- **Data Transformation**: Added automatic conversion from backend format to frontend format
- **Missing Endpoints**: Added category endpoints (`getMoviesByCategory`, `getTVByCategory`)
- **Error Handling**: Maintained fallback to sample data when backend unavailable

### 📋 **Setup Instructions**

#### 1. **Environment Configuration**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your backend URL
# For development (default):
REACT_APP_API_URL=http://localhost:8000/api

# For production:
REACT_APP_API_URL=https://your-backend-domain.com/api
```

#### 2. **Backend Requirements**
Ensure your Django backend is running with:
- **URL**: `http://localhost:8000` (development)
- **CORS**: Configured to allow frontend requests
- **Endpoints**: All documented endpoints available

#### 3. **Testing the Integration**
```bash
# Start your Django backend first
cd /path/to/your/backend
python manage.py runserver

# Then start the React frontend
cd /path/to/nextwatch/Entertainment
npm start
```

## 🔗 **Updated API Methods**

### **Core Methods**
```javascript
// Discover content with filters
apiService.discover({
  type: 'movie',           // 'movie' or 'tv'
  genres: '28,12',         // Action, Adventure
  providers: '8,9',        // Netflix, Amazon Prime
  year: '2023',
  rating_min: 7.0,
  page: 1
});

// Search content
apiService.search('avengers', {
  type: 'multi',           // 'multi', 'movie', or 'tv'
  page: 1
});

// Get trending content
apiService.getTrending('movie', 'week', 1);

// Get category content
apiService.getMoviesByCategory('popular', 1);
apiService.getTVByCategory('top_rated', 1);
```

### **Data Transformation**
The API service now automatically transforms backend data:

**Backend Response:**
```javascript
{
  id: 550,
  title: "Fight Club",
  overview: "A ticking-time-bomb insomniac...",
  poster_url: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  media_type: "movie",
  release_date: "1999-10-15",
  vote_average: 8.433,
  runtime: 139
}
```

**Frontend Format:**
```javascript
{
  id: 550,
  title: "Fight Club",
  description: "A ticking-time-bomb insomniac...",
  image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  type: "movie",
  year: 1999,
  rating: 8.433,
  duration: "139 min"
}
```

## 🎯 **Component Integration**

### **Current Usage**
Your `App.jsx` currently calls:
```javascript
apiService.getRecommendations(preferences)
```

This now correctly maps to the backend's `/discover/` endpoint with proper parameters.

### **Available Components**
All existing components work without changes:
- `MediaCard` - Displays transformed data correctly
- `SearchSection` - Passes preferences to API
- `ResultsSection` - Renders API results

## 🚀 **Next Steps**

### **Immediate Actions**
1. **Create `.env` file**: `cp .env.example .env`
2. **Start backend**: Ensure Django server is running on port 8000
3. **Test frontend**: Run `npm start` and verify API calls work

### **Optional Enhancements**
1. **Add search functionality**: Use `apiService.search()` in components
2. **Add category browsing**: Use `getMoviesByCategory()` and `getTVByCategory()`
3. **Add trending section**: Use `getTrending()` for homepage content
4. **Add detail pages**: Use `getMovieDetails()` and `getTVShowDetails()`

## 🔍 **Debugging**

### **Check API Connection**
```javascript
// Test in browser console
fetch('http://localhost:8000/api/discover/?type=movie')
  .then(r => r.json())
  .then(console.log);
```

### **Common Issues**
- **CORS errors**: Ensure backend CORS settings allow frontend domain
- **404 errors**: Verify backend is running and endpoints exist
- **Data format errors**: Check browser console for transformation issues

## 📊 **Backend Endpoint Mapping**

| Frontend Method | Backend Endpoint | Parameters |
|----------------|------------------|------------|
| `discover()` | `/api/discover/` | `type`, `with_genres`, `with_watch_providers`, etc. |
| `search()` | `/api/search/` | `query`, `type`, `page` |
| `getTrending()` | `/api/trending/` | `media_type`, `time_window`, `page` |
| `getMovieDetails()` | `/api/movies/{id}/` | `id` |
| `getTVShowDetails()` | `/api/tv/{id}/` | `id` |
| `getMoviesByCategory()` | `/api/movies/{category}/` | `category`, `page` |
| `getTVByCategory()` | `/api/tv/{category}/` | `category`, `page` |

Your frontend is now **fully compatible** with your backend! 🎉
