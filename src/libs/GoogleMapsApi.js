//import axios from 'axios';
//import queryString from 'query-string';

const GOOGLE_MAPS_KEY = 'AIzaSyB5LJvHzh4qM4--_qxMLLunCEF3w_Tc3X4';

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
        GoogleApi.loadSDK(GOOGLE_MAPS_KEY);
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
          travelMode: parameters.travelMode,
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
        GoogleApi.loadSDK(GOOGLE_MAPS_KEY);
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

  loadMap: (element, parameters) => {
    if (!googleMaps) {
      return new Promise(resolve => {
        callbacks.push(() => {
          GoogleApi.loadMap(element, parameters).then(map => {
            resolve({
              googleMaps,
              map,
            });
          });
        });
        GoogleApi.loadSDK(GOOGLE_MAPS_KEY);
      });
    }

    return new Promise(resolve => {
      resolve({
        googleMaps,
        map: new googleMaps.Map(element, parameters),
      });
    });
  },
};

export default GoogleApi;
