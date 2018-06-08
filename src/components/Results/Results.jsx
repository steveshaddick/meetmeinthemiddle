import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import GoogleApi from 'libs/GoogleMapsApi';

import CircularProgress from '@material-ui/core/CircularProgress';

import Map from './Map';
import ResultSlides from './ResultSlides';

import styledMediaQuery from 'styles/mediaquery';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: auto;
  z-index: 1;
  background: #ddd;

  & .ResultSlides {
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;

    transition: transform 300ms ease-in-out;
    transform: translate3d(0, 35vh, 0);

    ${styledMediaQuery.minTablet`
      transform: translate3d(0, 305px, 0);
    `};
  }

  & .Map {
    height: 100vh;
  }

  &.has-slides {
    & .ResultSlides {
      transform: translate3d(0, 0, 0);
    }

    & .Map {
      height: 65vh;
      ${styledMediaQuery.minTablet`
        height: 100vh;
      `};
    }
  }
`;

const SearchOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s;
  transform: translate3d(0, -100%, 0);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .search-progress {
    display: none !important;
  }

  & .error-message {
    display: none !important;
  }

  &.show {
    transform: translate3d(0, 0%, 0);

    &.is-searching {
      & .search-progress {
        display: block !important;
      }
    }

    &.is-error {
      & .error-message {
        display: block !important;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: white;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  background: rgba(200, 10, 10, 0.9);
  font-weight: bold;
  padding: 0.5rem 0.5rem;
  max-width: 300px;
  border-radius: 0.5rem;
  line-height: 1.25;
`;

/**
 *
 */
export default class Results extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      isSearching: PropTypes.bool,
      isError: PropTypes.bool,
      data: PropTypes.array,
      showResults: PropTypes.bool,
    };
  }

  /**
   *
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { isSearching, data } = nextProps;
    let newState = {
      isSearching,
    };

    if (isSearching && !prevState.isSearching) {
      newState = Object.assign(newState, {
        mapData: [],
        slidesData: [],
        currentPlaceIndex: null,
      });
    }

    if (!isSearching && prevState.isSearching) {
      let newMapData = [];
      let newSlidesData = [];

      if (Array.isArray(data)) {
        for (let i = 0, len = Math.min(data.length, 10); i < len; i++) {
          const place = data[i];

          newMapData.push({
            geometry: place.geometry,
            icon: place.icon,
            id: place.place_id,
            name: place.name,
          });
          newSlidesData.push({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
          });
        }
      }

      newState = Object.assign(newState, {
        mapData: newMapData,
        slidesData: newSlidesData,
        currentPlaceIndex: 0,
      });
    }

    return newState;
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'Results';
    //
    this.state = {
      isSearching: null,
      mapData: [],
      slidesData: [],
      currentPlaceIndex: null,
    };

    this.gettingPlaceDetailsId = false;
  }

  selectCurrentPlace = newIndex => {
    newIndex = newIndex < 0 ? this.state.mapData.length - 1 : newIndex;
    newIndex = newIndex > this.state.mapData.length - 1 ? 0 : newIndex;

    this.setState({
      currentPlaceIndex: newIndex,
      currentPlaceDetails: {},
    });
  };

  /**
   *
   */
  componentDidMount() {}

  /**
   *
   */
  componentDidUpdate(prevProps, prevState) {
    const { currentPlaceIndex, slidesData } = this.state;

    // I don't love this. Maybe this is actually better lower down, like in the individual slide.
    if (prevState.currentPlaceIndex !== currentPlaceIndex) {
      if (slidesData.length && slidesData[currentPlaceIndex]) {
        const placeId = slidesData[currentPlaceIndex].id;
        if (this.gettingPlaceDetailsId !== placeId) {
          this.gettingPlaceDetailsId = placeId;
          GoogleApi.getPlaceDetails(placeId).then(response => {
            if (this.gettingPlaceDetailsId === placeId) {
              this.gettingPlaceDetailsId = false;
              this.setState({
                currentPlaceDetails: response,
              });
            }
          });
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
    const { isSearching, showResults, isError } = this.props;
    const {
      mapData,
      slidesData,
      currentPlaceIndex,
      currentPlaceDetails,
    } = this.state;

    return (
      <Container
        data-component={name}
        className={classNames(name, {
          'has-slides': Array.isArray(slidesData) && slidesData.length,
        })}
      >
        <SearchOverlay
          className={classNames({
            show: isSearching || isError,
            'is-searching': isSearching,
            'is-error': isError,
          })}
        >
          <CircularProgress
            className="search-progress"
            thickness={5}
            style={{
              color: '#965679',
              display: 'block',
              margin: '0 auto',
            }}
          />

          <ErrorMessage className="error-message">
            Bah! Sorry, couldn&rsquo;t find anything. Please try another search.
          </ErrorMessage>
        </SearchOverlay>
        <Map
          data={mapData}
          selectCurrentPlace={this.selectCurrentPlace}
          currentPlaceIndex={currentPlaceIndex}
          showResults={showResults}
        />
        <ResultSlides
          data={slidesData}
          selectCurrentPlace={this.selectCurrentPlace}
          currentPlaceDetails={currentPlaceDetails}
          currentPlaceIndex={currentPlaceIndex}
        />
      </Container>
    );
  }
}
