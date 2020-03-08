import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

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

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var content = this.state.contents[i];
      if (content.id === this.state.selected_content_id) {
        return content;
      }
      i++;
    }
  }
  
  getContent() {
    var data, _article = null;

    if (this.state.mode === 'welcome') {
      data = this.state.welcome;
      _article = <ReadContent title={data.title} desc={data.desc}></ReadContent>
    } 
    else if (this.state.mode === 'read') {
      data = this.getReadContent();
      _article = <ReadContent title={data.title} desc={data.desc}></ReadContent>
    }
    else if (this.state.mode === 'create') {
      _article = 
        <CreateContent 
          onSubmit={function(_title, _desc){
            console.log(_title,_desc);
            var new_idx = this.state.contents.length + 1;
            var _contents = this.state.contents.concat(
              {id: new_idx, title: _title, desc: _desc}
            );
            this.setState({
              contents: _contents          
            });
            }.bind(this)}></CreateContent>
    }
    else if (this.state.mode === 'update') {
      var _contents = Array.from(this.state.contents);
      var _content = this.getReadContent();
      if (_content != null) {
        _article = 
          <UpdateContent 
            data={_content} 
            onSubmit={function(updated_data){
              var i = 0;
              while (i < this.state.contents.length) {
                if (this.state.contents[i].id === updated_data.id) {
                  _contents[i] = {id: updated_data.id, title: updated_data.title, desc: updated_data.desc};
                  break;
                }
                i++;
              }
              this.setState({
                contents: _contents,
                mode: 'read'
              });
            }.bind(this)}>
          </UpdateContent> 
      } 
      else {
        return 'Nothing to update';
      }
    }
    
    return _article;
  }

  render() {
    console.log("App rendered");

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
        <Control onChangeMode={function(_mode){
          if (_mode === 'delete') {
            if (this.state.selected_content_id != null) {
              if (window.confirm("Are you sure you want to delete this one?")) {
                var _contents = Array.from(this.state.contents);
                var i =0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i,1);
                    break;
                  }
                  i++;
                }
                alert("Successfully deleted");
             
                this.setState({
                  mode: 'welcome',
                  contents: _contents
                });
              }
            }
          }
          else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)}></Control>
      
        {this.getContent()}

      </div>
    );
  }
}

export default App;
