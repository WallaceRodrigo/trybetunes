import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    apiReturn: '',
    isLoading: true,
  };

  componentDidMount() {
    this.getMusicsAlbum();
  }

  getMusicsAlbum = async () => {
    const { match: { params: { id } } } = this.props;

    const apiReturn = await getMusics(id);

    this.setState({ apiReturn, isLoading: false });
    return apiReturn;
  };

  render() {
    const { isLoading, apiReturn } = this.state;
    const tracks = apiReturn.slice(1);

    return (
      <div>
        {
          isLoading ? <Loading />
            : (
              <div data-testid="page-album">
                <Header />
                <div>
                  <div>
                    <img
                      src={ apiReturn[0].artworkUrl100 }
                      alt={ apiReturn[0].collectionName }
                    />
                    <h1 data-testid="album-name">{ apiReturn[0].collectionName}</h1>
                    <h2 data-testid="artist-name">{ apiReturn[0].artistName }</h2>
                  </div>
                  <div>
                    {
                      tracks.map((music) => (
                        (<MusicCard
                          key={ music.trackId }
                          trackId={ music.trackId }
                          trackName={ music.trackName }
                          previewUrl={ music.previewUrl }
                          apiReturn={ music }
                        />)
                      ))
                    }
                  </div>
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

// renderAlbum = () => {
//   const { apiReturn } = this.state;
//   const tracks = apiReturn.filter((m) => m.wrapperType === 'track');

//   return (
//     <div>
//       <div>
//         <img src={ apiReturn[0].artworkUrl100 } alt={ apiReturn[0].collectionName } />
//         <h1 data-testid="album-name">{ apiReturn[0].collectionName}</h1>
//         <h2 data-testid="artist-name">{ apiReturn[0].artistName }</h2>
//       </div>
//       <div>
//         {
//           tracks.map((music) => (
//             <MusicCard
//               key={ music.trackId }
//               trackName={ music.trackName }
//               previewUrl={ music.previewUrl }
//             />
//           ))
//         }
//       </div>
//     </div>
//   );
// };
