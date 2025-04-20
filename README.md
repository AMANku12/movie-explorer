<h1 align="center" id="title">Movie Explorer</h1>

<p align="center"><img src="https://socialify.git.ci/AMANku12/movie-explorer/image?font=Inter&amp;forks=1&amp;issues=1&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Circuit+Board&amp;stargazers=1&amp;theme=Light" alt="project-image"></p>

<p id="description">This is a full-stack Movie Exploration Web Application that allows users to discover and interact with a wide range of movies. The platform features a dynamic homepage showcasing newly launched movies and enables users to browse movies based on genres such as action romance scifi etc. It includes a powerful search functionality to quickly find movies by title. Authenticated users can register and log in securely using JWT (JSON Web Token) based authentication and manage a personalized watchlist to keep track of their favorite movies.</p>

<h2>🚀 Demo</h2>

[https://movie-explorer-git-main-aman-kumars-projects-8babd2a9.vercel.app](https://movie-explorer-git-main-aman-kumars-projects-8babd2a9.vercel.app)

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the Repository bash Copy Edit</p>

```
git clone https://github.com/AMANku12/movie-explorer.git
```

```
cd movie-explorer
```

<p>3. Install Frontend Dependencies</p>

```
npm install
```

<p>5. Install Backend Dependencies</p>

```
cd backend
```

```
npm install
```

<p>7. Set Up Environment Variables:-</p>

<p>8. For the backend:</p>

```
Create a .env file inside the backend directory with the following:  env Copy Edit
```

```
PORT=3000
```

```
MONGODB_URL=your_mongodb_connection_string
```

```
NEW_MOVIES_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key={api_key}&language=en-US&page=1'
```

```
API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY3ODEwNjQxM2ZlYjJlNTc1MDNkMjIwMDk2YjM5YyIsIm5iZiI6MTczODA2OTM3Ni4yMDYsInN1YiI6IjY3OThkNTgwM2FlMzU1YzQ3ODhmNjU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upT6XZIN02PMTrQ1wmB3xJ8jLG9O24M9kqHGngYpEXs"
```

```
JWT_PASSWORD = your_jwt_secret_key
```

<p>14. For the frontend:</p>

```
VITE_TMDB_API_KEY= "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmY3ODEwNjQxM2ZlYjJlNTc1MDNkMjIwMDk2YjM5YyIsIm5iZiI6MTczODA2OTM3Ni4yMDYsInN1YiI6IjY3OThkNTgwM2FlMzU1YzQ3ODhmNjU4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upT6XZIN02PMTrQ1wmB3xJ8jLG9O24M9kqHGngYpEXs"
```

```
VITE_GENRES = [{"id":28"name":"Action"}{"id":12"name":"Adventure"}{"id":16"name":"Animation"}{"id":35"name":"Comedy"}{"id":80"name":"Crime"}{"id":14"name":"Fantasy"}{"id":36"name":"History"}{"id":27"name":"Horror"}{"id":10749"name":"Romance"}{"id":878"name":"Sci-Fi"}]
```

```
VITE_BACKEND_URL = "http://localhost:3000"
```

<p>18. Start the backend server</p>

```
cd backend
```

```
npm run dev
```

<p>20. Start the frontend server: Open a new terminal in the project root:</p>

```
npm run dev
```

<p>21. Open the App:</p>

```
Visit http://localhost:5173 in your browser to use the app!
```

  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   React.js
*   Node.js
*   Express.js
*   MongoDB
*   JWT
*   dotenv
*   TMDB Api
