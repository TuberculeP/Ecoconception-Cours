const buildCacheMiddleware = () => {
  const cache = new Map();

  const cacheMiddleware = (req: any, res: any, next: any) => {
    const key = req.originalUrl; // Use the URL as the cache key

    if (cache.has(key)) {
      console.log(`Cache hit for ${key}`);
      return res.send(cache.get(key));
    }

    // Override res.send to cache the response
    const originalSend = res.send.bind(res);
    res.send = (body: any) => {
      console.log(`Caching response for ${key}`);
      cache.set(key, body);
      originalSend(body);
    };

    next();
  };
  return cacheMiddleware;
};

export default buildCacheMiddleware;
