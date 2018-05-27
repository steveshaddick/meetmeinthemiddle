import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import ResultSlide from './ResultSlide';

import { NextButton, PrevButton } from 'styles/theme';
import styledMediaQuery from 'styles/mediaquery';

const Container = styled.section`
  max-width: 768px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.85);
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  border-bottom: 5px solid #965679;
  height: 35vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  ${styledMediaQuery.minTablet`
    min-height: 0;
    max-height: 305px;
  `};
`;

const ContentWrapper = styled.div`
  padding: 0rem 1.5rem;
  flex: 1 0 auto;

  ${styledMediaQuery.minTablet`
    padding: 0.5rem 1.5rem;
  `};
`;

const ButtonsWrapper = styled.div`
  padding: 0.5rem 1rem;
  background: #eee;
  margin-top: 1rem;

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  ${styledMediaQuery.minTablet`
    padding: 1rem 2rem;
  `};
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
      currentPlaceDetails: PropTypes.object,
    };
  }

  /**
   *
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {
      meetText: '',
    };
    const idsCache = nextProps.data.reduce((idsCache, { id }) => {
      return (idsCache += id);
    }, '');

    if (
      (idsCache !== '',
      prevState.idsCache !== idsCache ||
        nextProps.currentPlaceIndex !== prevState.currentPlaceIndex)
    ) {
      newState.idsCache = idsCache;
      newState.currentPlaceIndex = nextProps.currentPlaceIndex; // this is an example of the new getDerivedStateFromProps not being that great

      const rnd = Math.random();
      let meetText = 'You should totally meet at:';
      if (rnd < 0.2) {
        meetText = 'How about:';
      } else if (rnd < 0.4) {
        meetText = "Here's a spot:";
      } else if (rnd < 0.6) {
        meetText = 'This is nearby:';
      } else if (rnd < 0.7) {
        meetText = "This one's not bad:";
      } else if (rnd < 0.8) {
        meetText = 'What do you think of:';
      } else if (rnd < 0.9) {
        meetText = 'Why not:';
      }

      newState.meetText = meetText;
    }

    return newState;
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'ResultSlides';
    //
    this.state = {
      idsCache: '',
      meetText: '',
      currentPlaceIndex: 0,
    };

    this.ref = null;
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
  componentDidUpdate(prevProps) {
    if (prevProps.currentPlaceIndex !== this.state.currentPlaceIndex) {
      this.ref.scrollTop = 0;
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
    const { data, currentPlaceIndex, currentPlaceDetails } = this.props;
    const { meetText } = this.state;

    const slides = data.map((place, index) => {
      const details = index === currentPlaceIndex ? currentPlaceDetails : null;
      return (
        <ResultSlide
          key={`slide_${place.id}`}
          id={place.id}
          name={place.name}
          address={place.address}
          website={details ? details.website : null}
          formattedAddress={details ? details.adr_address : null}
          photos={details ? details.photos : null}
          types={details ? details.types : null}
        />
      );
    });

    return (
      <Container
        data-component={name}
        className={name}
        innerRef={ref => {
          this.ref = ref;
        }}
      >
        <ContentWrapper>
          <p>{meetText}</p>

          <SwipeableViews
            axis="x"
            index={currentPlaceIndex}
            onChangeIndex={this.handleChangeIndex}
          >
            {slides}
          </SwipeableViews>
        </ContentWrapper>

        <ButtonsWrapper>
          <NextButton size="small" onClick={this.handleNext}>
            Next
            <KeyboardArrowRight />
          </NextButton>
          <PrevButton size="small" onClick={this.handleBack}>
            <KeyboardArrowLeft />
            Back
          </PrevButton>
        </ButtonsWrapper>
      </Container>
    );
  }
}
