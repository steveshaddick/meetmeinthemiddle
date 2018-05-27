import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withPrefix } from 'gatsby-link';

import GoogleMapsApi from 'libs/GoogleMapsApi';

import styledMediaQuery from 'styles/mediaquery';

import map_jpg from 'images/map.jpg';

const Container = styled.section`
  width: 100%;
  height: 65vh;

  ${styledMediaQuery.minTablet`
    height: 100vh;
  `};
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
      currentMarker: null,
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
        icon: {
          url: withPrefix('/images/meetme_icon.svg'),
        },
      });

      marker.addListener('click', () => {
        this.props.selectCurrentPlace(index);
      });

      marker.setOpacity(0.25);
      marker.setZIndex(1);

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
    const { places, currentMarker } = this.state;
    const { currentPlaceIndex } = this.props;

    if (places.length && places[currentPlaceIndex]) {
      const place = places[currentPlaceIndex];
      const newMarker = place.marker;
      this.map.panTo(place.place.geometry.viewport.getCenter());

      if (currentMarker) {
        currentMarker.setOpacity(0.25);
        currentMarker.setZIndex(1);
      }

      newMarker.setOpacity(1);
      newMarker.setZIndex(10);

      this.setState({
        currentMarker: newMarker,
      });
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
            zoom: 16,
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
          //console.log('DATA NOT SAME', prevProps.data, data);
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
