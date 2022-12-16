import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favorite: false,
    isLoading: false,
  };

  addFav = async () => {
    const { apiReturn } = this.props;
    this.setState({ isLoading: true });

    await addSong(apiReturn);

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
    const { isLoading, favorite } = this.state;

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
                    checked={ favorite }
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
