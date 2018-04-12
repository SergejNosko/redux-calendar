import React from 'react';
import { connect } from 'react-redux';
import { hideModal } from '../actions/index';

class JSONModal extends React.Component {
  onClose = () => {
    this.props.hideModal({ isJSONModalVisible: false });
  }

  render() {
    return (
      <div className={`modal-window ${this.props.isJSONModalVisible ? 'modal-window_active' : ''}`}>
        <div className="json-modal">
          <ul className="json-modal__list">
            {this.props.events.map(e => (<li className="json-modal__item" key={e._id}>{JSON.stringify({ start: e.start, end: e.end, title: e.title })}</li>))}
          </ul>
          <button className="json-modal__button" onClick={this.onClose}>Close</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
  isJSONModalVisible: state.isJSONModalVisible,
});

const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(JSONModal);
