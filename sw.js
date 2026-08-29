const CACHE_NAME = 'app-images-v1';

const IMAGE_URLS = [
    'https://mdripon018770-coder.github.io/Notbok/24.png',
    'https://mdripon018770-coder.github.io/Notbok/welcome.png',
    'https://mdripon018770-coder.github.io/Notbok/package.png',

    'https://task-rk.github.io/task/grandslam.png',
    'https://task-rk.github.io/task/exclusivevip.png',
    'https://task-rk.github.io/task/abonusof.png',
    'https://task-rk.github.io/task/misson.jpg',
    'https://task-rk.github.io/task/sundaymega.png',
    'https://task-rk.github.io/task/fraidy.jpg',
    'https://task-rk.github.io/task/betbustar.png',
    'https://task-rk.github.io/task/accu.jpg',
    'https://task-rk.github.io/task/bonusfor.jpg',
    'https://task-rk.github.io/task/rabata.jpg',
    'https://task-rk.github.io/task/get22.jpg',
    'https://task-rk.github.io/task/brithday.jpg',

    'https://task-rk.github.io/task/wman.png',
    'https://task-rk.github.io/task/towerx.png',
    'https://task-rk.github.io/task/superace.png',
    'https://task-rk.github.io/task/jetx.png',
    'https://task-rk.github.io/task/aviatrix.png',
    'https://task-rk.github.io/task/wildbounty.png',
    'https://task-rk.github.io/task/superelements.png',
    'https://task-rk.github.io/task/royalty.png',
    'https://task-rk.github.io/task/cikin.png',
    'https://task-rk.github.io/task/foryou.png',
    'https://task-rk.github.io/task/lotaris.png',
    'https://task-rk.github.io/task/best.png',
    'https://task-rk.github.io/task/slot.png',
    'https://task-rk.github.io/task/climb.png',
    'https://task-rk.github.io/task/cardgame.png',
    'https://task-rk.github.io/task/royel.png',
    'https://task-rk.github.io/task/burling.png',

    'https://task-rk.github.io/task/scrt.png',
    'https://task-rk.github.io/task/furtfil.png',
    'https://task-rk.github.io/task/Indiapokar.png',
    'https://task-rk.github.io/task/betslip.png',
    'https://task-rk.github.io/task/xicon.png',
    'https://task-rk.github.io/task/telegram.png',
    'https://task-rk.github.io/task/googol.jpeg',

    'https://raw.githubusercontent.com/mdripon018770-coder/Notbok/main/logi.jpg',

    'https://task-rk.github.io/task/othar.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            for (const url of IMAGE_URLS) {
                try {
                    await cache.add(url);
                } catch (error) {
                    console.log('Image cache failed:', url);
                }
            }
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener('fetch', event => {
    const request = event.request;

    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request).then(response => {
                    if (response.ok) {
                        const copy = response.clone();

                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, copy);
                        });
                    }

                    return response;
                });
            })
        );
    }
});