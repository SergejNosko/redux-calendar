import React from 'react';
import { connect } from 'react-redux';
import MainMenu from './MainMenu';
import ModalWindow from './ModalWindow';
import Graph from './Graph';
import JSONModal from './JSONModal';
import { getEvents } from '../actions/index';

class Calendar extends React.Component {
  componentDidMount() {
    const { username } = window.localStorage;
    if (username) {
      this.props.getEvents(username);
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="calendar">
        <h1>Calendar</h1>
        <MainMenu history={this.props.history} />
        <ModalWindow />
        <JSONModal />
        <Graph />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getEvents,
};

export default connect(null, mapDispatchToProps)(Calendar);
