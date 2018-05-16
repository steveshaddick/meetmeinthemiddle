import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';

const FormRow = styled.div`
  width: 100%;
  text-align: center;
  margin: 2rem 0;

  & .search-terms {
    width: 90%;
    max-width: 600px;
  }

  & .search-radius {
    width: 80%;
    max-width: 200px;
  }
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
              label="Search terms"
              placeholder="restaurant, bar, etc"
              defaultValue={searchTerms}
              inputProps={{
                'aria-label': 'Search Terms',
              }}
              InputLabelProps={{
                shrink: true,
              }}
              className="search-terms"
              onChange={event => {
                this.props.updateData('searchTerms', event.target.value);
              }}
            />
          </FormRow>
          <FormRow>
            <TextField
              label="Search radius (m)"
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
