import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import Map from './Map';
import ResultSlides from './ResultSlides';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: auto;
`;

const SearchOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
  transform: translate3d(0, -100%, 0);
  z-index: 1000;

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
  static getDerivedStateFromProps(nextProps) {
    let newMapData = [];
    let newSlidesData = [];
    let newCurrentPlaceIndex = null;

    if (Array.isArray(nextProps.data)) {
      for (let i = 0, len = Math.min(nextProps.data.length, 10); i < len; i++) {
        const place = nextProps.data[i];

        newMapData.push({
          geometry: place.geometry,
          icon: place.icon,
          id: place.place_id,
          name: place.name,
        });

        newSlidesData.push({
          id: place.place_id,
          name: place.name,
        });
      }
      newCurrentPlaceIndex = 0;
    }

    return {
      mapData: newMapData,
      slidesData: newSlidesData,
      currentPlaceIndex: newCurrentPlaceIndex,
    };
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'Results';
    //
    this.state = {
      mapData: null,
      slidesData: null,
      currentPlaceIndex: null,
    };
  }

  selectCurrentPlace = newIndex => {
    newIndex = newIndex < 0 ? this.props.data.length - 1 : newIndex;
    newIndex = newIndex > this.props.data.length - 1 ? 0 : newIndex;

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
        />
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