import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/index';

class MainMenu extends React.Component {
  showModal = (e) => {
    e.preventDefault();

    this.props.showModal();
  }

  render() {
    return (
      <nav className="main-menu">
        <ul className="main-menu__list">
          <li className="main-menu__item">
            <button className="main-menu__button" onClick={this.showModal}>Add Event</button>
          </li>
          <li className="main-menu__item">
            <button className="main-menu__button">Export to JSON</button>
          </li>
          <li className="main-menu__item">
            <button className="main-menu__button">Log Out</button>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  showModal,
};

export default connect(null, mapDispatchToProps)(MainMenu);
