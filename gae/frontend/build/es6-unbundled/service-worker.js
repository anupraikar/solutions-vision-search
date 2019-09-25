/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","c204a7348be7826c897a4e320ef1001d"],["bower_components/app-layout/app-drawer/app-drawer.html","2cfe2d03e25ee8073159c12e29e70571"],["bower_components/app-layout/app-header-layout/app-header-layout.html","fae8e0d4f2b95f7a6278b55fb35b800a"],["bower_components/app-layout/app-header/app-header.html","cc81f1b266f84cacb2488195cbf55f35"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","f2969e5cae564c947e1ee0c2177bcdce"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","7a2cd2da89213e76a44069305496b6d3"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","b4eaaeca39b790ea86b9dd731d1b69ed"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","9e1b778964c2765b6b015b0b8c24f1f6"],["bower_components/app-layout/app-scroll-effects/effects/material.html","4a03dfd728dbfba9f9e7874b64fef018"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","4159e466a95973be5ef016b41a4c8763"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","4ce7649cd519c55b28c611edd54a7f52"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","739658b0db22095103bd40f32d398c93"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","31c91494fdc3dadc3ce922a03ac24f1f"],["bower_components/app-layout/app-toolbar/app-toolbar.html","cac42c92a39fd9611d080d1362905030"],["bower_components/app-layout/helpers/helpers.html","5d8658a253e25662b5f3c96621f66ba5"],["bower_components/app-route/app-location.html","65296e22f912fd47922abf9886dc217a"],["bower_components/app-route/app-route-converter-behavior.html","7ea85ec7a659227e293bbd0a8ed02551"],["bower_components/app-route/app-route.html","99aa803ca8b33ebd508f64e9f9d73a35"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","8e79f491f7fabb89335ebf30cde22cbc"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","1732dd7e046d0bb8787353e588046ee4"],["bower_components/iron-ajax/iron-ajax.html","156028ff3288d755f2da3a27df98f358"],["bower_components/iron-ajax/iron-request.html","61c60064e662d2a1b9858cb4eba0eb3b"],["bower_components/iron-behaviors/iron-button-state.html","7a80b31c895971e57868f802bce4f1b5"],["bower_components/iron-behaviors/iron-control-state.html","8fea8df8cb20bc41943f9f310064b6c9"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","bdd4ba6bab9c8b0721da3347cede93e8"],["bower_components/iron-flex-layout/iron-flex-layout.html","bcac4712061b08d806c1778598ec78c7"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","570d7a11bdee4e666abfecc8854037fc"],["bower_components/iron-form/iron-form.html","dd6a3df7055d2e51c22b9b33ff7548e3"],["bower_components/iron-icon/iron-icon.html","23b70883b807e1bd263d5603e954589b"],["bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","04ab27b7ec1ea39874baf919446ed66d"],["bower_components/iron-image/iron-image.html","05b6cefa5cf8c55abd2a79f62d4c5072"],["bower_components/iron-input/iron-input.html","1d7f6b729ba6e8e6e9abb74dfcb0f59a"],["bower_components/iron-list/iron-list.html","edd0f3da3c05ceaee6aca0c00e125b86"],["bower_components/iron-location/iron-location.html","689a3e709f42cea2093ac46eef8bc84b"],["bower_components/iron-location/iron-query-params.html","e3de4064b8caf40f87f26369c37d8da5"],["bower_components/iron-media-query/iron-media-query.html","3bd41562ca3686be17c68285b9246b1a"],["bower_components/iron-meta/iron-meta.html","0b70c610a409f3de69ba27609ea6a47d"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","79b05c925883abdc74516c5c160818bb"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","30187ce3d1d3b7cdb97637974cd57e8f"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","eba1cb4b803b730b3f0ce46a1573dda2"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","ee278e68fb33953c038ac745521c691a"],["bower_components/iron-overlay-behavior/iron-scroll-manager.html","d56d15cd0c494057b1d788a9b7dff1cf"],["bower_components/iron-pages/iron-pages.html","f4987b10adcfe00d96d5bebde042cff5"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","6f3a4f567a9b419f75f1fc16a63aeb3a"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","0348fe772494314a2179a5deadca1c2a"],["bower_components/iron-selector/iron-multi-selectable.html","cc6a0fe00ad1f43f3fcbf004e5172575"],["bower_components/iron-selector/iron-selectable.html","1cc8f1a6524831f59fccdff2b5c8b943"],["bower_components/iron-selector/iron-selection.html","1d48b505dba947d50aa415b732b2ed3c"],["bower_components/iron-selector/iron-selector.html","1facaed80539c5626cd248ec4b1011d4"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","daaa258ad33e39b517f095e67746619e"],["bower_components/neon-animation/neon-animatable-behavior.html","c3502158a915e2b4b8d14f8403bcd80e"],["bower_components/neon-animation/neon-animation-runner-behavior.html","9aa38241d62388b23506c7970deb22e4"],["bower_components/paper-behaviors/paper-button-behavior.html","34712787945703a333098d460757a970"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","31631a63e963bc03f329f0beba89522d"],["bower_components/paper-behaviors/paper-ripple-behavior.html","7e06e791dbf5be6e04ef69c195ea65a5"],["bower_components/paper-button/paper-button.html","128a7a5f28a53346e2251b638a6147e3"],["bower_components/paper-card/paper-card.html","9a7cf1cc5083c2f70b2109c1910d28bf"],["bower_components/paper-dialog-behavior/paper-dialog-behavior.html","43be83681a81b8144aaf947ae9080f74"],["bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","5b97501e5b6ef42fa957487ea4c88e7e"],["bower_components/paper-dialog/paper-dialog.html","dbc40043361685fe33f5a64c5a001d66"],["bower_components/paper-icon-button/paper-icon-button.html","cd0ac71797dcecb4581f61954a47f2c0"],["bower_components/paper-input/paper-input-addon-behavior.html","05e52a5f92f50f4c30f12ce76284d846"],["bower_components/paper-input/paper-input-behavior.html","01d89116d6b4c0a181f6974923aefc8e"],["bower_components/paper-input/paper-input-char-counter.html","734fda82da0f8f64de29e9f4e083a9bb"],["bower_components/paper-input/paper-input-container.html","3afb235848be399e899411a6055faf08"],["bower_components/paper-input/paper-input-error.html","9bb05ad91bbbe5cc373817d59a2ab5ec"],["bower_components/paper-input/paper-input.html","3c6d3df2480ecd7e72a0e828359f39cd"],["bower_components/paper-ripple/paper-ripple.html","c43038ccb90c156c5db1fb61d244f958"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/polymer/lib/elements/array-selector.html","9ef630d508cd1fda095b5569e4279e4f"],["bower_components/polymer/lib/elements/custom-style.html","7a711102d6e7f48af7e37df3d1985e4c"],["bower_components/polymer/lib/elements/dom-bind.html","c997003cc013e950e1a877e42330db98"],["bower_components/polymer/lib/elements/dom-if.html","0f0245be9576d8f4d3bac19c08362552"],["bower_components/polymer/lib/elements/dom-module.html","0274847a61ad4ccf776db11f4bcab786"],["bower_components/polymer/lib/elements/dom-repeat.html","4f54146a8d6e22597cbea472baafdb2e"],["bower_components/polymer/lib/legacy/class.html","c56693ab22b6f94482a02922c57cb6ee"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","799d95d880c99604524b555198895a81"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","114f7b0a446a513350f7e4c06cad1a83"],["bower_components/polymer/lib/legacy/polymer-fn.html","34127afee1da9e6001e1eecb2aa1ed4f"],["bower_components/polymer/lib/legacy/polymer.dom.html","494c097821d64de1f76c8ea31d4bb1df"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","6a22fc2497c39df0b83889f9960cbe2f"],["bower_components/polymer/lib/mixins/dir-mixin.html","0fb108dae477d031b9f4be1dc9dce3f9"],["bower_components/polymer/lib/mixins/element-mixin.html","dc41569a4d9e6057e11e6fa9900a9c95"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","2ba36d04a7052d2094bdb6d2b4d29a17"],["bower_components/polymer/lib/mixins/mutable-data.html","e19b56cee72d6e2f17f7a5bbffcafa6b"],["bower_components/polymer/lib/mixins/properties-changed.html","01904a4609c4bc3a80d0c5dd9e5182c3"],["bower_components/polymer/lib/mixins/properties-mixin.html","47ee39b7dd48d67622b1cf63edf1ffce"],["bower_components/polymer/lib/mixins/property-accessors.html","97c07aa88dd7aa82b4f24abbeec80758"],["bower_components/polymer/lib/mixins/property-effects.html","ec0bc01dd9a6086632314ad856c6d633"],["bower_components/polymer/lib/mixins/template-stamp.html","648610e1f3e522d819f4a81972a8c58d"],["bower_components/polymer/lib/utils/array-splice.html","000c6d75d97ae3d726147d513ea03a54"],["bower_components/polymer/lib/utils/async.html","a75e544cb3ef3e5619a0a6ad8edf0e62"],["bower_components/polymer/lib/utils/boot.html","0838ede938114c14aff822c59dae6938"],["bower_components/polymer/lib/utils/case-map.html","692010f0d6c564f6bee33642a9b1d128"],["bower_components/polymer/lib/utils/debounce.html","34da85cabbd14c1da33e20f167c7fc5a"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","79334aaaef19ee4ad583561a1d4417fd"],["bower_components/polymer/lib/utils/flush.html","8ba0c240258de76c32c4830728279503"],["bower_components/polymer/lib/utils/gestures.html","f3a8e0c74c5bd3e20f791bcc70e87140"],["bower_components/polymer/lib/utils/html-tag.html","74fc6824c62aea205bf7cb5d68305358"],["bower_components/polymer/lib/utils/import-href.html","dbbd6263e9f8879abea15f615039bde4"],["bower_components/polymer/lib/utils/mixin.html","d1a53cf3c896cddffd28751cda33be80"],["bower_components/polymer/lib/utils/path.html","588864d30b74f858d9188ea111afb5dd"],["bower_components/polymer/lib/utils/render-status.html","4025e575f729e4dcb4afd90115760191"],["bower_components/polymer/lib/utils/resolve-url.html","d2354eda0a7028d10786bda7fd8c9a17"],["bower_components/polymer/lib/utils/settings.html","040fe0087d32c8a6db9f92d17e67ebce"],["bower_components/polymer/lib/utils/style-gather.html","a7c328a15fcd255f49d6ae83c1d808f4"],["bower_components/polymer/lib/utils/telemetry.html","f517839054b9f4a14d5f0eecd64f054a"],["bower_components/polymer/lib/utils/templatize.html","17eb2d5410f8896ff7b46647faff5bc4"],["bower_components/polymer/lib/utils/unresolved.html","b8c7bf6a6ecd0fa21a24da8876d461eb"],["bower_components/polymer/polymer-element.html","08a7003aea6a4d70ba20306a1e92078e"],["bower_components/polymer/polymer.html","1ed2bae1bf6d43e8c8bc74100ddff270"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","791555bcc4c4798e2833e93dcf234e2d"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","40535757b29d08744410c245b9363b6b"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","8af5f1900788253d8384715a01425ab7"],["bower_components/webcomponentsjs/gulpfile.js","d62de2e3466a2ebfebb7c463a724f50d"],["bower_components/webcomponentsjs/webcomponents-ce.js","79018f7fe2788095460a82dad1d0e2d9"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","ceb979b7d4c089b9daa38eec743a3915"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","4cc6fe042af14bded21af71ccb137f45"],["bower_components/webcomponentsjs/webcomponents-hi-sd.js","8631268c8fb731636ddf410293155f89"],["bower_components/webcomponentsjs/webcomponents-hi.js","2e02d950c1c199919a375acfd1fbc108"],["bower_components/webcomponentsjs/webcomponents-lite.js","e6a9f166ed6b16c555bd020782780db5"],["bower_components/webcomponentsjs/webcomponents-loader.js","596ad3dc06dfb78ecdc6bcee1d653f04"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","0ae8ee0bf172ca9bcbc04f1bfea15fe4"],["bower_components/webcomponentsjs/webcomponents-sd.js","221ef1c37f786b0f26f5e94e53276d20"],["index.html","ce3c4f79074ddf4e864ca932abc469a2"],["manifest.json","39a400389f05600d3ec8c419680017c6"],["src/my-app.html","920d43f1d6e9c9b8f0da1be0b76d22bd"],["src/my-icons.html","1618712b865f25904ddffef31c5d9db0"],["src/my-search.html","ccd88b88d3beaac1f28f155b7500c7ce"],["src/my-view404.html","18a0faf33077fde567df6f67b1e12f5b"],["src/shared-styles.html","d5133ed0135bb42a87b98527f8f1c7aa"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function (body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function (kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function (kv) {
        return ignoreUrlParametersMatching.every(function (ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function (kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function (item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function (response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function (event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingRequests) {
        return Promise.all(
          existingRequests.map(function (existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function () {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function (e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







