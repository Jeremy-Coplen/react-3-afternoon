import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: ""
    }

    this.updateInput = this.updateInput.bind(this)
    this.searchPost = this.searchPost.bind(this)
  }

  updateInput(val) {
    this.setState({
      userInput: val
    },() => this.searchPost())
    
  }

  searchPost() {
      this.props.searchPostFn(this.state.userInput)
  }
  
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input 
          placeholder="Search Your Feed"
          value={this.state.userInput}
          onChange={e => this.updateInput(e.target.value)}/>

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}