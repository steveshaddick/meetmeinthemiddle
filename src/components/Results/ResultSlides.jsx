import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SwipeableViews from 'react-swipeable-views';
import Modal from '@material-ui/core/Modal';

import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ShareIcon from '@material-ui/icons/Share';

import ResultSlide from './ResultSlide';

import { NextButton } from 'styles/theme';
import styledMediaQuery from 'styles/mediaquery';
import { purple } from 'styles/colours';

import DetailsData from 'libs/DetailsData';

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

    &:hover,
    &:focus {
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

const ShareButtonWrapper = styled.div`
  position: absolute;
  top: calc(-100vh + 35vh + 5px);
  right: auto;
  left: 0;

  ${styledMediaQuery.minTablet`
    top: 24px;
    right: calc(-0.5rem - 18px);
    left: auto;
  `};
`;

const ShareButton = styled.button`
  border: 0;
  cursor: pointer;
  background: none;
  padding: 0;

  & .button-inner {
    background: rgba(255, 255, 255, 0.85);
    border-bottom-right-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    position: relative;
    z-index: 10;

    ${styledMediaQuery.minTablet`
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      padding: 0.5rem 0.35rem 0.5rem 0.15rem;
    `};
  }

  & svg {
    color: ${purple};
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }

  & .share-title {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.75rem;
    display: block;
    width: 5rem;
    padding: 0.25rem;
    background: rgba(255, 255, 255, 0.75);
    color: ${purple};
    z-index: 10;

    transform: translate3d(5.5rem, 0, 0);
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
  }

  &:hover,
  &:focus {
    & .button-inner {
      background: ${purple};
    }

    & .share-title {
      opacity: 1;
      transform: translate3d(4.5rem, 0, 0);
    }

    & svg {
      color: #fff;
    }
  }
`;

const ModalBoxWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  outline: none;
`;

const ModalBox = styled.div`
  width: 20rem;
  background: #fff;
  padding: 2rem 2rem 1rem;
  border-top: 5px solid ${purple};

  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;

  & .share-text {
    display: block;
    color: #aaa;
  }

  & .share-url {
    border: 1px solid #eee;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = NextButton.extend`
  padding-right: 0.5rem;
  padding-left: 0.25rem;

  font-size: 0.85rem;
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
      modalOpen: false,
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
  handleModalOpen = () => {
    this.setState({
      modalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  /**
   *
   */
  handleShareUrlFocus = event => {
    event.target.select();
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
    const { modalOpen } = this.state;

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

    const shareUrl = modalOpen ? DetailsData.getShareUrl() : '';

    return (
      <Container
        data-component={name}
        className={name}
        innerRef={ref => {
          this.ref = ref;
        }}
      >
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={this.handleModalClose}
        >
          <ModalBoxWrapper>
            <ModalBox>
              <span className="share-text">Share this url:</span>
              <input
                className="share-url"
                onFocus={this.handleShareUrlFocus}
                onSelect={this.handleShareUrlFocus}
                readOnly="readonly"
                value={shareUrl}
              />
              <CloseModalButton onClick={this.handleModalClose}>
                Close
              </CloseModalButton>
            </ModalBox>
          </ModalBoxWrapper>
        </Modal>

        <ShareButtonWrapper>
          <ShareButton onClick={this.handleModalOpen}>
            <div className="share-title">Share URL</div>
            <div className="button-inner">
              <ShareIcon />
            </div>
          </ShareButton>
        </ShareButtonWrapper>

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
            <KeyboardArrowRightIcon />
          </button>
        </ButtonWrapper>

        <ButtonWrapper className="prevButton">
          <button onClick={this.handleBack}>
            <KeyboardArrowLeftIcon />
          </button>
        </ButtonWrapper>
      </Container>
    );
  }
}
