import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import NearMeIcon from '@material-ui/icons/NearMe';
import CircularProgress from '@material-ui/core/CircularProgress';

import { purple, darkPurple } from 'styles/colours';
import styledMediaQuery from 'styles/mediaquery';

import GoogleMapsApi from 'libs/GoogleMapsApi';

const Container = styled.div`
  width: 100%;
  height: 100%;

  & form {
    margin: 0;
  }

  &.is-you {
    & .input-address {
      width: calc(100% - 4rem);
    }
  }
`;

const FormRow = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem 0;

  & .travel-select {
    width: 80%;
    max-width: 200px;
  }

  & .input-label {
    font-size: 0.75rem;
    text-align: left;
  }
`;

const AddressInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 1.1rem;

  &:focus {
    border-color: ${purple};
  }
`;

const NearMeButton = styled.button`
  border: 0;
  background: ${purple};
  cursor: pointer;
  width: 2.5rem;
  height: 1.75rem;
  margin-left: 1rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding-right: 0.5rem;

  & svg {
    color: #fff;
    vertical-align: middle;
  }

  & .nearme-icon {
    width: 20px;
    height: 20px;
    ${styledMediaQuery.minTablet`
      width: 1em;
      height: 1em;
    `};
  }

  & .progress-icon {
    display: none;
    width: 20px !important;
    height: 20px !important;

    ${styledMediaQuery.minTablet`
      width: 30px !important;
      height: 30px !important;
    `};
  }

  &:enabled {
    &:hover,
    &:focus {
      background: ${darkPurple};
    }
  }

  &.progress {
    & .progress-icon {
      display: inline-block;
    }
    & .nearme-icon {
      display: none;
    }
  }

  ${styledMediaQuery.minTablet`
    width: 3rem;
    height: 2rem;
  `};
`;

/**
 *
 */
export default class PersonDetails extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      isYou: PropTypes.bool,
      initialData: PropTypes.object,
      updateData: PropTypes.func,
    };
  }

  /**
   *
   */
  static get defaultProps() {
    return {
      isYou: false,
    };
  }

  /**
   *
   */
  constructor(props) {
    super();
    this.name = 'PersonDetails';
    //
    this.state = {
      address: props.initialData.address,
      travelMode: props.initialData.travelMode,
    };

    this.refInput = null;
    this.refNearMeButton = null;
    this.autocomplete = null;
  }

  /**
   *
   */
  getGeolocation() {
    if (navigator.geolocation) {
      this.refNearMeButton.disabled = true;
      this.refNearMeButton.classList.add('progress');

      navigator.geolocation.getCurrentPosition(
        position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          GoogleMapsApi.geocodeLatLng(pos)
            .then(response => {
              this.refNearMeButton.disabled = false;
              this.refNearMeButton.classList.remove('progress');

              if (Array.isArray(response) && response.length) {
                this.refInput.value = response[0].formatted_address;
                this.props.updateData('address', response[0].formatted_address);
              } else {
                alert("Sorry, couldn't figure out an address where you are.");
              }
            })
            .catch(() => {
              this.refNearMeButton.disabled = false;
              this.refNearMeButton.classList.remove('progress');
              alert('Sorry, there was some sort of error.');
            });
        },
        () => {
          this.refNearMeButton.disabled = false;
          this.refNearMeButton.classList.remove('progress');
          alert(
            'There was an error - location finding has probably been blocked.'
          );
        }
      );
    } else {
      // Browser doesn't support Geolocation
      alert("Sorry, your browser doesn't support this feature.");
    }
  }

  /**
   *
   */
  handleTextChange = event => {
    this.props.updateData('address', event.target.value);
  };

  /**
   *
   */
  handleTextFocus = event => {
    event.target.select();
  };

  /**
   *
   */
  handleNearMeClick = () => {
    this.getGeolocation();
  };

  /**
   *
   */
  componentDidMount() {
    const { address } = this.state;

    this.refInput.value = address;
    GoogleMapsApi.createAutocomplete(this.refInput, {
      types: ['address'],
      componentRestrictions: { country: ['ca'] },
    }).then(obj => {
      this.autocomplete = obj.autocomplete;
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        if (place && place.name) {
          if (place.formatted_address) {
            this.props.updateData('address', place.formatted_address);
          } else if (place.name) {
            this.props.updateData('address', place.name);
          }
        }
        //console.log('changed', this.autocomplete.getPlace());
      });
    });
  }

  /**
   *
   */
  componentDidUpdate() {}

  /**
   *
   */
  componentWillUnmount() {}

  /**
   *
   */
  render() {
    const { name } = this;
    const { travelMode } = this.state;
    const { isYou } = this.props;

    const classes = classnames(name, {
      'is-you': isYou,
    });

    return (
      <Container data-component={name} className={classes}>
        <FormRow>
          <div style={{ textAlign: 'left' }}>
            <InputLabel className="input-label" htmlFor="address">
              Address
            </InputLabel>
          </div>

          <AddressInput
            name="address"
            id="address"
            placeholder="Address"
            ariaLabel="Address"
            innerRef={ref => {
              this.refInput = ref;
            }}
            className="input-address"
            onChange={this.handleTextChange}
            onFocus={this.handleTextFocus}
          />

          {isYou && (
            <NearMeButton
              onClick={this.handleNearMeClick}
              disabled={!navigator.geolocation}
              innerRef={ref => {
                this.refNearMeButton = ref;
              }}
            >
              <NearMeIcon className="nearme-icon" />
              <CircularProgress className="progress-icon" />
            </NearMeButton>
          )}
        </FormRow>

        <FormRow>
          <FormControl className="travel-select">
            <InputLabel htmlFor="travel-mode">Travel Mode</InputLabel>
            <Select
              value={travelMode}
              onChange={event => {
                this.setState({
                  travelMode: event.target.value,
                });
                this.props.updateData('travelMode', event.target.value);
              }}
              inputProps={{
                name: 'travel-mode',
                id: 'travel-mode',
              }}
            >
              <MenuItem value="WALKING">On foot</MenuItem>
              <MenuItem value="TRANSIT">Transit</MenuItem>
              <MenuItem value="BICYCLING">By bike</MenuItem>
              <MenuItem value="DRIVING">By car</MenuItem>
            </Select>
          </FormControl>
        </FormRow>
      </Container>
    );
  }
}
