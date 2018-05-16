import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

const Container = styled.div`
  width: 100%;
  height: 100%;

  & form {
    margin: 1rem 0;
  }
`;

const FormRow = styled.div`
  width: 100%;
  text-align: center;
  margin: 2rem 0;

  & .search-input {
    width: 90%;
  }

  & .travel-select {
    width: 80%;
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
      closeDrawer: PropTypes.func,
    };
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'PersonDetails';
    //
    this.state = {
      address: '',
      travelMode: 'WALKING',
    };
  }

  handleSelectChange = event => {
    this.setState({
      travelMode: event.target.value,
    });
  };

  /**
   *
   */
  UNSAFE_componentWillMount() {}

  /**
   *
   */
  componentDidMount() {}

  /**
   *
   */
  UNSAFE_componentWillReceiveProps() {}

  /**
   *
   */
  UNSAFE_componentWillUpdate() {}

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
            <Input
              placeholder="Address"
              value={address}
              inputProps={{
                'aria-label': 'Description',
              }}
              className="search-input"
            />
          </FormRow>

          <FormRow>
            <FormControl className="travel-select">
              <InputLabel htmlFor="travel-mode">Travel Mode</InputLabel>
              <Select
                value={travelMode}
                onChange={this.handleSelectChange}
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
