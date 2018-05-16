import React from 'react';
import PropTypes from 'prop-types';

import './styles.styl';

const __component__ = ({ prop1 }) => {
  return (
    <div data-component="__component__" className="__component__">
      <div>
        {prop1}
      </div>
    </div>
  );
};

__component__.propTypes = { prop1: PropTypes.string };
__component__.defaultProps = { prop1: 'Hello World!' };

export default __component__;
