import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import DetailsData from 'libs/DetailsData';
import MidPointFinder from 'libs/MidPointFinder';

import Drawer from '@material-ui/core/Drawer';

import Details from 'components/Details/Details';
import Results from 'components/Results/Results';

const Container = styled.div`
  &.details-open {
    .drawer-button {
      transition-delay: 0;
      transform: translate3d(0, -50px, 0);
    }
  }
`;

const TopBorder = styled.div`
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #965679;
  z-index: 1000;
`;

const DetailsDrawer = styled(Drawer)`
  &.drawer-wrapper {
    display: block;
  }

  & .drawer-content {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    border-bottom: 5px solid #965679;
  }
`;

const DrawerButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 700px;
  z-index: 1000;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const DrawerButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  z-index: 1000;
  border: 0;
  padding: 0.25rem 1.25rem 0.25rem;
  font-weight: 500;
  background-color: #965679;
  color: #fff;
  border-bottom-left-radius: 1rem;
  cursor: pointer;
  transform: translate3d(0, 0px, 0);
  transition: 0.3s transform cubic-bezier(0.82, 0.01, 1, 0.73);
  transition-delay: 350ms;
  border: 0.25rem solid #965679;

  &:hover,
  &:active {
    background: #512e41;
    border-color: #512e41;
  }

  &:focus {
    border: 0.25rem solid #512e41;
    outline: none;
  }
`;

/**
 *
 */
class IndexPage extends Component {
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
    this.name = 'Details';
    //
    this.state = {
      detailsOpen: false,
      isDirtyData: false,
      searchingNewResults: false,
      resultsData: null,
    };

    this.refDrawerButton = null;

    this.midPointFinder = new MidPointFinder({
      resultsCallback: this.midPointResults,
    });
  }

  openDrawer = () => {
    this.setState({
      detailsOpen: true,
      isDirtyData: false,
    });
  };

  closeDrawer = () => {
    const { isDirtyData } = this.state;

    this.setState({ detailsOpen: false });

    if (isDirtyData) {
      this.findMidPoint();
    }
  };

  dirtyData = () => {
    this.setState({
      isDirtyData: true,
    });
  };

  findMidPoint = () => {
    this.midPointFinder.find(DetailsData.get());
    this.setState({
      searchingNewResults: true,
    });
  };

  midPointResults = response => {
    this.setState({
      searchingNewResults: false,
      resultsData: response,
    });
  };

  /**
   *
   */
  componentDidMount() {
    this.findMidPoint();
  }

  /**
   *
   */
  componentDidUpdate() {}

  render() {
    const { detailsOpen, searchingNewResults, resultsData } = this.state;

    return (
      <Container className={classNames({ 'details-open': detailsOpen })}>
        <DetailsDrawer
          anchor="top"
          open={detailsOpen}
          className="drawer-wrapper"
          onClose={() => {
            this.closeDrawer();
          }}
          PaperProps={{
            className: 'drawer-content',
          }}
        >
          <Details
            closeDrawer={this.closeDrawer}
            updateData={this.updateData}
            dirtyData={this.dirtyData}
          />
        </DetailsDrawer>

        <TopBorder />

        <DrawerButtonWrapper>
          <DrawerButton
            className="drawer-button"
            onClick={() => {
              this.openDrawer();
            }}
            ref={ref => {
              this.refDrawerButton = ref;
            }}
          >
            Search
          </DrawerButton>
        </DrawerButtonWrapper>

        <Results
          isSearching={searchingNewResults}
          data={resultsData}
          showResults={Array.isArray(resultsData)}
        />
      </Container>
    );
  }
}

export default IndexPage;
