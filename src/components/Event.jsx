import React from 'react';
import { connect } from 'react-redux';
import { removeEvent } from '../actions/index';

class Event extends React.Component {
  onClick = () => {
    this.props.removeEvent(this.props.id, window.localStorage.username);
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

const mapDispatchToProps = {
  removeEvent,
};

export default connect(null, mapDispatchToProps)(Event);
