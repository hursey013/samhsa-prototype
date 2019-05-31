import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "styled-components/macro";
import tw from "tailwind.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

class Filter extends Component {
  render() {
    return (
      <>
        <div css={tw`w-full mb-6`}>
          <label
            css={tw`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`}
            htmlFor="search-zip"
          >
            Location
          </label>
          <input
            css={tw`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="search-zip"
            type="text"
            placeholder="City, state, or postal code"
            name="location"
            value={this.props.query.location}
            onChange={this.props.handleInputChange}
          />
        </div>
        <div css={tw`w-full mb-6`}>
          <label
            css={tw`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`}
            htmlFor="search-type"
          >
            Service type
          </label>
          <div css={tw`relative`}>
            <select
              css={tw`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              id="search-type"
              name="typeFacility"
              value={this.props.query.typeFacility}
              onChange={this.props.handleInputChange}
            >
              <option value="">All providers</option>
              <option value="SA">Substance use</option>
              <option value="MH">Mental health</option>
            </select>
            <div
              css={tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}
            >
              <svg
                css={tw`fill-current h-4 w-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div css={tw`mb-6`}>
          More filters{" "}
          <FontAwesomeIcon icon={faAngleDown} css={tw`text-blue-500 ml-1`} />
        </div>
      </>
    );
  }
}

export default withRouter(Filter);
