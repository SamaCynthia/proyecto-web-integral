/**
 * Redis Client Configuration Interface
 */
export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  tls?: boolean;
  retryStrategy?: (times: number) => number | null;
}

/**
 * Redis Cache Key Options
 */
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string;
}

/**
 * Redis Set Operation Result
 */
export interface RedisSetResult {
  success: boolean;
  message?: string;
}

/**
 * Redis Get Operation Result
 */
export interface RedisGetResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Redis Session Data
 */
export interface RedisSessionData {
  userId: string;
  token: string;
  expiresAt: number;
  lastActivity: number;
  [key: string]: any;
}

/**
 * Redis Queue Item
 */
export interface RedisQueueItem<T = any> {
  id: string;
  data: T;
  priority?: number;
  timestamp: number;
  retries?: number;
}

/**
 * Redis Stream Entry
 */
export interface RedisStreamEntry {
  id: string;
  fields: Record<string, string>;
  timestamp?: number;
}

/**
 * Redis Pub/Sub Message
 */
export interface RedisPubSubMessage {
  channel: string;
  message: string | Record<string, any>;
  timestamp: number;
}

/**
 * Redis Client Interface
 */
export interface IRedisClient {
  set(key: string, value: any, options?: CacheOptions): Promise<RedisSetResult>;
  get<T = any>(key: string): Promise<RedisGetResult<T>>;
  delete(key: string): Promise<boolean>;
  exists(key: string): Promise<boolean>;
  ttl(key: string): Promise<number>;
  expire(key: string, seconds: number): Promise<boolean>;
  clear(pattern?: string): Promise<number>;
  publish(channel: string, message: any): Promise<number>;
  subscribe(
    channel: string,
    callback: (message: RedisPubSubMessage) => void,
  ): void;
  unsubscribe(channel: string): void;
  lpush(key: string, value: any): Promise<number>;
  rpop(key: string): Promise<any>;
  llen(key: string): Promise<number>;
  hset(key: string, field: string, value: any): Promise<number>;
  hget<T = any>(key: string, field: string): Promise<T | null>;
  hgetall<T = any>(key: string): Promise<Record<string, T>>;
  hdel(key: string, field: string): Promise<number>;
  sadd(key: string, value: any): Promise<number>;
  smembers<T = any>(key: string): Promise<T[]>;
  srem(key: string, value: any): Promise<number>;
  zadd(key: string, score: number, member: string): Promise<number>;
  zrange<T = any>(key: string, start: number, stop: number): Promise<T[]>;
  zrem(key: string, member: string): Promise<number>;
  incr(key: string): Promise<number>;
  decr(key: string): Promise<number>;
  incrby(key: string, increment: number): Promise<number>;
  decrby(key: string, decrement: number): Promise<number>;
}

/**
 * Redis Cache Key Generator
 */
export interface CacheKeyGenerator {
  generate(prefix: string, ...args: any[]): string;
  parse(key: string): { prefix: string; args: any[] };
}
