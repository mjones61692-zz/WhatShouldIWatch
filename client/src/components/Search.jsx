import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<React.Fragment>
      <input type="text" value={this.props.input} onChange={this.props.update}></input>
      <input type="submit" value="Add Movie" onClick={this.props.search} style={{margin: '20px'}}></input>
      {this.props.badSearch && <div>Sorry, we could not find that movie. Please try again.</div>}
    </React.Fragment>)
  }
}

export default Search;