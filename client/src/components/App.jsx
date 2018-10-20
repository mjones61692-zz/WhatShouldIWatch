import React from 'react';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import dummyData from '../../../dummyData.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      movies: [],
      badSearch: false,
      sort: 'customNum'
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.changeSortImdb = this.changeSortImdb.bind(this);
    this.changeSortMeta = this.changeSortMeta.bind(this);
    this.changeSortRotten = this.changeSortRotten.bind(this);
    this.changeSortAverage = this.changeSortAverage.bind(this);
  }

  updateQuery (e) {
    this.setState({
      userInput: e.target.value
    });
  }

  submitSearch() {
    axios.post('/movies', {
      query: this.state.userInput
    })
      .then((response) => {
        if (response.data.badSearch) {
          this.setState({
            badSearch: true
          })
        } else {
          this.setState({
            badSearch: false
          })
        }
      }).then(() => {
        this.getMovies();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  changeSortImdb() {
    this.setState({
      sort: 'imdbNum'
    }, () => {
      this.getMovies();
    })
  }

  changeSortMeta() {
    this.setState({
      sort: 'metacriticNum'
    }, () => {
      this.getMovies();
    })
  }

  changeSortRotten() {
    this.setState({
      sort: 'rottenTomatoesNum'
    }, () => {
      this.getMovies();
    })
  }

  changeSortAverage() {
    this.setState({
      sort: 'customNum'
    }, () => {
      this.getMovies();
    })
  }

  getMovies() {
    axios.get('/movies' + this.state.sort)
      .then((response) => {
        this.setState({
          movies: response.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (<React.Fragment>
      <h2>Add a movie:</h2>
        <div>
          <Search input={this.state.userInput} update={this.updateQuery} search={this.submitSearch} badsearch={this.state.badSearch}/>     
        </div>
      <h2>Your movie list:</h2>
      <div>
        <MovieList movies={this.state.movies} 
        changeSortImdb={this.changeSortImdb}
        changeSortMeta={this.changeSortMeta}
        changeSortRotten={this.changeSortRotten}
        changeSortAverage={this.changeSortAverage}
        />
      </div>
    </React.Fragment>);
  }
}

export default App;