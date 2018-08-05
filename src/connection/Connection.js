import React, { Component } from 'react'

class Connection extends Component {
  render() {
    return (
      <div className="Connection">
        <div className="Attribute">
          { this.props.from } -> { this.props.to }
        </div>
        <div className="Attribute">
          weight: { this.props.weight } 
        </div>
      </div>
    )
  }
}
          
export default Connection 
