import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = () => ({
  tabsIndicator: {
    backgroundColor: '#965679',
  },

  tabSelected: {
    color: '#965679',
  },
});

class DetailsTabs extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      currentIndex: PropTypes.number,
      handleTabChange: PropTypes.func,
      classes: PropTypes.object,
    };
  }

  render() {
    const { classes, currentIndex, handleTabChange } = this.props;

    return (
      <div data-component="DetailsTabs" className="DetailsTabs">
        <Tabs
          value={currentIndex}
          onChange={handleTabChange}
          fullWidth
          classes={{ indicator: classes.tabsIndicator }}
        >
          <Tab
            classes={{
              selected: classes.tabSelected,
            }}
            disableRipple={true}
            label="You"
          />

          <Tab
            classes={{
              selected: classes.tabSelected,
            }}
            disableRipple={true}
            label="Them"
          />

          <Tab
            classes={{
              selected: classes.tabSelected,
            }}
            disableRipple={true}
            label="Where"
          />
        </Tabs>
      </div>
    );
  }
}

export default withStyles(styles)(DetailsTabs);
