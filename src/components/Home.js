import React, { Component } from 'react';
import styled from 'styled-components/macro';
import tw from 'tailwind.macro';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Helmet } from 'react-helmet';

import content from '../utils/content';
import { handleReceiveFacilities } from '../actions/facilities';
import mobileBackground from '../images/film-strip_mobile.jpg';
import mobileBackground_2x from '../images/film-strip_mobile@2x.jpg';
import backgroundLeft_2x from '../images/film-strip_l@2x.jpg';
import backgroundRight_2x from '../images/film-strip_r@2x.jpg';

import FormHomepage from './Form/FormHomepage';
import { Button } from './Input';
import ReturnToTop from './ReturnToTop';

const MobileBgContainer = styled.div`
  padding-bottom: 75%;
`;

const MobileBgImage = styled.div`
  background-image: url(${mobileBackground});

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url(${mobileBackground_2x});
  }
`;

const DecorativeHeading = styled.div`
  &:before {
    content: '';
    ${tw`block mb-4 border-t-4 border-teal w-12 h-0`}
  }
`;

class Home extends Component {
  innerRef = React.createRef();

  submit = values => {
    const { dispatch } = this.props;

    if (values.location.latLng) {
      dispatch(handleReceiveFacilities(values));
    }

    this.props.history.push({
      pathname: '/results'
    });
  };

  handleClick = () => {
    this.innerRef.current.focus();
  };

  renderCard = card => {
    return (
      <div key={card.id} css={tw`w-full lg:w-1/2 px-2 mb-10`}>
        <div css={tw`flex -mx-2 mb-4`}>
          <div css={tw`w-1/5 px-2`}>{card.icon}</div>
          <div css={tw`flex-1 px-2`}>
            <h3 css={tw`text-xl font-heading font-bold text-gray-dark mb-4`}>
              {card.name}
            </h3>
            <p css={tw`mb-4`}>{card.description}</p>
            <Button
              forwardedAs={Link}
              to={`/content/${card.id}`}
              outline
              css={tw`w-full lg:inline lg:p-0 lg:border-0`}
              aria-label={`Learn more about ${card.name}`}
            >
              Learn more ›
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Home</title>
          <meta
            property="og:image"
            content={`${process.env.REACT_APP_SITE_DOMAIN}/thumbnail-large.jpg`}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <MobileBgContainer css={tw`md:hidden relative border-b-4 border-white`}>
          <MobileBgImage
            css={tw`absolute h-full w-full top-0 bg-center bg-top bg-no-repeat bg-cover`}
          />
        </MobileBgContainer>
        <div
          css={tw`pb-5 -mt-8 md:mt-0 md:py-10 bg-teal md:bg-white md:border-t md:border-gray-lighter`}
        >
          <div className="container">
            <div css={tw`md:flex md:-mx-4 lg:-mx-8`}>
              <img
                src={backgroundLeft_2x}
                css={tw`px-8 w-auto flex-none hidden lg:block`}
                style={{ height: '336px' }}
                alt="Stock people"
              />
              <div
                css={tw`relative bg-white md:bg-transparent px-4 lg:px-8 py-6 md:py-0`}
              >
                <h1 css={tw`text-3xl font-heading font-bold leading-snug mb-4`}>
                  Millions of Americans have a substance use disorder.{' '}
                  <br css={tw`hidden md:block`} />
                  Help is available.
                </h1>
                <p css={tw`mb-8`}>
                  The Substance Abuse and Mental Health Services Administration
                  (SAMHSA) collects information on thousands of state-licensed
                  providers who specialize in treating substance use disorders,
                  addiction, and mental illness.{' '}
                </p>
                <Button
                  primary
                  onClick={this.handleClick}
                  css={tw`w-full mb-4 md:mb-0 md:mr-4 md:w-auto md:inline-block text-2xl md:text-lg`}
                >
                  Find treatment
                </Button>
                <Button
                  smooth
                  outline
                  forwardedAs={HashLink}
                  scroll={el => {
                    el.scrollIntoView();
                    el.focus();
                  }}
                  css={tw`w-full md:w-auto md:inline-block text-2xl md:text-lg`}
                  to={`#home-learn-more`}
                >
                  Learn more
                </Button>
              </div>
              <img
                src={backgroundRight_2x}
                css={tw`px-4 lg:px-8 w-auto flex-none hidden md:block`}
                style={{ height: '336px' }}
                alt="Stock people"
              />
            </div>
          </div>
        </div>
        <div
          css={tw`bg-gray-lightest md:bg-teal border-t-4 md:border-t-0 border-white`}
          id="home-search"
        >
          <div className="container">
            <div css={tw`py-5 md:py-10`}>
              <div css={tw`w-full md:bg-white md:px-20 md:py-10 md:shadow-md`}>
                <FormHomepage onSubmit={this.submit} innerRef={this.innerRef} />
              </div>
            </div>
          </div>
        </div>
        <div className="container" id="home-learn-more" tabIndex="-1">
          <div css={tw`py-10`}>
            <DecorativeHeading
              as="h2"
              css={tw`text-2xl md:text-3xl font-heading font-bold`}
            >
              What to expect
            </DecorativeHeading>
            <p css={tw`mb-5 md:mb-10 md:text-xl`}>
              Help is available, treatment works, and people recover every day.
            </p>
            <div css={tw`flex flex-wrap -mx-2 -mb-5 md:-mb-10`}>
              {content()
                .filter(card => !card.hidden)
                .map(this.renderCard)}
            </div>
          </div>
        </div>
        <ReturnToTop />
      </>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect()(Home));
