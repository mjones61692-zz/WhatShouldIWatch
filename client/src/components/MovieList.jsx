import React from 'react';
import Movie from './Movie.jsx';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <table style={{width: '100%'}}>
        <tbody>
          <tr>
            <th>Movie</th>
            <th>IMDb</th>
            <th>Rotten Tomatoes</th>
            <th>Metacritic</th>
            <th>Average</th>
          </tr>
          {this.props.movies.map((movie) => {
            return (
              <React.Fragment key={movie._id}>
                <Movie movie={movie}/>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MovieList;