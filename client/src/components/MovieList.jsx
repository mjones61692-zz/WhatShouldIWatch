import React from 'react';
//import Movie from './Movie.js';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <table style={{width: '100%'}}>
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Movie</th>
            <th>IMDb Rating</th>
          </tr>
          {this.props.movies.map((movie, i) => {
            return (<tr key={i}>
              <td style={{textAlign: 'center'}}>{i + 1}</td>
              <td style={{textAlign: 'center'}}>{movie.title}</td>
              <td style={{textAlign: 'center'}}>{movie.imdbRank}</td>
            </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MovieList;