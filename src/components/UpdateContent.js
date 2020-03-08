import React, { Component } from 'react';

class UpdateContent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc
      }
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    
    inputFormHandler(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    render() {
    console.log("UpdateContent rendered");
    console.log(this.props.data)
    return (
      <article>
        <h2>Update</h2>
        <form action="/update_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(
              {
                id: this.state.id,
                title: e.target.title.value,
                desc: e.target.desc.value
              }
            );
          }.bind(this)}>
          <p>
            <input 
              type="text" 
              name="title" 
              placeholder="Title"
              onChange={this.inputFormHandler}
              value={this.state.title}/>
          </p>
          <p>
            <textarea 
              name="desc" 
              placeholder="Desc..." 
              onChange={this.inputFormHandler}
              value={this.state.desc}>
            </textarea>
          </p>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form>
      </article>
    )
  }
}

export default UpdateContent;
