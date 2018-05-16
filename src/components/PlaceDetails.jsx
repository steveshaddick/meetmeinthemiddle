import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from '@material-ui/core/Input';

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
    return {};
  }

  /**
   *
   */
  constructor() {
    super();
    this.name = 'PlaceDetails';
    //
    this.state = {
      searchTerms: '',
      radius: 300,
    };
  }

  handleChangeSearchTerms = event => {
    this.setState({
      searchTerms: event.target.value,
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
    const { searchTerms, radius } = this.state;

    return (
      <div data-component={name} className={name}>
        <form autoComplete="off">
          <FormRow>
            <Input
              placeholder="Search terms"
              defaultValue={searchTerms}
              inputProps={{
                'aria-label': 'Search Terms',
              }}
              className="search-terms"
              onChange={this.handleChangeSearchTerms}
            />
          </FormRow>
          <FormRow>
            <Input
              placeholder="Radius (m)"
              value={radius}
              inputProps={{
                'aria-label': 'Radius',
              }}
              className="search-radius"
              type="number"
            />
          </FormRow>
        </form>
      </div>
    );
  }
}
