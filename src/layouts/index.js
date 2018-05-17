import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './index.css';

class Layout extends Component {
  static get propTypes() {
    return {
      children: PropTypes.func,
      data: PropTypes.object,
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { children, data } = this.props;

    return (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />

        <div>{children()}</div>
      </div>
    );
  }
}

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
