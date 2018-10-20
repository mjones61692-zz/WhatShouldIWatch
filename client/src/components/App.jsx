import React from 'react';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import dummyData from '../../../dummyData.js';
import axios from 'axios';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      movies: [],
      badSearch: false,
      sort: 'customNum',
      takenUser: false,
      username: '',
      noUser: false,
      login: false,
      user: '',
      wrongPassword: false,
      password: ''
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.changeSortImdb = this.changeSortImdb.bind(this);
    this.changeSortMeta = this.changeSortMeta.bind(this);
    this.changeSortRotten = this.changeSortRotten.bind(this);
    this.changeSortAverage = this.changeSortAverage.bind(this);
    this.clearList = this.clearList.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
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
            badSearch: true,
            userInput: ''
          })
        } else {
          this.setState({
            badSearch: false,
            userInput: ''
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

  clearList() {
    axios.get('/clear')
      .then(() => {
        this.setState({
          movies: []
        });
      })
      .catch((err) => {
        console.error(err);
      });
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

  addUser() {
    axios.post('/signup', {
      user: this.state.username,
      pass: hash
    })
    .then((response) => {
      if (response.data.takenUser) {
        this.setState({
          takenUser: true,
          username: '',
          password: ''
        })
      } else {
        let userTemp = this.state.username;
        this.setState({
          takenUser: false,
          noUser: false,
          login: true,
          username: '',
          user: userTemp,
          wrongPassword: false,
          password: ''
        })
      }
    }).then(() => {
      this.getMovies();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  logout() {
    axios.get('/logout')
      .then(() => {
        this.setState({
          login: false,
          user: '',
          movies: []
        })
      })
  }

  login() {
    axios.post('/login', {
      user: this.state.username,
      pass: this.state.password
    })
      .then((response) => {
        if (response.data.noUser) {
          this.setState({
            noUser: true,
            username: '',
            password: ''
          })
        } else if (response.data.wrongPassword) {
          this.setState({
            wrongPassword: true,
            username: '',
            password: ''
          })
        } else {
          let userTemp = this.state.username;
          this.setState({
            takenUser: false,
            noUser: false,
            login: true,
            username: '',
            user: userTemp,
            wrongPassword: false,
            password: ''
          })
        }
      }).then(() => {
        this.getMovies();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateUser(e) {
    this.setState({
      username: e.target.value
    })
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (<React.Fragment>
      <h4>Login to see saved movies:
        <Login wrongPassword={this.state.wrongPassword} password={this.state.password} updatePassword={this.updatePassword} noUser={this.state.noUser} username={this.state.username} login={this.login} updateUser={this.updateUser} addUser={this.addUser} takenUser={this.state.takenUser}/>
        {this.state.login && <p style={{float: 'right'}}>
          {this.state.user}
          <input type='submit' value='Logout' onClick={this.logout} style={{margin: '20px'}}></input>
        </p>}     
      </h4>
      <h2>Add a movie:</h2>
      <div>
        <Search input={this.state.userInput} update={this.updateQuery} search={this.submitSearch} badSearch={this.state.badSearch}/>     
      </div>
      <h3>Rank by:
        <input type='submit' value='IMDb Score' onClick={this.changeSortImdb} style={{margin: '20px'}}></input>
        <input type='submit' value='Rotten Tomatoes Score' onClick={this.changeSortRotten} style={{margin: '20px'}}></input>
        <input type='submit' value='Metacritic Score' onClick={this.changeSortMeta} style={{margin: '20px'}}></input>
        <input type='submit' value='Average' onClick={this.changeSortAverage} style={{margin: '20px'}}></input>
      </h3>
      <h2>Your movie list:
        <input type='submit' value='Clear List' onClick={this.clearList} style={{margin: '20px'}}></input>
      </h2>
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