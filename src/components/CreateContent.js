import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    
    console.log("CreateContent rendered");
        
    return (
      <article>                
        <h2>Create</h2>
        <form action="/create_process" method="post"
          onSubmit={function(e){
            e.preventDefault();
            this.props.onSubmit(
              e.target.title.value,
              e.target.desc.value
            )
          }.bind(this)}>
          <p>
            <input name="title" type="text" placeholder="Title" />
          </p>
          <p>
            <textarea name="desc" placeholder="Desc..." />
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </article>                
    )
  }
}

export default CreateContent;
