const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  ({ request }) => [
    // checks if the request destination is style, script, or worker, and returns true if it is, otherwise returns false
    "style", "script", "worker"].includes(request.destination),
    // sets the strategy to StaleWhileRevalidate
    new StaleWhileRevalidate({
      // sets the cache name to static-resources
    cacheName: 'static-resources',
    // sets the plugins to an array of CacheableResponsePlugin and ExpirationPlugin
    plugins: [
    new CacheableResponsePlugin({
      // sets the statuses to an array of 0 and 200
        statuses: [0, 200],
    }),
    new ExpirationPlugin({
      // sets the max entries to 60 and the max age to 30 days
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
  }),
    ],
})
);
