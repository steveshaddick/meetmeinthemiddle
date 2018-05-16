import React, { Component } from 'react';

import DetailsData from 'libs/DetailsData';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import Details from 'components/Details/Details';

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
    };
  }

  openDrawer = () => {
    this.setState({ detailsOpen: true });
  };

  closeDrawer = () => {
    this.setState({ detailsOpen: false });
    console.log(DetailsData.get());
  };

  updateData = newData => {
    console.log(newData);
  };

  render() {
    const { detailsOpen } = this.state;

    return (
      <div>
        <Drawer
          anchor="top"
          open={detailsOpen}
          onClose={() => {
            this.closeDrawer();
          }}
        >
          <Details
            closeDrawer={this.closeDrawer}
            updateData={this.updateData}
          />
        </Drawer>
        <Button
          disableRipple={true}
          onClick={() => {
            this.openDrawer();
          }}
        >
          open
        </Button>
      </div>
    );
  }
}

export default IndexPage;
