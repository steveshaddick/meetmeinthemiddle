import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GoogleMapsApi from 'libs/GoogleMapsApi';

import map_jpg from 'images/map.jpg';

const Container = styled.div`
  width: 100%;
  height: 400px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${map_jpg});
  background-size: cover;
  background-repeat: no-repeat;
`;

/**
 *
 */
export default class Map extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      data: PropTypes.array,
      currentPlaceIndex: PropTypes.number,
      showResults: PropTypes.bool,
      selectCurrentPlace: PropTypes.func,
    };
  }

  /**
   *
   */
  static getDerivedStateFromProps() {
    return null;
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'Map';

    this.map = null;
    this.googleMaps = null;
    this.refMap = null;

    this.isLoadingMap = false;

    //
    this.state = {
      places: null,
    };
  }

  clearMarkers = () => {
    if (this.state.places) {
      this.state.places.forEach(place => {
        place.marker.setMap(null);
        //place.marker.removeListener('click');
      });
    }

    this.setState(() => ({
      places: null,
    }));
  };

  showPlaces = () => {
    const { data } = this.props;
    this.clearMarkers();

    let newPlaces = [];
    data.map((place, index) => {
      const marker = new this.googleMaps.Marker({
        position: place.geometry.location,
        map: this.map,
        title: place.name,
      });

      marker.addListener('click', () => {
        this.props.selectCurrentPlace(index);
      });

      newPlaces.push({
        place: place,
        marker: marker,
      });
    });

    this.setState(
      () => ({
        places: newPlaces,
      }),
      this.setMapViewport
    );
  };

  setMapViewport = () => {
    const { places } = this.state;
    const { currentPlaceIndex } = this.props;

    if (places.length && places[currentPlaceIndex]) {
      const place = places[currentPlaceIndex];
      this.map.setCenter(place.place.geometry.viewport.getCenter());
    }
  };

  /**
   *
   */
  componentDidMount() {}

  /**
   *
   */
  componentDidUpdate(prevProps) {
    const { showResults, data, currentPlaceIndex } = this.props;

    if (showResults) {
      if (!this.map) {
        if (!this.isLoadingMap) {
          this.isLoadingMap = true;
          GoogleMapsApi.loadMap(this.refMap, {
            center: { lat: 43.6532, lng: -79.3832 },
            zoom: 15,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            gestureHandling: 'cooperative',
          }).then(response => {
            this.map = response.map;
            this.googleMaps = response.googleMaps;
            this.showPlaces();
            this.setMapViewport();
          });
        }
      } else {
        if (prevProps.data != data) {
          console.log('DATA NOT SAME', prevProps.data, data);
          this.showPlaces();
        }
        if (prevProps.currentPlaceIndex != currentPlaceIndex) {
          this.setMapViewport();
        }
      }
    }
  }

  /**
   *
   */
  componentWillUnmount() {}

  /**
   *
   */
  render() {
    const { name } = this;

    return (
      <Container data-component={name} className={name}>
        <MapWrapper
          id="map"
          innerRef={ref => {
            this.refMap = ref;
          }}
        />
      </Container>
    );
  }
}
