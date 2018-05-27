import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

import DetailsData from 'libs/DetailsData';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';

import { NextButton, PrevButton } from 'styles/theme';
import styledMediaQuery from 'styles/mediaquery';

import DetailsTabs from './DetailsTabs';
import PersonDetails from './PersonDetails';
import PlaceDetails from './PlaceDetails';

const Container = styled.section`
  width: 100%;
  height: 100%;
`;

const TabContainer = styled.div`
  display: none;
  padding: 1rem 1rem;
  font-size: 1.15rem;

  &.current-tab {
    display: block;
  }

  ${styledMediaQuery.minTablet`
    padding: 1rem 2rem;
  `};
`;

const ButtonsWrapper = styled.div`
  padding: 1rem 1rem;
  background: #eee;

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  ${styledMediaQuery.minTablet`
    padding: 1rem 2rem;
  `};
`;

const SearchButton = NextButton.extend`
  font-weight: 600;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  border: 2px solid #6d9656;
  color: #6d9656;

  &:enabled {
    &:hover,
    &:active {
      background-color: #6d9656;
      border-color: #50703f;
      color: #ffffff;
    }

    &:focus {
      border-color: #50703f;
      outline: none;
    }
  }
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  bottom: calc(-4rem - 5px);
  right: 0;
  width: 100%;
  height: 4rem;
  overflow: hidden;
`;

const CloseButton = styled.button`
  border: 0;
  background: #965679;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.25rem 1rem 0;
  border-bottom-left-radius: 1rem;
  cursor: pointer;
  transform: translate3d(0, -3rem, 0);
  transition: transform 0.3s cubic-bezier(0.82, 0.01, 1, 0.73);
  transition-delay: 350ms;
  border: 0.25rem solid #965679;

  & span {
    text-indent: -99999px;
    display: inline-block;
  }
  /*5e3727*/
  &:hover,
  &:active {
    background: #512e41;
    border-color: #512e41;
  }

  &:focus {
    border-color: #512e41;
    outline: none;
  }
`;

/**
 *
 */
export default class Details extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      closeDrawer: PropTypes.func,
      dirtyData: PropTypes.func,
    };
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'Details';

    //
    this.state = {
      currentIndex: 0,
    };

    this.isCloseButtonDown = false;
    this.refCloseButton = null;
  }

  handleNext = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
    }));
  };

  handleStepChange = currentIndex => {
    this.setState({ currentIndex });
  };

  handleTabChange = (event, value) => {
    this.setState({ currentIndex: value });
  };

  handleSearch = () => {
    DetailsData.commit();
    this.props.closeDrawer();
  };

  updateData = (type, key, value) => {
    DetailsData.change(type, key, value);
    this.props.dirtyData();
  };

  /**
   *
   */
  componentDidMount() {
    this.refCloseButton.setAttribute(
      'style',
      'transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0);'
    );
  }

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
    const { currentIndex } = this.state;

    return (
      <Container data-component={name} className={name}>
        <DetailsTabs
          currentIndex={currentIndex}
          handleTabChange={this.handleTabChange}
        />

        <TabContainer
          className={classNames({
            'current-tab': currentIndex == 0,
          })}
        >
          <p>Where are you at?</p>
          <PersonDetails
            initialData={DetailsData.get('you')}
            updateData={(key, value) => {
              this.updateData('you', key, value);
            }}
          />
        </TabContainer>

        <TabContainer
          className={classNames({
            'current-tab': currentIndex == 1,
          })}
        >
          <p>Where are they at?</p>
          <PersonDetails
            initialData={DetailsData.get('them')}
            updateData={(key, value) => {
              this.updateData('them', key, value);
            }}
          />
        </TabContainer>

        <TabContainer
          className={classNames({
            'current-tab': currentIndex == 2,
          })}
        >
          <p>Any spot in mind?</p>
          <PlaceDetails
            initialData={DetailsData.get('place')}
            updateData={(key, value) => {
              this.updateData('place', key, value);
            }}
          />
        </TabContainer>

        <ButtonsWrapper>
          {currentIndex < 2 && (
            <NextButton
              size="small"
              onClick={this.handleNext}
              disabled={currentIndex === 2}
              disableRipple={true}
            >
              <span>Next</span>
              <KeyboardArrowRight />
            </NextButton>
          )}

          {currentIndex === 2 && (
            <SearchButton
              size="small"
              onClick={this.handleSearch}
              disableRipple={true}
            >
              <span>Search</span>
            </SearchButton>
          )}

          <PrevButton
            size="small"
            onClick={this.handleBack}
            disabled={currentIndex === 0}
            disableRipple={true}
          >
            <KeyboardArrowLeft />
            <span>Back</span>
          </PrevButton>
        </ButtonsWrapper>

        <CloseButtonWrapper>
          <CloseButton
            onClick={this.props.closeDrawer}
            innerRef={ref => {
              this.refCloseButton = ref;
            }}
          >
            <span>Close</span>
            <CloseIcon />
          </CloseButton>
        </CloseButtonWrapper>
      </Container>
    );
  }
}
