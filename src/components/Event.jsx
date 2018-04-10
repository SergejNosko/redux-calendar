import React from 'react';

class Event extends React.Component {
  onClick = () => {

  }

  render() {
    return (
      <div
        className="event"
        style={{
          top: `${this.props.top * 1.5}px`,
          height: `${this.props.height * 1.5}px`,
          width: `${this.props.width}px`,
          right: `${this.props.right}px`,
        }}
        onClick={this.onClick}
      >
        <span className="event__title">{this.props.title}</span>
      </div>
    );
  }
}

export default Event;
