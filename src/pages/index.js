import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import Details from 'components/Details';

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
    console.log('close drawer');
    this.setState({ detailsOpen: false });
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
          <Details closeDrawer={this.closeDrawer} />
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
