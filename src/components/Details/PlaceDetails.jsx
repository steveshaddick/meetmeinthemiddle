import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';

const FormRow = styled.div`
  width: 100%;
  text-align: center;
  margin: 2rem 0;

  & .search-terms {
    width: 100%;
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
    };
  }

  /**
   *
   */
  handleTextChange = event => {
    this.props.updateData('searchTerms', event.target.value);
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
    const { searchTerms } = this.state;

    return (
      <div data-component={name} className={name}>
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
            onChange={this.handleTextChange}
            onFocus={this.handleTextFocus}
          />
        </FormRow>
      </div>
    );
  }
}
