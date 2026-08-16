import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

export const redis = globalForRedis.redis ?? new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key)
  return data ? JSON.parse(data) : null
}

export async function cacheSet(key: string, value: unknown, ttl = 3600): Promise<void> {
  await redis.setex(key, ttl, JSON.stringify(value))
}

export async function cacheDel(key: string): Promise<void> {
  await redis.del(key)
}

export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  const keys = await redis.keys(pattern)
  if (keys.length > 0) {
    await redis.del(...keys)
  }
}