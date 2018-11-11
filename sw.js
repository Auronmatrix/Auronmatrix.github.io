/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-9ff57c0252434218d550.js"
  },
  {
    "url": "app-9ae733cc4deae02b50fd.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-858acc9c34ea044e3566.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "e77423f7266ca25836ca96e8148751a9"
  },
  {
    "url": "3.ee4d60ba424868f716f1.css"
  },
  {
    "url": "0.0746d2c2bf23d552ba24.css"
  },
  {
    "url": "1-0173ee852243870b061c.js"
  },
  {
    "url": "2-44ad9a0741584f0c8ce2.js"
  },
  {
    "url": "0-a1eda006d8c3a8fea236.js"
  },
  {
    "url": "3-43459c9cbf2099ea67e4.js"
  },
  {
    "url": "component---src-pages-404-jsx-933be9c49a9c0def6b2b.js"
  },
  {
    "url": "static/d/827/path---404-html-516-62a-5e8He557p9U1kExyZp6r1qUSkI.json",
    "revision": "83d4dbbe11036fc65464c3ae6b8761e6"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});