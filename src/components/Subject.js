import React, { Component } from 'react';

class Subject extends Component {
  render() {
    
    console.log("Subject rendered");

    return (
      <header>
        <h1>
          <a href="/" onClick={function(e){
            e.preventDefault();
            this.props.onChangePage();
          }.bind(this)}>
            {this.props.title}
          </a>
        </h1>
        <span>
          {this.props.sub}
        </span>
      </header>
    )
  }
}

export default Subject;
