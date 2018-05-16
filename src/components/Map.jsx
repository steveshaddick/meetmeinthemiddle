import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    return {};
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'Map';
    //
    this.state = {};
  }

  /**
   *
   */
  UNSAFE_componentWillMount() {}

  /**
   *
   */
  componentDidMount() {}

  /**
   *
   */
  UNSAFE_componentWillReceiveProps() {}

  /**
   *
   */
  UNSAFE_componentWillUpdate() {}

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

    return (
      <Container data-component={name} className={name}>
        <MapWrapper />
      </Container>
    );
  }
}
