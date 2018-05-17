import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';

import DetailsData from 'libs/DetailsData';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';

import DetailsTabs from './DetailsTabs';
import PersonDetails from './PersonDetails';
import PlaceDetails from './PlaceDetails';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const NextButton = styled(Button)`
  float: right;
`;

const PrevButton = styled(Button)`
  float: left;
`;

const CloseButton = styled.button`
  border: 0;
  background: #965679;
  color: #fff;
  position: absolute;
  bottom: -2.75rem;
  right: 1rem;
  padding: 0.25rem 1rem;
  border-bottom-left-radius: 1rem;
  cursor: pointer;

  & span {
    text-indent: -99999px;
    display: inline-block;
  }
`;

const TabContainer = styled.div`
  display: none;

  &.current-tab {
    display: block;
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
          <PlaceDetails
            initialData={DetailsData.get('place')}
            updateData={(key, value) => {
              this.updateData('place', key, value);
            }}
          />
        </TabContainer>

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

        <CloseButton onClick={this.props.closeDrawer}>
          <span>Close</span>
          <CloseIcon />
        </CloseButton>
      </Container>
    );
  }
}
