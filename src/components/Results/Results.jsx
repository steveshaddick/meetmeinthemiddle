import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

import Map from './Map';
import ResultSlides from './ResultSlides';

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

  &.show {
    transform: translate3d(0, 0%, 0);
  }
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
          console.log(place);
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
  }

  selectCurrentPlace = newIndex => {
    newIndex = newIndex < 0 ? this.state.mapData.length - 1 : newIndex;
    newIndex = newIndex > this.state.mapData.length - 1 ? 0 : newIndex;

    this.setState({
      currentPlaceIndex: newIndex,
    });
  };

  /**
   *
   */
  componentDidMount() {}

  /**
   *
   */
  componentDidUpdate() {}

  /**
   *
   */
  componentWillUnmount() {}

  /**
   *
   */
  render() {
    const { name } = this;
    const { isSearching, showResults } = this.props;
    const { mapData, slidesData, currentPlaceIndex } = this.state;

    return (
      <Container data-component={name} className={name}>
        <SearchOverlay
          className={classNames({
            show: isSearching,
          })}
        >
          <CircularProgress
            thickness={5}
            style={{
              color: '#965679',
              display: 'block',
              margin: '0 auto',
            }}
          />
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
          currentPlaceIndex={currentPlaceIndex}
        />
      </Container>
    );
  }
}
