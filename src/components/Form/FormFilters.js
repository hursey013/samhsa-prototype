import React, { Component } from 'react';
import tw from 'tailwind.macro';
import styled from 'styled-components/macro';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues, submit } from 'redux-form';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';

import { handleReceiveLanguages } from '../../actions/languages';
import { resetAdvancedFilters, resetAllFilters } from '../../actions/filters';
import * as filterOptions from '../../utils/filters';
import { LOCATION_WARNING } from '../../utils/warnings';

import { Button, Location, Select } from '../Input';

const Row = styled.div`
  ${tw`w-full mb-6`}
`;

const RowFlex = styled.div`
  ${tw`flex flex-wrap -mx-2 mb-6`}
`;

const Form = styled.form`
  ${tw`bg-gray-200 rounded p-6 mb-6`}

  input, select, .geosuggest__input {
    ${tw`bg-white`}
  }
`;

export class FormFilters extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleReceiveLanguages());
  }

  state = {
    isHidden: true,
    showLocationWarning: false
  };

  toggleShowLocationWarning = value => {
    this.setState({
      showLocationWarning: value
    });
  };

  toggleHidden = () => {
    this.setState(
      {
        isHidden: !this.state.isHidden
      },
      () => {
        if (this.state.isHidden) {
          this.props.resetAdvancedFilters();
        }
      }
    );
  };

  handleReset = () => {
    this.props.resetAllFilters();
  };

  render() {
    const {
      handleSubmit,
      data,
      toggleFilters,
      toggleResults,
      filtersHidden,
      resultsHidden,
      hasResults,
      isDesktop
    } = this.props;
    const { isHidden, showLocationWarning } = this.state;

    return (
      <>
        <RowFlex css={tw`flex lg:hidden justify-between border-b pb-6`}>
          <div css={tw`px-2`}>
            <Button outline onClick={toggleFilters}>
              {filtersHidden ? 'Cancel' : 'Filter'}
            </Button>
          </div>
          {filtersHidden ? (
            <div css={tw`px-2`}>
              <Button primary onClick={handleSubmit}>
                Update providers
              </Button>
            </div>
          ) : (
            hasResults && (
              <Button onClick={toggleResults} outline>
                {resultsHidden ? 'List' : 'Map'}
              </Button>
            )
          )}
        </RowFlex>
        {(isDesktop || filtersHidden) && (
          <Form onSubmit={handleSubmit}>
            <div css={tw`hidden lg:flex justify-between flex-no-wrap mb-6`}>
              <div>
                <h2>
                  <FontAwesomeIcon
                    icon={faSlidersH}
                    css={tw`mr-1 text-gray-500`}
                    rotation={90}
                  />
                  Filters
                </h2>
                <p css={tw`text-xs text-gray-700 font-light mb-0`}>
                  Search for facilities that match your needs
                </p>
              </div>
              <div>
                <Button
                  link
                  className="reset-filters"
                  onClick={this.handleReset}
                  type="button"
                >
                  Reset
                </Button>
              </div>
            </div>
            <RowFlex>
              <div css={tw`w-full md:w-3/5 px-2 mb-6 md:mb-0`}>
                <Field
                  label="Location"
                  component={Location}
                  name="location"
                  placeholder="City or zip code"
                  toggleShowWarning={this.toggleShowLocationWarning}
                />
                {showLocationWarning && (
                  <div css={tw`w-full mt-2 text-red-500 text-sm`}>
                    {LOCATION_WARNING}
                  </div>
                )}
              </div>
              <div css={tw`w-full md:w-2/5 px-2`}>
                <Field
                  name="distance"
                  label="Distance"
                  component={Select}
                  hideFirst={true}
                  options={filterOptions.distance}
                />
              </div>
            </RowFlex>
            <Row>
              <Field
                name="payment"
                label="Payment options"
                plural="payment options"
                component={Select}
                options={filterOptions.payment}
                helpURL="/content/paying-for-treatment"
                helpText="Not sure?"
              />
            </Row>
            <Row>
              <Field
                name="type"
                label="Type of treatment"
                plural="types of treatment"
                component={Select}
                options={filterOptions.type}
                helpURL="/content/treatment-options#types-of-treatment"
                helpText="Not sure?"
              />
            </Row>
            {!this.state.isHidden && (
              <div className="filter-container">
                <Row>
                  <Field
                    name="age"
                    label="Ages accepted"
                    plural="ages"
                    component={Select}
                    options={filterOptions.age}
                  />
                </Row>
                <Row>
                  <Field
                    name="language"
                    label="Language"
                    plural="languages"
                    component={Select}
                    options={data}
                  />
                </Row>
                <Row>
                  <span
                    css={tw`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`}
                  >
                    Special programs
                  </span>
                  <label htmlFor="VET" css={tw`block`}>
                    <Field
                      css={tw`mr-2 leading-tight`}
                      type="checkbox"
                      name="VET"
                      component="input"
                      format={v => v === 'VET'}
                      normalize={v => (v ? 'VET' : '')}
                    />
                    <span css={tw`text-sm`}>Veterans</span>
                  </label>
                  <label htmlFor="GL" css={tw`block`}>
                    <Field
                      css={tw`mr-2 leading-tight`}
                      type="checkbox"
                      name="GL"
                      component="input"
                      format={v => v === 'GL'}
                      normalize={v => (v ? 'GL' : '')}
                    />
                    <span css={tw`text-sm`}>
                      Lesbian, gay, bisexual, transgender (LGBT)
                    </span>
                  </label>
                </Row>
                <Row>
                  <Field
                    name="mat"
                    label="Type of medication-assisted treatment (MAT)"
                    plural="treatments"
                    component={Select}
                    options={filterOptions.mat}
                  />
                  <Link
                    to="/content/treatment-options#medications-used-in-treatment"
                    css={tw`mb-2 text-sm`}
                  >
                    What are the differences between these medications?
                  </Link>
                </Row>
              </div>
            )}
            <button
              className="filter-link"
              css={tw`mb-6`}
              onClick={this.toggleHidden}
              type="button"
            >
              {isHidden ? 'More' : 'Less'} filters
              <FontAwesomeIcon
                icon={isHidden ? faAngleDown : faAngleUp}
                css={tw`text-blue-500 ml-1`}
              />
            </button>
            {!isDesktop && (
              <Row>
                <Button primary css={tw`w-full`} type="submit">
                  Update providers
                </Button>
              </Row>
            )}
            <Row css={tw`mb-0`}>
              <p css={tw`text-sm text-gray-700 mb-0`}>
                Too many or too few results? Add or remove search filters
                related to the treatment you’re looking for.
              </p>
            </Row>
          </Form>
        )}
      </>
    );
  }
}

FormFilters.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  filtersHidden: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hasResults: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  resetAdvancedFilters: PropTypes.func.isRequired,
  resetAllFilters: PropTypes.func.isRequired,
  resultsHidden: PropTypes.bool.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  toggleResults: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { languages } = state;
  const { loading, data } = languages;
  const values =
    getFormValues('homepage')(state) ||
    getFormValues('filters')(state) ||
    state.form.filters.initialValues;

  return {
    initialValues: {
      ...values
    },
    loading,
    data
  };
};

const mapDispatchToProps = dispatch => ({
  resetAdvancedFilters() {
    dispatch(resetAdvancedFilters());
  },

  resetAllFilters() {
    dispatch(resetAllFilters());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'filters',
    enableReinitialize: true,
    destroyOnUnmount: false,
    onChange: (values, dispatch, props, previousValues) => {
      const { isDesktop, loading } = props;

      if (!isDesktop || loading || !values.location.latLng) {
        return;
      }

      dispatch(submit('filters'));
    }
  })(FormFilters)
);
