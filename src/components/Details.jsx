import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

import PersonDetails from 'components/PersonDetails';
import PlaceDetails from 'components/PlaceDetails';

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
export default class Details extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      closeDrawer: PropTypes.func,
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
  }

  handleNext = () => {
    console.log('NEXT');
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

  handleSearch = () => {
    console.log('search click', this);
    this.props.closeDrawer();
  };

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
    const { currentIndex } = this.state;

    return (
      <Container data-component={name} className={name}>
        <Tabs
          value={currentIndex}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="You" />
          <Tab label="Them" />
          <Tab label="The Spot" />
        </Tabs>

        <SwipeableViews
          axis={'x'}
          index={currentIndex}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          <PersonDetails />
          <PersonDetails />
          <PlaceDetails />
        </SwipeableViews>

        {currentIndex < 2 && (
          <NextButton
            size="small"
            onClick={this.handleNext}
            disabled={currentIndex === 2}
            disableRipple={true}
          >
            Next
            <KeyboardArrowRight />
          </NextButton>
        )}

        {currentIndex === 2 && (
          <NextButton
            size="small"
            onClick={this.handleSearch}
            disableRipple={true}
          >
            Search
            <KeyboardArrowRight />
          </NextButton>
        )}

        <PrevButton
          size="small"
          onClick={this.handleBack}
          disabled={currentIndex === 0}
          disableRipple={true}
        >
          <KeyboardArrowLeft />
          Back
        </PrevButton>
      </Container>
    );
  }
}
