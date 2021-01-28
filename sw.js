const cacheName='v1';

const cacheAssets=[
    'index.html',
    'contact.html',
    'menu.html',
    'today-special.html',
    '/css/font-awesome.min.css',
    '/css/templatemo-style.css',
    '/css/bootstrap.min.css'
]

self.addEventListener('install', function (event) {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log('Service Worker: Caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
            
    );
});

self.addEventListener('activate', function (event) {
        console.log('Service Worker: Activated');
        //remove unwanted cache
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName){
                            console.log('Service Worker: Clearing Old Cache');
                            return caches.delete(cache);
                        }
                    })
                )
            })
        );
    }
);

self.addEventListener('fetch', function (event)  {
    console.log('Service Worker: Fetching');
    event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});