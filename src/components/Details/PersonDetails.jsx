import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

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

  & .search-input {
    width: 100%;
  }

  & .travel-select {
    width: 80%;
    max-width: 200px;
  }

  & .input-label {
    color: #884c6d;
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
  }

  /**
   *
   */
  componentDidMount() {}

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
    const { address, travelMode } = this.state;

    return (
      <Container data-component={name} className={name}>
        <form autoComplete="off">
          <FormRow>
            <TextField
              label="Address"
              placeholder="Address"
              defaultValue={address}
              inputProps={{
                'aria-label': 'Address',
              }}
              inputLabelProps={{
                className: 'input-label',
              }}
              className="search-input"
              onChange={event => {
                this.props.updateData('address', event.target.value);
              }}
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
        </form>
      </Container>
    );
  }
}
