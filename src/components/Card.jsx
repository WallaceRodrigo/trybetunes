import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { artworkUrl100, artistName, collectionName, collectionId } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ artistName } />
          <h2>{ artistName }</h2>
          <p>{ collectionName }</p>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
