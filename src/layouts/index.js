import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import GoogleApi from 'libs/GoogleMapsApi';

import Header from '../components/header';
import './index.css';

const GOOGLE_MAPS_KEY = 'AIzaSyB5LJvHzh4qM4--_qxMLLunCEF3w_Tc3X4';

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

    this.var = 'hello';

    this.calculateMiddle = this.calculateMiddle.bind(this);
  }

  calculateMiddle(response) {
    const leg = response.routes[0].legs[0];
    const { duration, steps } = leg;

    const halfway = duration.value / 2;
    let runningTotal = 0;

    console.log('total time', duration.value, halfway);

    for (let i = 0, len = steps.length; i < len; i++) {
      const step = steps[i];
      const nextTotal = runningTotal + step.duration.value;
      if (nextTotal > halfway) {
        const middleLat =
          step.start_point.lat() +
          (step.end_point.lat() - step.start_point.lat()) / 2;
        const middleLng =
          step.start_point.lng() +
          (step.end_point.lng() - step.start_point.lng()) / 2;

        console.log('middle', middleLat, middleLng);

        GoogleApi.nearbySearch({
          key: GOOGLE_MAPS_KEY,
          location: {
            lat: middleLat,
            lng: middleLng,
          },
          radius: 300,
          openNow: true,
          //keyword: 'bar pub restaurant',
        })
          .then(response => {
            console.log('reponse', response);
          })
          .catch(response => {
            console.log('ERROR', response);
          });

        /*console.log('halfway', runningTotal, nextTotal);
        console.log(
          'start point',
          step.start_point.toString(),
          'start location',
          step.start_location.toString()
        );
        console.log(
          'end point',
          step.end_point.toString(),
          'end location',
          step.end_location.toString()
        );*/
        break;
      }
      runningTotal = nextTotal;
    }
  }

  componentDidMount() {
    /*GoogleApi.getDirections({
      key: GOOGLE_MAPS_KEY,
      origin: '104 Manning Ave, Toronto, Ontario',
      destination: '34 Maccaulay St, Toronto, Ontario',
    })
      .then(this.calculateMiddle)
      .catch(response => {
        console.log('API CATCH', response);
      });*/
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
        <Header siteTitle={data.site.siteMetadata.title} />

        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children()}
        </div>
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
