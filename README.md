# 🎬 NextWatch Entertainment

<div align="center">

<img width="1883" height="884" alt="image" src="https://github.com/user-attachments/assets/8f6e5723-d6d4-4362-9498-b36d7e029af5" />

**TMDB-Powered Entertainment Recommendation Platform**

*Built to impress HR recruiters with modern React development skills and TMDB API integration*

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TMDB API](https://img.shields.io/badge/TMDB-API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/documentation/api)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.6.3-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![FontAwesome](https://img.shields.io/badge/Font_Awesome-6.4.0-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)

</div>

## 🚀 Project Overview

NextWatch is a sophisticated entertainment recommendation platform that showcases modern React development practices and seamless API integration. Built with performance and user experience in mind, this project demonstrates proficiency in:

- **Modern React Development** with hooks and functional components
- **TMDB API Integration** for real-time movie and TV show data
- **Responsive Design** with CSS Grid and Flexbox
- **Animation Libraries** using Framer Motion and TSParticles
- **State Management** with React hooks
- **API Service Architecture** with error handling and fallbacks
- **Performance Optimization** with lazy loading and code splitting

## ✨ Key Features

### 🎯 Smart Recommendations
- TMDB-powered content discovery based on user preferences
- Genre-based filtering and search functionality
- Platform-specific content recommendations (Netflix, Disney+, Amazon Prime, etc.)

### 🎨 Beautiful UI/UX
- **Starfield Background Animation** with twinkling stars and shooting stars
- **Smooth Animations** powered by Framer Motion
- **Responsive Design** that works on all devices
- **Modern Glass-morphism** design elements

### 🔌 TMDB API Integration
- Real-time movie and TV show data fetching
- High-quality poster images and metadata
- Trending content discovery
- Detailed content information including ratings, genres, and descriptions

### 🛡️ Robust Architecture
- **Error Handling** with graceful fallbacks to sample data
- **Loading States** with beautiful animations
- **Modular Component Structure** for maintainability
- **Environment Configuration** for different deployment stages

## 🛠️ Technical Skills Demonstrated

### Frontend Technologies
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)

### Build Tools & Development
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)

### Animation & UI Libraries
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![TSParticles](https://img.shields.io/badge/TSParticles-FF6B6B?style=flat-square&logo=javascript&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=flat-square&logo=fontawesome&logoColor=white)

### API Integration
![TMDB](https://img.shields.io/badge/TMDB_API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-25D366?style=flat-square&logo=api&logoColor=white)

## 🎬 TMDB API Integration Highlights

This project showcases professional API integration skills through comprehensive TMDB (The Movie Database) API usage:

### 🔥 Advanced API Features Implemented
- **Multi-endpoint Integration**: Movies, TV Shows, Trending Content, Search
- **Error Handling & Fallbacks**: Graceful degradation when API is unavailable
- **Image Optimization**: Dynamic poster loading with placeholder handling
- **Rate Limiting Awareness**: Efficient API calls with proper request management
- **Environment Configuration**: Secure API key management (not hardcoded)

### 📊 API Service Architecture
```javascript
// Professional API service with error handling
class ApiService {
  async getRecommendations(preferences) {
    // Robust error handling with fallbacks
    return this.makeRequest('/recommendations/', {
      method: 'POST',
      body: JSON.stringify(preferences)
    });
  }
}
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nextwatch-entertainment.git
   cd nextwatch-entertainment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Add your TMDB API key to .env file
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
nextwatch-entertainment/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── dist/                       # Production build output
├── public/
│   └── vite.svg               # Vite logo asset
├── src/
│   ├── assets/
│   │   └── react.svg          # React logo asset
│   ├── components/            # Reusable React components
│   │   ├── BackToTop.jsx      # Scroll to top functionality
│   │   ├── ContentTypeSelection.jsx
│   │   ├── ContentTypeSelector.jsx
│   │   ├── ErrorBoundary.jsx  # Error handling wrapper
│   │   ├── Footer.jsx         # Application footer
│   │   ├── GenreSection.jsx   # Genre display section
│   │   ├── GenreSelector.jsx  # Genre selection interface
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Hero.jsx           # Landing hero section
│   │   ├── MediaCard.jsx      # Individual media item display
│   │   ├── ParticleBackground.jsx # Particle effects background
│   │   ├── PlatformSelection.jsx
│   │   ├── PlatformSelector.jsx # Streaming platform selector
│   │   ├── PreferencesSection.jsx # User preferences interface
│   │   ├── RangeSlider.jsx    # Range input component
│   │   ├── ResultsSection.jsx # Search results display
│   │   ├── SearchSection.jsx  # Search functionality
│   │   └── StarfieldBackground.jsx # Animated starfield
│   ├── data/
│   │   └── sampleData.js      # Fallback sample data
│   ├── services/
│   │   └── api.js             # API service layer & TMDB integration
│   ├── App.css                # Main application styles
│   ├── App.jsx                # Main application component
│   ├── index.css              # Global styles
│   └── main.jsx               # Application entry point
├── .env                       # Environment variables (local)
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore patterns
├── BACKEND_INTEGRATION_GUIDE.md # Backend setup instructions
├── DEPLOYMENT.md             # Deployment documentation
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── LICENSE                   # Project license
├── package.json              # Project dependencies & scripts
├── README.md                 # Project documentation
├── test-layout.html          # Layout testing file
├── vercel.json               # Vercel deployment config
└── vite.config.js            # Vite build configuration
```

## 🎯 Why This Project Impresses Recruiters

### 1. **Modern React Practices**
- Functional components with hooks
- Clean component architecture
- Proper state management
- Performance optimizations

### 2. **Real-World API Integration**
- Professional TMDB API usage
- Error handling and fallbacks
- Environment configuration
- Secure credential management

### 3. **UI/UX Excellence**
- Beautiful animations and transitions
- Responsive design principles
- Modern design patterns
- Accessibility considerations

### 4. **Production-Ready Code**
- ESLint configuration
- Proper project structure
- Environment management
- Build optimization with Vite

### 5. **Technical Versatility**
- Multiple animation libraries
- CSS-in-JS and traditional CSS
- Modern JavaScript features
- Package management expertise

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Features Showcase

### Starfield Animation
Custom CSS animations creating a mesmerizing starfield background with:
- Twinkling stars of varying sizes
- Shooting star animations
- Smooth performance optimizations

### Smart Recommendations
Intelligent content discovery based on:
- User preferences and mood
- Genre preferences
- Platform availability
- Trending algorithms

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🤝 Contributing

This project is designed as a portfolio piece, but contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Vishw** - Full Stack Developer

- 💼 [LinkedIn](https://linkedin.com/in/yourprofile)
- 🐱 [GitHub](https://github.com/yourusername)
- 📧 [Email](mailto:your.email@example.com)

---

<div align="center">

**Built with ❤️ to showcase modern React development skills**

*This project demonstrates proficiency in React, API integration, modern CSS, and production-ready development practices*

</div>
