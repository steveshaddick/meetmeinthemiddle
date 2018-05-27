import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DetailsData from 'libs/DetailsData';

import { Link } from 'styles/theme';
import { grey } from 'styles/colours';
import styledMediaQuery from 'styles/mediaquery';

const Container = styled.div`
  position: relative;
  color: ${grey};

  & h2 {
    color: black;
  }
`;

const PlaceWrapper = styled.div`
  & h2 {
    margin-bottom: 0;
  }

  ${styledMediaQuery.minTablet`
    float: left;
    width: 75%;
  `};
`;

const UtilityWrapper = styled.div`
  ${styledMediaQuery.minTablet`
    float: right;
    text-align: right;
    width: 25%;
  `};
`;

const AddressWrapper = styled.div`
  margin: 1rem 0;
`;

const PhotoWrapper = styled.div`
  margin-right: 1rem;
  height: 100px;
  width: 100px;
  background-size: cover;
  float: left;
`;

const ResultSlide = ({
  id,
  name,
  address,
  website,
  formattedAddress,
  photos,
  types,
}) => {
  const youAddress = DetailsData.get('you', 'address');
  const themAddress = DetailsData.get('them', 'address');
  const youTravelMode = DetailsData.get('you', 'travelMode');
  const themTravelMode = DetailsData.get('them', 'travelMode');

  const filteredTypes = types
    ? types.filter(type => {
        return type !== 'point_of_interest' && type !== 'establishment';
      })
    : null;
  return (
    <Container data-component="ResultSlide" className="ResultSlide">
      <PlaceWrapper>
        {photos &&
          photos.length && (
            <PhotoWrapper
              style={{
                backgroundImage: `url(${photos[0].url})`,
              }}
            />
          )}

        <h2>{name}</h2>
        <p>{filteredTypes && filteredTypes.join(', ')}</p>
        {website && (
          <Link href={website} target="_blank">
            {website}
          </Link>
        )}

        {formattedAddress && (
          <AddressWrapper
            dangerouslySetInnerHTML={{ __html: formattedAddress }}
          />
        )}
      </PlaceWrapper>
      <UtilityWrapper>
        <p>
          <Link
            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
              youAddress
            )}&destination=${encodeURIComponent(
              address
            )}&destination_place_id=${id}&travelmode=${youTravelMode.toLowerCase()}`}
            target="_blank"
          >
            Directions for you
          </Link>
        </p>
        <p>
          <Link
            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
              themAddress
            )}&destination=${encodeURIComponent(
              address
            )}&destination_place_id=${id}&travelmode=${themTravelMode.toLowerCase()}`}
            target="_blank"
          >
            Directions for them
          </Link>
        </p>
      </UtilityWrapper>
    </Container>
  );
};

ResultSlide.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  website: PropTypes.string,
  formattedAddress: PropTypes.string,
  photos: PropTypes.array,
  types: PropTypes.array,
};

export default ResultSlide;
