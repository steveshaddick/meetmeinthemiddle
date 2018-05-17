import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SwipeableViews from 'react-swipeable-views';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const ResultSlide = styled.div`
  position: relative;
`;

const NextButton = styled(Button)`
  float: right;
`;

const PrevButton = styled(Button)`
  float: left;
`;

/**
 *
 */
export default class ResultSlides extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      data: PropTypes.array,
      currentPlaceIndex: PropTypes.number,
      selectCurrentPlace: PropTypes.func,
    };
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'ResultSlides';
    //
    this.state = {};
  }

  handleChangeIndex = index => {
    this.props.selectCurrentPlace(index);
  };

  handleNext = () => {
    this.props.selectCurrentPlace(this.props.currentPlaceIndex + 1);
  };

  handleBack = () => {
    this.props.selectCurrentPlace(this.props.currentPlaceIndex - 1);
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
    const { data, currentPlaceIndex } = this.props;

    const slides = data.map(place => {
      return (
        <ResultSlide key={`slide_${place.id}`}>
          <h2>{place.name}</h2>
        </ResultSlide>
      );
    });

    return (
      <div data-component={name} className={name}>
        <SwipeableViews
          axis="x"
          index={currentPlaceIndex}
          onChangeIndex={this.handleChangeIndex}
        >
          {slides}
        </SwipeableViews>
        <NextButton
          size="small"
          onClick={this.handleNext}
          disabled={currentPlaceIndex === data.length - 1}
        >
          Next
          <KeyboardArrowRight />
        </NextButton>
        <PrevButton
          size="small"
          onClick={this.handleBack}
          disabled={currentPlaceIndex === 0}
        >
          Back
          <KeyboardArrowLeft />
        </PrevButton>
      </div>
    );
  }
}
