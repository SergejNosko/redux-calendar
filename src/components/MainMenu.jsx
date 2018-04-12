import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/index';

class MainMenu extends React.Component {
  onLogOut = () => {
    window.localStorage.removeItem('username');

    this.props.history.push('/');
  }

  showModal = () => {
    this.props.showModal({ isModalVisible: true });
  }

  showJSONModal = () => {
    this.props.showModal({ isJSONModalVisible: true });
  }

  render() {
    return (
      <nav className="main-menu">
        <ul className="main-menu__list">
          <li className="main-menu__item">
            <button className="main-menu__button" onClick={this.showModal}>Add Event</button>
          </li>
          <li className="main-menu__item">
            <button className="main-menu__button" onClick={this.showJSONModal}>Export to JSON</button>
          </li>
          <li className="main-menu__item">
            <button className="main-menu__button" onClick={this.onLogOut}>Log Out</button>
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
