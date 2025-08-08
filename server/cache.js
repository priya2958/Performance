// Simple in-memory cache with TTL and metrics
class Cache {
  constructor() {
    this.store = new Map();
    this.metrics = { hits: 0, misses: 0 };
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) {
      this.metrics.misses++;
      return null;
    }
    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      this.metrics.misses++;
      return null;
    }
    this.metrics.hits++;
    return entry.value;
  }

  set(key, value, ttlMs) {
    this.store.set(key, { value, expiry: Date.now() + ttlMs });
  }

  invalidate(key) {
    this.store.delete(key);
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

export default Cache;
