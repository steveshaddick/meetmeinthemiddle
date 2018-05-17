import React, { Component } from 'react';
import styled from 'styled-components';

import DetailsData from 'libs/DetailsData';
import MidPointFinder from 'libs/MidPointFinder';

import Drawer from '@material-ui/core/Drawer';

import Details from 'components/Details/Details';
import Results from 'components/Results/Results';

const DetailsDrawer = styled(Drawer)`
  & .drawer-modal {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const DrawerButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  border: 0;
  padding: 1rem;
  background-color: #965679;
  color: #fff;
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

  render() {
    const { detailsOpen, searchingNewResults, resultsData } = this.state;

    return (
      <div>
        <DetailsDrawer
          anchor="top"
          open={detailsOpen}
          onClose={() => {
            this.closeDrawer();
          }}
          PaperProps={{
            className: 'drawer-modal',
          }}
        >
          <Details
            closeDrawer={this.closeDrawer}
            updateData={this.updateData}
            dirtyData={this.dirtyData}
          />
        </DetailsDrawer>
        <DrawerButton
          onClick={() => {
            this.openDrawer();
          }}
        >
          open
        </DrawerButton>

        <Results
          isSearching={searchingNewResults}
          data={resultsData}
          showResults={Array.isArray(resultsData)}
        />
      </div>
    );
  }
}

export default IndexPage;
