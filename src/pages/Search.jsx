import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Card from '../components/Card';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    search: '',
    isLoading: false,
    isLoadingTwo: true,
    artistName: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onClickSearch = async () => {
    const { search } = this.state;

    this.setState({ artistName: search });
    this.setState({ search: '', isLoading: true });

    const apiResult = await searchAlbumsAPI(search);

    this.setState({ isLoading: false, isLoadingTwo: false, apiResult });

    return apiResult;
  };

  render() {
    const { search, isLoading, isLoadingTwo, artistName, apiResult } = this.state;

    const two = 2;
    const searchButtonValidation = search.length >= two;

    return (
      <div>
        {
          isLoading
            ? <Loading />
            : (
              <div data-testid="page-search">
                Search
                <Header />
                <form>
                  <label htmlFor="search">
                    <input
                      type="text"
                      name="search"
                      data-testid="search-artist-input"
                      onChange={ this.handleChange }
                      value={ search }
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ !searchButtonValidation }
                    onClick={ () => this.onClickSearch() }
                  >
                    Pesquisar
                  </button>
                </form>
                {
                  isLoadingTwo ? <p />
                    : (
                      <div>
                        {
                          apiResult.length === 0
                            ? (
                              <h1>Nenhum álbum foi encontrado</h1>
                            )
                            : (
                              <div>
                                <h2>
                                  { `Resultado de álbuns de: ${artistName}` }
                                </h2>
                                {
                                  apiResult.map((music) => (
                                    <Card
                                      key={ music.collectionId }
                                      artistName={ music.artistName }
                                      collectionName={ music.collectionName }
                                      artworkUrl100={ music.artworkUrl100 }
                                      collectionId={ music.collectionId }
                                    />
                                  ))
                                }
                              </div>

                            )
                        }
                      </div>
                    )
                }
              </div>
            )
        }

      </div>
    );
  }
}

// Search.propTypes = {

// };

export default Search;
