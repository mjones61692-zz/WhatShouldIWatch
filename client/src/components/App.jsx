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
      badSearch: false
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }

  updateQuery (e) {
    this.setState({
      userInput: e.target.value
    });
  }

  submitSearch() {
    console.log('search called');
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
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getMovies() {
    axios.get('/movies')
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
        <MovieList movies={this.state.movies}/>
      </div>
    </React.Fragment>);
  }
}

export default App;