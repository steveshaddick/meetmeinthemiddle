//import axios from 'axios';
//import queryString from 'query-string';

let loadingTries = 0;
let isLoading = false;
let googleMaps = null;
let callbacks = [];

let directionsService = null;
let placesService = null;

/**
 *
 */
const GoogleApi = {
  loadSDK: (key, callback) => {
    if (loadingTries > 3) {
      console.log('GoogleApi Error :: TOO MANY LOADING TRIES');
      return;
    }
    if (isLoading) {
      return;
    }

    loadingTries++;
    isLoading = true;

    if (callback) {
      callbacks.push(callback);
    }

    window.__googleMapsApiCallback = function() {
      isLoading = false;
      googleMaps = window.google.maps;

      if (callbacks.length) {
        for (let i = 0, len = callbacks.length; i < len; i++) {
          callbacks[i]();
        }
        callbacks = [];
      }
    };

    let tag = document.createElement('script');

    tag.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=__googleMapsApiCallback&libraries=places`;

    let body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
  },

  getDirections: parameters => {
    if (!googleMaps) {
      return new Promise(resolve => {
        callbacks.push(() => {
          GoogleApi.getDirections(parameters).then(response => {
            resolve(response);
          });
        });
        GoogleApi.loadSDK(parameters.key);
      });
    }

    if (!directionsService) {
      directionsService = new googleMaps.DirectionsService();
    }

    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin: parameters.origin,
          destination: parameters.destination,
          travelMode: 'WALKING',
        },
        (response, status) => {
          if (status === 'OK') {
            resolve(response);
          } else {
            reject(response);
          }
        }
      );
    });
  },

  nearbySearch: parameters => {
    if (!googleMaps) {
      return new Promise(resolve => {
        callbacks.push(() => {
          GoogleApi.nearbySearch(parameters).then(response => {
            resolve(response);
          });
        });
        GoogleApi.loadSDK(parameters.key);
      });
    }

    if (!placesService) {
      placesService = new googleMaps.places.PlacesService(
        document.createElement('div')
      );
    }

    return new Promise((resolve, reject) => {
      placesService.nearbySearch(parameters, (response, status) => {
        if (status === 'OK') {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  },
};
/*
export const GoogleApi = function(opts) {
  opts = opts || {};

  if (!GoogleMapsJSAPIScript) {
    throw 'GoogleMapsJSAPIScript is null';
  }

  const apiKey = opts.apiKey;
  const libraries = opts.libraries || [];
  const client = opts.client;
  const URL = 'https://maps.googleapis.com/maps/api/js';

  const googleVersion = '3.31';
  //let script = null;
  //let google = (window.google = null);
  //let loading = false;
  let channel = null;
  let language = null;
  let region = null;

  //let onLoadEvents = [];

  const url = () => {
    let url = URL;
    let params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region,
    };

    let paramStr = Object.keys(params)
      .filter(k => !!params[k])
      .map(k => `${k}=${params[k]}`)
      .join('&');

    return `${url}?${paramStr}`;
  };

  return url();
};*/

export default GoogleApi;
