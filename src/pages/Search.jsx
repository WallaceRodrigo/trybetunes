import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { inputChange, search } = this.props;

    const two = 2;
    const searchButtonValidation = search.length >= two;

    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <label htmlFor="search">
            <input
              type="text"
              name="search"
              data-testid="search-artist-input"
              onChange={ inputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !searchButtonValidation }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  inputChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default Search;
