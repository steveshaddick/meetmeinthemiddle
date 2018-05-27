import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { purple } from 'styles/colours';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import GoogleMapsApi from 'libs/GoogleMapsApi';

const Container = styled.div`
  width: 100%;
  height: 100%;

  & form {
    margin: 0;
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

/**
 *
 */
export default class PersonDetails extends Component {
  /**
   *
   */
  static get propTypes() {
    return {
      initialData: PropTypes.object,
      updateData: PropTypes.func,
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
    this.autocomplete = null;
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

    return (
      <Container data-component={name} className={name}>
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
