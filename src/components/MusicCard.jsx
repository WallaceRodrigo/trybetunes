import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MusicCard extends Component {
  render() {
    const { artworkUrl100, artistName, collectionName, collectionId } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt={ artistName } />
        <h2>{ artistName }</h2>
        <p>{ collectionName }</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          link
        </Link>
      </div>
    );
  }
}

MusicCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default MusicCard;
