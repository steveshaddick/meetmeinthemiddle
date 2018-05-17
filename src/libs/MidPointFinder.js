import GoogleApi from 'libs/GoogleMapsApi';

class MidPointFinder {
  constructor(params) {
    const { resultsCallback } = params;

    this.resultsCallback = resultsCallback;

    this.isSearching = false;
    this.searchData = null;
    this.searchResponses = {
      you: false,
      them: false,
      place: false,
    };
  }

  _checkReturn() {
    console.log('checking return', this.searchResponses);
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

    console.log('total time', youDuration.value, themDuration.value, meetTime);

    let runningTotal = 0;
    for (let i = 0, len = youSteps.length; i < len; i++) {
      const step = youSteps[i];
      const nextTotal = runningTotal + step.duration.value;
      if (nextTotal > meetTime) {
        const percentage = (meetTime - runningTotal) / step.duration.value;
        console.log(meetTime, runningTotal, step.duration);
        const middleLat =
          step.start_point.lat() +
          (step.end_point.lat() - step.start_point.lat()) * percentage;
        const middleLng =
          step.start_point.lng() +
          (step.end_point.lng() - step.start_point.lng()) * percentage;

        console.log('middle', percentage, middleLat, middleLng);

        GoogleApi.nearbySearch({
          location: {
            lat: middleLat,
            lng: middleLng,
          },
          radius: this.searchData.place.radius,
          openNow: true,
          keyword: this.searchData.place.searchTerms,
        })
          .then(response => {
            this.isSearching = false;
            this.resultsCallback(response);
          })
          .catch(response => {
            this.isSearching = false;
            console.log('nearby ERROR', response);
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
    console.log('travel', searchData.you.travelMode);
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
      });
  }
}

export default MidPointFinder;
