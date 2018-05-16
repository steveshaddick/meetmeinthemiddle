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
      data: PropTypes.object,
    };
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'Results';
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
    const { isSearching } = this.props;

    return (
      <Container data-component={name} className={name}>
        <SearchOverlay
          className={classNames({
            show: isSearching,
          })}
        />
        <Map />
        <ResultSlides />
      </Container>
    );
  }
}
