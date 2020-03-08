import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'welcome',
      selected_content_id: undefined,
      welcome: {title:"Welcome", desc:"Hello, React !!"},
      subject: {title:"Web", sub:"World Wide Web"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interaction"},
        {id:4, title:"Node", desc:"Node is for server-side development"}
      ]
    }
  }

  render() {
    console.log("App rendered");
    var _title, _desc = null;

    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } 
    else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
        }
        i++;
      }
    }

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode:"welcome"  
            });
         }.bind(this)}></Subject>
      {/*<header>
          <h1>
            <a href="/" onClick={function(e){
              e.persist();
              console.log(e);
              e.preventDefault();
              this.setState({
                mode: 'welcome'
              });
            }.bind(this)}>
              {this.state.subject.title}
            </a>
          </h1>
          <span>
            {this.state.subject.sub}
          </span>
        </header>*/}
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            })
          }.bind(this)}
          data={this.state.contents}></TOC>
        <Content 
          title={_title} 
          desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
