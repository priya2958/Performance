# React + Vite

# Prompts

The claims app is slow during peak hours. Optimize performance to improve response time and user experience.
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
