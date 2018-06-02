import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SwipeableViews from 'react-swipeable-views';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import ResultSlide from './ResultSlide';

import styledMediaQuery from 'styles/mediaquery';
import { purple } from 'styles/colours';

const Container = styled.section`
  max-width: 768px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.85);
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  border-bottom: 5px solid #965679;
  height: 35vh;

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

const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  padding: 1rem 0.25rem;
  flex: 1 0 auto;

  ${styledMediaQuery.minTablet`
    padding: 1rem 0rem;
  `};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  width: 30px;
  height: 50px;
  bottom: 0px;

  & button {
    border: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.85);

    & svg {
      position: absolute;
      top: 50%;
      margin-top: -0.5em;
      left: 50%;
      margin-left: -0.5em;
      color: ${purple};
      transform: translate3d(0px, 0, 0);
      transition: transform 300ms ease-in-out;
    }

    &:hover {
      background-color: ${purple};

      & svg {
        color: #fff;
      }
    }
  }

  &.prevButton {
    left: 0;

    & button {
      &:hover,
      &:focus {
        svg {
          transform: translate3d(-3px, 0, 0);
        }
      }
    }
  }

  &.nextButton {
    right: 0;

    & button {
      &:hover,
      &:focus {
        svg {
          transform: translate3d(3px, 0, 0);
        }
      }
    }
  }

  ${styledMediaQuery.minTablet`
    height: 100px;

    &.prevButton {
      left: -30px;

      & button {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
      }
    }

    &.nextButton {
      right: -30px;

      & button {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
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
    let newState = {};
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
        <ScrollContainer>
          <ContentWrapper>
            <SwipeableViews
              axis="x"
              index={currentPlaceIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              {slides}
            </SwipeableViews>
          </ContentWrapper>
        </ScrollContainer>

        <ButtonWrapper className="nextButton">
          <button onClick={this.handleNext}>
            <KeyboardArrowRight />
          </button>
        </ButtonWrapper>

        <ButtonWrapper className="prevButton">
          <button onClick={this.handleBack}>
            <KeyboardArrowLeft />
          </button>
        </ButtonWrapper>
      </Container>
    );
  }
}
