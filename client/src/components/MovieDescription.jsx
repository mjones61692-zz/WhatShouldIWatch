import React from 'react';

class MovieDescription extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.description && (
      <React.Fragment>
        <tr>
          <td colSpan='5' style={{textAlign: 'left'}}>
            <div style={{width: '100%'}}>
              <div style={{float: 'left', display: 'inline-block', width: '30%'}}>
                <a href={'https://www.imdb.com/title/' + this.props.movie.link}><img 
                  style={{maxWidth: '100%', height: 'auto', width: '100%'}} 
                  src={this.props.movie.poster}
                /></a>
              </div>
              <div style={{float: 'right', display: 'inline-block', width: '65%'}}>
                {this.props.movie.plot}
                <br />
                <br />
                {'Director: ' + this.props.movie.director}
                <br />
                {'Writer: ' + this.props.movie.writer}
                <br />
                {'Starring: ' + this.props.movie.actors}
                <br />
                <br />
                {this.props.movie.genre}
                <br />
                {'Rated ' + this.props.movie.rating}
                <br />
                {this.props.movie.runtime}
                <br />
                {this.props.movie.released}
              </div> 
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default MovieDescription;