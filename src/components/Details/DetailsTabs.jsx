import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = () => ({
  root: {
    borderBottom: '1px solid #f6efe1',
  },

  tab: {
    color: '#aaa',
  },

  tabsIndicator: {
    backgroundColor: '#965679',
  },

  tabSelected: {
    color: '#965679',
  },
});

const DetailsTabs = ({ classes, currentIndex, handleTabChange }) => {
  return (
    <div data-component="DetailsTabs" className="DetailsTabs">
      <Tabs
        value={currentIndex}
        onChange={handleTabChange}
        fullWidth
        classes={{ root: classes.root, indicator: classes.tabsIndicator }}
      >
        <Tab
          classes={{
            textColorInherit: classes.tab,
            selected: classes.tabSelected,
          }}
          disableRipple={true}
          label="You"
        />

        <Tab
          classes={{
            textColorInherit: classes.tab,
            selected: classes.tabSelected,
          }}
          disableRipple={true}
          label="Them"
        />

        <Tab
          classes={{
            textColorInherit: classes.tab,
            selected: classes.tabSelected,
          }}
          disableRipple={true}
          label="Where"
        />
      </Tabs>
    </div>
  );
};

DetailsTabs.propTypes = {
  currentIndex: PropTypes.number,
  handleTabChange: PropTypes.func,
  classes: PropTypes.object,
};

export default withStyles(styles)(DetailsTabs);
