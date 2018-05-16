import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';

const FormRow = styled.div`
  width: 100%;
  text-align: center;
  margin: 2rem 0;
`;

/**
 *
 */
export default class PlaceDetails extends Component {
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
    this.name = 'PlaceDetails';
    //
    this.state = {
      searchTerms: props.initialData.searchTerms,
      radius: props.initialData.radius,
    };
  }

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
    const { searchTerms, radius } = this.state;

    return (
      <div data-component={name} className={name}>
        <form autoComplete="off">
          <FormRow>
            <TextField
              placeholder="Search terms"
              defaultValue={searchTerms}
              inputProps={{
                'aria-label': 'Search Terms',
              }}
              className="search-terms"
              onChange={event => {
                this.props.updateData('searchTerms', event.target.value);
              }}
            />
          </FormRow>
          <FormRow>
            <TextField
              placeholder="Radius (m)"
              defaultValue={radius}
              inputProps={{
                'aria-label': 'Radius',
              }}
              className="search-radius"
              type="number"
              onChange={event => {
                this.props.updateData('radius', event.target.value);
              }}
            />
          </FormRow>
        </form>
      </div>
    );
  }
}
