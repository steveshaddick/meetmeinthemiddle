import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import './styles.styl';

/**
 *
 */
export default class __component__ extends Component {
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
    this.name = '__component__';
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
      <div data-component={name} className={name}>
        <div />
      </div>
    );
  }
}
