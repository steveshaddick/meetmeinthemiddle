import React, { Component } from 'react';
import styled from 'styled-components';

import DetailsData from 'libs/DetailsData';
import MidPointFinder from 'libs/MidPointFinder';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import Details from 'components/Details/Details';
import Results from 'components/Results/Results';

const GOOGLE_MAPS_KEY = 'AIzaSyB5LJvHzh4qM4--_qxMLLunCEF3w_Tc3X4';

const DetailsDrawer = styled(Drawer)`
  & .drawer-modal {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
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
      dirtyData: false,
      searchingNewResults: false,
      resultsData: null,
    };

    this.midPointFinder = new MidPointFinder({
      key: GOOGLE_MAPS_KEY,
      resultsCallback: this.midPointResults,
    });
  }

  openDrawer = () => {
    this.setState({
      detailsOpen: true,
      dirtyData: false,
    });
  };

  closeDrawer = () => {
    const { dirtyData } = this.state;

    this.setState({ detailsOpen: false });

    if (dirtyData) {
      this.findMidPoint();
    }
  };

  dirtyData = () => {
    this.setState({
      dirtyData: true,
    });
  };

  findMidPoint = () => {
    console.log('getting new search');
    this.midPointFinder.find(DetailsData.get());
    this.setState({
      searchingNewResults: true,
    });
  };

  midPointResults = response => {
    console.log('CALLBACK', response);
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
          />
        </DetailsDrawer>
        <Button
          disableRipple={true}
          onClick={() => {
            this.openDrawer();
          }}
        >
          open
        </Button>

        <Results isSearching={searchingNewResults} data={resultsData} />
      </div>
    );
  }
}

export default IndexPage;
