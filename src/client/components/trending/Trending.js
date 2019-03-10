import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import MovieCard from '../card/MovieCard';

// actions
import { fetchMovies, isCurrentlyFetching } from '../../actions/actions';

class TrendingMovies extends Component {
  state = {
    movies: {},
    isLoading: true
  };

  componentDidMount() {
    this.props.fetchMovies('FETCH_TRENDING_MOVIES', 'trending/all/day?');
  }

  handlePageChange = (e) => {
    if (this.props.trendingMovies.activePage !== e) {
      this.props.isCurrentlyFetching();
      this.props.fetchMovies('FETCH_TRENDING_MOVIES', 'trending/all/day?', e);
    }
  };

  render() {
    const { trendingMovies, isLoading } = this.props;
  
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        <div 
            className="container" 
            /* eslint no-return-assign: 0 */
            ref={el => this.container = el}
        >
            
          <div className="movie__header">
            <h1>Trending Movies</h1>
          </div>
          <div className="movie__wrapper">
            {trendingMovies.collection && trendingMovies.collection.map((movie) => {
              return (
                <MovieCard 
                    key={movie.id}
                    movie={movie} 
                />
              )
            })}
          </div>
          {trendingMovies.collection && (
            <div className="pagination__wrapper">
              <p>Page {trendingMovies.activePage}/{trendingMovies.total_pages}</p>
              <Pagination
                  activePage={trendingMovies.activePage || 1}
                  firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
                  itemsCountPerPage={10}
                  lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
                  nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
                  onChange={this.handlePageChange}
                  pageRangeDisplayed={5}
                  prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
                  totalItemsCount={trendingMovies.total_pages || 1000}
              />
            </div>
          )}
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ trendingMovies, isLoading }) => ({
  trendingMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: (action, url, page) => dispatch(fetchMovies(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);
