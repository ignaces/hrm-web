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
  
    self.addEventListener('install', function(event) {
      console.log('Service worker installing...');
      self.skipWaiting();
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service worker activating...');
    });
    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function(error) {
          console.log(
            "[Service Worker] Network request Failed. Serving content from cache: " +
              error
          );
          //Check to see if you have it in the cache
          //Return response
          //If not in the cache, then return error page
          return caches
            .open(
              "https://hrmdev.enovum.cl/"
            )
            .then(function(cache) {
              return cache.match(event.request).then(function(matching) {
                var report =
                  !matching || matching.status == 404
                    ? Promise.reject("no-match")
                    : matching;
                return report;
              });
            });
        })
      );
    });
   // I'm a new service worker
  
   self.addEventListener('fetch', function(event) {
    console.log('Fetching:', event.request.url);
    console.log(event.request.url);

    event.respondWith(

        caches.match(event.request).then(function(response) {

        return response || fetch(event.request);

        })

    );
  });
  
  })();
  