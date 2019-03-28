import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../movies/MovieCard';
import PaginationBar from '../layout/PaginationBar';
import Footer from '../layout/Footer';

// actions
import { FETCH_TOPRATED_MOVIES } from '../../constants/constants';
import { fetchTopRatedMovies, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const TopRatedMovies = (props) => {
  const { topRatedMovies, isLoading } = props;
  const queryString = 'movie/top_rated?';
  
  useEffect(() => {
    if (isEmpty(props.topRatedMovies)) {
      props.fetchTopRatedMovies(queryString);
    }
  }, []);
 
  const handlePageChange = (e) => {
    if (props.topRatedMovies.page !== e && !props.isLoading) {
      props.isCurrentlyFetching();
      props.fetchTopRatedMovies(queryString, e);
    }
  };

  return (
    <React.Fragment>
      {(isLoading && isEmpty(topRatedMovies)) && <LoadingScreen />}
      <div className="container">
        <div className="container__wrapper container__movies">
          {!isEmpty(topRatedMovies) && (
            <React.Fragment>
              <div className="movie__header">
                <div className="movie__header-title">
                  <h1>Top Rated Movies</h1>
                  <h3>{numberWithCommas(topRatedMovies.total_results)} Movies</h3>
                </div>
              </div>
              <div className="movie__wrapper">
                {topRatedMovies.results.map((movie, index) => {
                  return (
                    <MovieCard 
                        category="movie"
                        key={`${movie.id}_${index}`}
                        movie={movie} 
                    />
                  )
                })}
              </div>
              <PaginationBar 
                  activePage={topRatedMovies.page}
                  itemsCountPerPage={1}
                  onChange={handlePageChange}
                  pageRangeDisplayed={10}
                  totalItemsCount={topRatedMovies.total_pages}
                  totalPage={topRatedMovies.total_pages}
              />
              <Footer />
            </React.Fragment>
          )}
        </div>  
    </div>
    </React.Fragment>
  );
};

TopRatedMovies.propTypes = {
  fetchTopRatedMovies: PropTypes.func,
  isCurrentlyFetching: PropTypes.func,
  topRatedMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ topRatedMovies, isLoading }) => ({
  topRatedMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchTopRatedMovies: (url, page) => dispatch(fetchTopRatedMovies(url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRatedMovies);
