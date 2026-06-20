const CACHE_NAME = 'boss-alarm-v1';
const ASSETS = ['/LineageM-BOSS/', '/LineageM-BOSS/index.html', '/LineageM-BOSS/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// 푸시 알림 수신
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(data.title || '⚔️ 보스 출현!', {
      body: data.body || '보스가 출현했습니다!',
      icon: '/LineageM-BOSS/icon-192.png',
      badge: '/LineageM-BOSS/icon-192.png',
      vibrate: [200, 100, 200],
      tag: data.tag || 'boss-alarm',
      data: data
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/LineageM-BOSS/'));
});
