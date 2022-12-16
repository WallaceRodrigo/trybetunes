import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
    favorites: [],
  };

  componentDidMount() {
    this.getFavs();
  }

  getFavs = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
    return favorites;
  };

  addFav = async () => {
    const { apiReturn } = this.props;
    this.setState({ isLoading: true });

    await addSong(apiReturn);

    await this.getFavs();

    this.setState({ favorite: true, isLoading: false });
  };

  checkValidation = () => {
    const { favorite } = this.state;
    if (favorite) {
      // return this.removeFav();
      console.log('favorito');
      return this.setState({ favorite: false });
    }
    return this.addFav();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, favorites } = this.state;

    const savedFav = favorites.some((fav) => fav.trackId === trackId);

    return (
      <div>
        {
          isLoading ? <Loading />
            : (
              <div>
                <p>{ trackName }</p>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label htmlFor="favoriteCheck">
                  Favorita
                  <input
                    type="checkbox"
                    name="favoriteCheck"
                    id="favoriteCheck"
                    checked={ savedFav }
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ () => (this.checkValidation()) }
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  apiReturn: PropTypes.shape({
    wrapperType: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
