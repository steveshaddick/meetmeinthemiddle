import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DetailsData from 'libs/DetailsData';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

import PersonDetails from './PersonDetails';
import PlaceDetails from './PlaceDetails';

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
    this.render();
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
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="You" />
          <Tab label="Them" />
          <Tab label="Where" />
        </Tabs>

        <SwipeableViews
          axis={'x'}
          index={currentIndex}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          <PersonDetails
            initialData={DetailsData.get('you')}
            updateData={(key, value) => {
              this.updateData('you', key, value);
            }}
          />
          <PersonDetails
            initialData={DetailsData.get('them')}
            updateData={(key, value) => {
              this.updateData('them', key, value);
            }}
          />
          <PlaceDetails
            initialData={DetailsData.get('place')}
            updateData={(key, value) => {
              this.updateData('place', key, value);
            }}
          />
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
