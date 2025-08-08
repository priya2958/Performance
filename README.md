# React + Vite

# Prompts

Assume claims app is slow during peak hours. Now Optimize performance to improve response time and user experience.
Requirements:
Caching:
Use Redis or in-memory cache for frequently accessed data
Implement TTL and cache invalidation
Pagination & Lazy Loading
Add paginated claims API:
GET /api/claims?page=1&limit=10
Implement lazy loading or "Load More" in React frontend

Monitoring:
Create /api/metrics to track:
Request count
Cache hits/misses
Avg response time
Memory usage

### How My Code Meets the Requirements:

Caching: Used `node-cache` to store frequently accessed claims data in `cache.js`.
Pagination: Backend supports `GET /api/claims?page=1&limit=10`.
Lazy Loading: React component (`ClaimsList.jsx`) loads claims in chunks with "Load More" button.
Monitoring Endpoint: Created `/api/metrics` to expose response times, memory, and request logs.
