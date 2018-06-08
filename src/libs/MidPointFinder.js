import GoogleApi from 'libs/GoogleMapsApi';

class MidPointFinder {
  constructor(params) {
    const { resultsCallback, errorCallback } = params;

    this.resultsCallback = resultsCallback;
    this.errorCallback = errorCallback;

    this.isSearching = false;
    this.searchData = null;
    this.searchResponses = {
      you: false,
      them: false,
      place: false,
    };
  }

  _checkReturn() {
    if (this.searchResponses.you && this.searchResponses.them) {
      this._getMiddleRoute();
    }
  }

  _getMiddleRoute() {
    const youRoute = this.searchResponses.you.routes[0].legs[0];
    const themRoute = this.searchResponses.them.routes[0].legs[0];
    const { duration: youDuration, steps: youSteps } = youRoute;
    const { duration: themDuration } = themRoute;

    //const shortestRoute = youDuration < themDuration ? 'you' : 'them';
    const meetTime =
      youDuration.value *
      (1 - youDuration.value / (youDuration.value + themDuration.value));

    let runningTotal = 0;
    for (let i = 0, len = youSteps.length; i < len; i++) {
      const step = youSteps[i];
      const nextTotal = runningTotal + step.duration.value;

      if (nextTotal > meetTime) {
        const percentage = (meetTime - runningTotal) / step.duration.value;
        const middleLat =
          step.start_point.lat() +
          (step.end_point.lat() - step.start_point.lat()) * percentage;
        const middleLng =
          step.start_point.lng() +
          (step.end_point.lng() - step.start_point.lng()) * percentage;

        const searchParams = {
          location: {
            lat: middleLat,
            lng: middleLng,
          },
          radius: this.searchData.place.radius,
          openNow: true,
          keyword: this.searchData.place.searchTerms,
        };

        GoogleApi.nearbySearch(searchParams)
          .then(response => {
            //console.log('response', response);
            this.isSearching = false;
            this.resultsCallback(response);
          })
          .catch(() => {
            // increase search radius

            searchParams.radius = 1000;
            GoogleApi.nearbySearch(searchParams)
              .then(response => {
                //console.log('response', response);
                this.isSearching = false;
                this.resultsCallback(response);
              })
              .catch(() => {
                // increase search radius

                searchParams.radius = 5000;
                GoogleApi.nearbySearch(searchParams)
                  .then(response => {
                    //console.log('response', response);
                    this.isSearching = false;
                    this.resultsCallback(response);
                  })
                  .catch(response => {
                    // give up
                    this.isSearching = false;
                    console.log('nearby ERROR', response);
                    this.errorCallback(response);
                  });
              });
          });
        break;
      }
      runningTotal = nextTotal;
    }
  }

  find(searchData) {
    if (this.isSearching) {
      console.log('MidPointFinder :: already searching');
      return;
    }

    console.log('searching...', searchData);

    this.isSearching = true;
    this.searchData = searchData;
    this.searchResponses = {
      you: false,
      them: false,
      places: false,
    };

    GoogleApi.getDirections({
      origin: searchData.you.address,
      destination: searchData.them.address,
      travelMode: searchData.you.travelMode,
    })
      .then(response => {
        this.searchResponses.you = response;
        this._checkReturn();
      })
      .catch(response => {
        console.log('API CATCH', response);
        this.errorCallback(response);
        this.isSearching = false;
      });

    GoogleApi.getDirections({
      origin: searchData.them.address,
      destination: searchData.you.address,
      travelMode: searchData.them.travelMode,
    })
      .then(response => {
        this.searchResponses.them = response;
        this._checkReturn();
      })
      .catch(response => {
        console.log('API CATCH', response);
        this.errorCallback(response);
        this.isSearching = false;
      });
  }
}

export default MidPointFinder;
