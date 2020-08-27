import React, { Component } from 'react';
import { addToFavourites, removeFromFavourites } from '../actions';

class MovieCard extends Component {
  handleFavouriteClick = () => {
    const { movie } = this.props;
    this.props.dispatch(addToFavourites(movie));
  };

  handleUnFavouriteClick = () => {
    const { movie } = this.props;
    this.props.dispatch(removeFromFavourites(movie));
  };

  render() {
    const { movie, isFavourite } = this.props;
    return (
      <div className="movie-card">
        <div className="left">
            {movie.Poster!=='N/A'&&<img src={movie.Poster} alt="search-pic" />}
            {movie.Poster==='N/A'&&<img src="https://www.fcmlindia.com/images/fifty-days-campaign/no-image.jpg" alt='movie-poster'/>}
        </div>
        <div className="right">
          <div className="title">
            {movie.Title} ({movie.Year})
          </div>
          <div className="plot">{movie.Plot}</div>
          <div className="footer">
            <div className="rating">{movie.imdbRating}</div>
            {isFavourite ? (
              <button
                className="unfavourite-btn"
                onClick={this.handleUnFavouriteClick}
              >
                Unfavourite
              </button>
            ) : (
              <button
                className="favourite-btn"
                onClick={this.handleFavouriteClick}
              >
                Favourite
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
