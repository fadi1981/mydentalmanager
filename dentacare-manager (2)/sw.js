
const CACHE_NAME = 'dentacare-v2';
// قائمة الملفات والروابط الخارجية التي يحتاجها البرنامج للعمل بدون إنترنت
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react@^19.2.3',
  'https://esm.sh/react-dom@^19.2.3',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;700&display=swap'
];

// عند تثبيت الـ Service Worker: قم بتحميل وحفظ كافة الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching all assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // تفعيل التحديث فوراً
});

// عند تفعيل الـ Service Worker: تنظيف الذاكرة القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// استراتيجية "الذاكرة أولاً": ابحث عن الملف في الموبايل، وإذا لم يوجد اطلبه من الإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // إذا كان الملف جديداً (مثل صور المريض المرفوعة خارجياً)، قم بتخزينه أيضاً
        if (event.request.url.startsWith('http')) {
           const responseToCache = networkResponse.clone();
           caches.open(CACHE_NAME).then((cache) => {
             cache.put(event.request, responseToCache);
           });
        }
        return networkResponse;
      });
    })
  );
});
