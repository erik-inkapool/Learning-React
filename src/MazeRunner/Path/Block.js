import React, { Component } from 'react';
import './Path.css';

class World extends Component {
  render() {
    var blockStyle = {
      width: this.props.blockWidth,
      height: this.props.blockWidth,
      transform: 'translate(' + this.props.xPos + 'px, ' + this.props.yPos + 'px)',
      backgroundColor: this.props.color,
      borderLeftWidth: this.props.walls[0] ? 0 : 1, 
      borderTopWidth: this.props.walls[1] ? 0 : 1, 
      borderRightWidth: this.props.walls[2] ? 0 : 1, 
      borderBottomWidth: this.props.walls[3] ? 0 : 1, 
    }
    return (
      <div style={blockStyle} className="Block"></div>
    );
  }
}

export default World;
