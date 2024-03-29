/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function() {
    'use strict';
    var cacheName = 'talento';
    var filesToCache = [
      '/',
      '/assets/js/jquery.min.js',
      '/assets/js/bootstrap.min.js',
      '/assets/js/metisMenu.min.js',
      '/assets/js/waves.js',
      '/assets/js/jquery.slimscroll.js',
      '/assets/plugins/bootstrap-select/js/bootstrap-select.min.js',
      '/assets/js/dist/notificacionesSistema.min.js',
      '/themes/horizontal/assets/js/jquery.core.js',
      '/themes/horizontal/assets/js/jquery.app.js',
      '/assets/plugins/tooltipster/tooltipster.bundle.min.js',
      '/themes/horizontal/assets/js/modernizr.min.js',
      '/assets/js/dist/Talento.min.js',
      '/assets/css/bootstrap.min.css',
      '/assets/css/core.css',
      '/assets/css/components.css',
      '/assets/css/icons.css',
      '/assets/css/pages.css',
      '/assets/css/menu.css',
      '/assets/css/responsive.css',
      '/assets/plugins/tooltipster/tooltipster.bundle.min.css',
      '/assets/js/vue.min.js',
      '/assets/js/sw.js'
    ];
    self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
    });
    
    self.addEventListener('activate', function(e) {
      console.log('[ServiceWorker] Activate');
      e.waitUntil(
        caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
      );
       return self.clients.claim();
    });
    self.addEventListener('fetch', function(e) {
      console.log('[ServiceWorker] Fetch', e.request.url);
      e.respondWith(
        caches.match(e.request).then(function(response) {
          return response || fetch(e.request);
        })
      );
    });
   // I'm a new service worker
  
   self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
  
  })();
  