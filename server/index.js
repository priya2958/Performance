import express from "express";
import Cache from "./cache.js";
import os from "os";

const app = express();
const PORT = 4000;
const cache = new Cache();

// Simulated claims data (replace with DB in production)
const CLAIMS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  claimant: `User${i + 1}`,
  amount: Math.floor(Math.random() * 1000) + 100,
  status: ["pending", "approved", "rejected"][i % 3],
}));

let requestCount = 0;
let totalResponseTime = 0;

// Paginated claims API with cache
app.get("/api/claims", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const cacheKey = `claims:${page}:${limit}`;
  const start = Date.now();

  let data = cache.get(cacheKey);
  if (!data) {
    // Simulate DB delay
    await new Promise((r) => setTimeout(r, 100));
    const startIdx = (page - 1) * limit;
    data = {
      claims: CLAIMS.slice(startIdx, startIdx + limit),
      total: CLAIMS.length,
    };
    cache.set(cacheKey, data, 60 * 1000); // 1 min TTL
  }

  const duration = Date.now() - start;
  requestCount++;
  totalResponseTime += duration;
  res.json(data);
});

// Metrics endpoint
app.get("/api/metrics", (req, res) => {
  const mem = process.memoryUsage();
  res.json({
    requestCount,
    cacheHits: cache.metrics.hits,
    cacheMisses: cache.metrics.misses,
    avgResponseTime: requestCount ? totalResponseTime / requestCount : 0,
    memoryUsage: {
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Claims API server running on http://localhost:${PORT}`);
});
