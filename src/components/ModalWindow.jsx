import React from 'react';
import { connect } from 'react-redux';
import { hideModal, addEvent } from '../actions/index';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.start = null;
    this.duration = null;
    this.title = null;
  }

  onClose = (e) => {
    e.preventDefault();

    this.start.value = '';
    this.duration.value = '';
    this.title.value = '';

    this.props.hideModal({ isModalVisible: false });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const event = {
      start: this.start.value,
      end: this.duration.value,
      title: this.title.value,
    };

    this.props.addEvent(event);
  }

  render() {
    return (
      <div className={`modal-window ${this.props.isModalVisible ? 'modal-window_active' : ''}`}>
        <form
          className="modal-window__form"
          onSubmit={this.onSubmit}
        >
          <input type="time" className="modal-window__text" ref={(node) => { this.start = node; }} placeholder="Start" />
          <input type="time" className="modal-window__text" ref={(node) => { this.duration = node; }} placeholder="Duration" />
          <input type="text" className="modal-window__text" ref={(node) => { this.title = node; }} placeholder="Title" />
          <div className="modal-window__wrapper">
            <input type="submit" className="modal-window__submit" value="Submit" />
            <button onClick={this.onClose}>Close</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isModalVisible: state.isModalVisible,
});

const mapDispatchToProps = {
  hideModal,
  addEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
