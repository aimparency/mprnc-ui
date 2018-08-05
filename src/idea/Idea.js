import React, { Component } from 'react'

class Idea extends Component {
  render() {
    return (
      <div className="Idea">
        <div className="Attribute">
          Id: { this.props.id }
        </div>
        <div className="Attribute">
          Title: { this.props.title }
        </div>
      </div>
    )
  }
}
          
export default Idea 
