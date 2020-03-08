import React, { Component } from 'react';

class TOC extends Component {
  render() {
    
    console.log("TOC rendered");
    
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a href={"/content/"+data[i].id}
            onClick={function(data,e){
              e.preventDefault();
              this.props.onChangePage(data.id);
            }.bind(this,data[i])}
            >
            {data[i].title}
          </a>
        </li>);
      i++;
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    )
  }
}

export default TOC;
