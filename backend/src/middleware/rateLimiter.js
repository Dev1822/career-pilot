import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

// Create a reusable Redis client
let redisClient;
if (process.env.REDIS_URL) {
  try {
    redisClient = new Redis(process.env.REDIS_URL, { lazyConnect: true, enableOfflineQueue: false });
    redisClient.on('error', (err) => console.warn('Rate limiter Redis error:', err.message));
  } catch (err) {
    console.warn('Rate limiter: could not connect to Redis, using in-memory store:', err.message);
  }
}

// Helper to create the store (falls back to memory if Redis is unavailable)
const buildStore = (prefix = 'rl:') => {
  if (!redisClient) return undefined;

  return new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
    prefix,
  });
};

const keyGenerator = (req) => req.user?.uid || req.ip;

// Global Limiter: 100 requests per 15 minutes
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: buildStore('rl:'),
  keyGenerator: (req) => req.ip, // Global limits generally by IP
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      error: options.message?.error || 'Rate limit exceeded',
      message: options.message
    });
  },
  message: {
    error: 'Too many requests, please try again later.'
  }
});

// Strict Limiter (AI/Upload): 5 requests per 15 minutes
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  store: buildStore('ai_rl:'),
  keyGenerator, // Strict limits by user ID (if auth) or IP
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded for AI/Upload endpoints',
      limit: options.max,
      message: {
          error: 'Too many requests to high-cost endpoints, please try again later.'
      }
    });
  },
  // Skip limiting only when the user supplies their own API key (they pay for their own quota).
  // Do NOT skip unauthenticated requests — they must still be rate-limited by IP.
  skip: (req) => req.aiProviderSource === 'user_header' || req.aiProviderSource === 'user_openrouter_pkce'
});

export const aiRateLimiter = strictLimiter;
