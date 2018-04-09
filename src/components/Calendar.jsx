import React from 'react';
import MainMenu from './MainMenu';
import ModalWindow from './ModalWindow';

class Calendar extends React.Component {
  render() {
    return (
      <div className="calendar">
        <h1>Calendar</h1>
        <MainMenu />
        <ModalWindow />
      </div>
    );
  }
}

export default Calendar;
