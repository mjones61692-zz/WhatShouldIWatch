import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<React.Fragment>
      <input type="text" value={this.props.username} onChange={this.props.updateUser} style={{margin: '20px'}}></input>
      <input type="submit" value="Login" onClick={this.props.login}></input>
      <input type="submit" value="Create User" onClick={this.props.addUser} style={{margin: '20px'}}></input>
      {this.props.takenUser && <div>Sorry, that username is already taken. Please try again.</div>}
      {this.props.noUser && <div>Sorry, that username does not exist. Please try again or create a username.</div>}
    </React.Fragment>)
  }
}

export default Login;