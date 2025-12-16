type RateLimitStore = Map<string, { count: number; lastReset: number }>;

const ipMap: RateLimitStore = new Map();

export function rateLimit(
  ip: string,
  limit: number = 10,
  windowMs: number = 60000
) {
  const now = Date.now();
  const record = ipMap.get(ip) || { count: 0, lastReset: now };

  if (now - record.lastReset > windowMs) {
    record.count = 0;
    record.lastReset = now;
  }

  if (record.count >= limit) {
    return { success: false };
  }

  record.count += 1;
  ipMap.set(ip, record);
  return { success: true };
}
