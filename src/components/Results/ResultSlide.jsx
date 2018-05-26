import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DetailsData from 'libs/DetailsData';

const Container = styled.div`
  position: relative;
`;

const PlaceWrapper = styled.div`
  float: left;
  width: 75%;
`;

const UtilityWrapper = styled.div`
  float: right;
  width: 25%;
`;

const ResultSlide = ({ id, name, address }) => {
  const youAddress = DetailsData.get('you', 'address');
  const themAddress = DetailsData.get('them', 'address');
  const youTravelMode = DetailsData.get('you', 'travelMode');
  const themTravelMode = DetailsData.get('them', 'travelMode');

  return (
    <Container data-component="ResultSlide" className="ResultSlide">
      <PlaceWrapper>
        <h2>{name}</h2>
      </PlaceWrapper>
      <UtilityWrapper>
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            youAddress
          )}&destination=${encodeURIComponent(
            address
          )}&destination_place_id=${id}&travelmode=${youTravelMode.toLowerCase()}`}
          target="_blank"
        >
          Directions for you
        </a>
        <br />
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            themAddress
          )}&destination=${encodeURIComponent(
            address
          )}&destination_place_id=${id}&travelmode=${themTravelMode.toLowerCase()}`}
          target="_blank"
        >
          Directions for them
        </a>
      </UtilityWrapper>
    </Container>
  );
};

ResultSlide.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
};

export default ResultSlide;
