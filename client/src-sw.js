const { imageCache, staticResourceCache, googleFontsCache, offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
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

// offlineFallback silently depends on this for font caching.
googleFontsCache()

// this is a pre-shipped pattern that (default) matches for 'style', 'script', and 'worker' destinations.  Seems to be pretty boilerplate, caching with both 0 and 200 statuses.
staticResourceCache()

// uses a warmed cache to (default) cache up to a maximum of 60 images (we won't use that many), each for 30 days.  
imageCache()


offlineFallback(
  {
    pageFallback: '/index.html'
  }
)

self.addEventListener('install', e => {

})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/'}).then(()=>{
      console.log('Service Worker registered with scope')
    }).catch(()=>{
      console.error('Service Worker registration failed!')
    })
  })
}