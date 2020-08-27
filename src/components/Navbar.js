import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMovieToList, handleMovieSearch } from '../actions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }
  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
    let input=document.querySelector('input');
    input.value='';
    this.setState({
      searchText:input.value
    })
    this.props.dispatch(handleMovieSearch(""));
  };

  handleSearchClick = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleSearchChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  hide=()=>{
    let input=document.querySelector('input');
    input.value='';
    this.setState({
      searchText:input.value
    })
    this.props.dispatch(handleMovieSearch(""));
  }

  render() {
    const { results, results: movie } = this.props.search;
    console.log('props',this.props.search);
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleSearchChange} />
          <button id="search-btn" onClick={this.handleSearchClick}>
            Search
          </button>

          {results.Title&& (
            <div className="search-results">
              <div className="search-result">
                
                {movie.Poster!=='N/A'&&<img src={movie.Poster} alt="search-pic" />}
                {movie.Poster==='N/A'&&<img src="https://www.fcmlindia.com/images/fifty-days-campaign/no-image.jpg" alt='movie-poster'/>}
                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add to Movies
                  </button>
                </div>
              </div>
              <button className='cancel-btn' onClick={this.hide}>
                <img src="https://image.flaticon.com/icons/svg/1828/1828666.svg" alt="cancel-icon"/>
              </button>
            </div>
          )}
          {this.props.search.results.Error==="Movie not found!"&&
              <div className="search-results">
                  <div className="search-result">
                    <div className='no-record'>
                      No movie found
                    </div>
                  </div>
                  <button className='no-record-cancel-btn' onClick={this.hide}>
                      <img src="https://image.flaticon.com/icons/svg/1828/1828666.svg" alt="cancel-icon"/>
                    </button>
              </div>   
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ search }) {
  return {
    search,
  };
}

export default connect(mapStateToProps)(Navbar);
