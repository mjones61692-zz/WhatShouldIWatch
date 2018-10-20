import React from 'react';
import MovieDescription from './MovieDescription.jsx';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: false
    }
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  toggleDescription() {
    this.setState({
      description: !this.state.description
    })
  }

  render() {
    return (
      <React.Fragment>
        <tr>
          <td style={{textAlign: 'center'}}><a href='#' onClick={this.toggleDescription}>{this.props.movie.title}</a></td>
          <td style={{textAlign: 'center'}}>{this.props.movie.imdbRank}</td>
          <td style={{textAlign: 'center'}}>{this.props.movie.rottenTomatoesRank}</td>
          <td style={{textAlign: 'center'}}>{this.props.movie.metacriticRank}</td>
          <td style={{textAlign: 'center'}}>{Math.round(this.props.movie.customNum)}</td>
        </tr>
        <MovieDescription movie={this.props.movie} description={this.state.description}/>
      </React.Fragment>     
    );
  }
}

export default Movie;