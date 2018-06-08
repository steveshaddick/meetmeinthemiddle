import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import DetailsData from 'libs/DetailsData';
import MidPointFinder from 'libs/MidPointFinder';

import Drawer from '@material-ui/core/Drawer';

import Details from 'components/Details/Details';
import Results from 'components/Results/Results';

import { purple, darkPurple } from 'styles/colours';
import styledMediaQuery from 'styles/mediaquery';

import { dataLayerPush } from 'libs/GTM';

const Container = styled.div`
  &.details-open {
    .drawer-button {
      transition-delay: 0;
      transform: translate3d(0, -50px, 0);
    }
  }
`;

const TopBorder = styled.div`
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #965679;
  z-index: 1000;
`;

const DetailsDrawer = styled(Drawer)`
  &.drawer-wrapper {
    display: block;
  }

  & .drawer-content {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    border-bottom: 5px solid #965679;
    outline: none;
  }
`;

const DrawerButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 700px;
  z-index: 1000;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const DrawerButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  z-index: 1000;
  border: 0;
  padding: 0.25rem 1.25rem 0.25rem;
  font-weight: 500;
  background-color: #965679;
  color: #fff;
  border-bottom-left-radius: 1rem;
  cursor: pointer;
  transform: translate3d(0, 0px, 0);
  transition: 0.3s transform cubic-bezier(0.82, 0.01, 1, 0.73);
  transition-delay: 350ms;
  border: 0.25rem solid #965679;

  &:hover,
  &:active {
    background: #512e41;
    border-color: #512e41;
  }

  &:focus {
    border: 0.25rem solid #512e41;
    outline: none;
  }
`;

const IntroSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 10;
`;

const IntroSection = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border-top: 5px solid ${purple};
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  text-align: center;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem;

  & h1 {
    color: ${darkPurple};
  }

  & p {
    margin-bottom: 2rem;
  }

  ${styledMediaQuery.minTablet`
    height: 300px;
    padding: 3rem;
  `};
`;

const SearchButton = styled.button`
  border: 2px solid ${purple};
  background: ${purple};
  cursor: pointer;
  outline: none;
  color: #fff;
  padding: 0.75rem 0.75rem 0.5rem 0.5rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  &:hover,
  &:focus {
    background: ${darkPurple};
    border-color: ${darkPurple};
  }
`;

/**
 *
 */
class IndexPage extends Component {
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
    this.name = 'Details';
    //
    this.state = {
      detailsOpen: false,
      isDirtyData: false,
      searchingNewResults: false,
      resultsData: null,
      resultsError: false,
      initialState: true,
    };

    this.refDrawerButton = null;

    this.midPointFinder = new MidPointFinder({
      resultsCallback: this.midPointResults,
      errorCallback: this.midPointError,
    });
  }

  openDrawer = () => {
    this.setState({
      detailsOpen: true,
      isDirtyData: false,
    });
  };

  closeDrawer = () => {
    const { isDirtyData } = this.state;

    this.setState({ detailsOpen: false });

    if (isDirtyData) {
      this.findMidPoint();
    }
  };

  dirtyData = () => {
    this.setState({
      isDirtyData: true,
    });
  };

  findMidPoint = () => {
    this.midPointFinder.find(DetailsData.get());
    this.setState({
      searchingNewResults: true,
      resultsError: false,
      initialState: false,
    });
    dataLayerPush({
      event: 'sendingSearch',
    });
  };

  midPointResults = response => {
    this.setState({
      searchingNewResults: false,
      resultsData: response,
      resultsError: false,
    });
  };

  midPointError = () => {
    this.setState({
      searchingNewResults: false,
      resultsError: true,
      resultsData: null,
    });
  };

  /**
   *
   */
  componentDidMount() {
    if (DetailsData.parseUrl()) {
      this.findMidPoint();
    } else {
      this.openDrawer();
    }
  }

  /**
   *
   */
  componentDidUpdate() {}

  render() {
    const {
      detailsOpen,
      searchingNewResults,
      resultsData,
      resultsError,
      initialState,
    } = this.state;

    return (
      <Container className={classNames({ 'details-open': detailsOpen })}>
        <DetailsDrawer
          anchor="top"
          open={detailsOpen}
          className="drawer-wrapper"
          onClose={() => {
            this.closeDrawer();
          }}
          PaperProps={{
            className: 'drawer-content',
          }}
        >
          <Details
            closeDrawer={this.closeDrawer}
            updateData={this.updateData}
            dirtyData={this.dirtyData}
          />
        </DetailsDrawer>

        <TopBorder />

        <DrawerButtonWrapper>
          <DrawerButton
            className="drawer-button"
            onClick={() => {
              this.openDrawer();
            }}
            ref={ref => {
              this.refDrawerButton = ref;
            }}
          >
            Search
          </DrawerButton>
        </DrawerButtonWrapper>

        {initialState && (
          <IntroSectionWrapper>
            <IntroSection>
              <div className="content-wrapper">
                <h1>Meet Me In The Middle</h1>
                <p>
                  The most direct path to equality is somewhere in the middle.
                </p>
                <SearchButton
                  onClick={() => {
                    this.openDrawer();
                  }}
                >
                  Search
                </SearchButton>
              </div>
            </IntroSection>
          </IntroSectionWrapper>
        )}

        <Results
          isSearching={searchingNewResults}
          data={resultsData}
          showResults={Array.isArray(resultsData)}
          isError={resultsError}
        />
      </Container>
    );
  }
}

export default IndexPage;
