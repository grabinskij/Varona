Create .env.local in the root directory:

VITE_NODE_ENV=development
VITE_API_URL_LOCAL=http://localhost:4000/api/reviews
VITE_SOCKET_URL_LOCAL=http://localhost:4000




Create also .env.production in the root directory:

VITE_NODE_ENV=production
VITE_API_URL_PROD=https://varona.vercel.app/api/reviews
VITE_SOCKET_URL_PROD=https://varona.vercel.app