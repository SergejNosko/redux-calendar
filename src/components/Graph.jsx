import React from 'react';
import { connect } from 'react-redux';
import Event from './Event';

class Graph extends React.Component {
  renderEvents = () => {
    let { events } = this.props;

    if (!events.length) return;

    const array = [];
    let subArray = [];

    events = events
      .sort((prev, next) => (prev.start > next.start ? 1 : -1));
    console.log(events);

    for (let i = 1; i < events.length; i++) {
      if (!subArray.length) {
        subArray.push(events[i - 1]);
        continue;
      }
      if (events[i].start <= subArray[subArray.length - 1].end) {
        subArray.push(events[i - 1]);
      } else {
        array.push(subArray);
        subArray = [];
        subArray.push(events[i - 1]);
        if (i === events.length - 1) {
          if (events[i].start <= subArray[subArray.length - 1].end) {
            array[array.length - 1].push(events[i]);
          } else {
            array[array.length - 1].push(events[i - 1]);
            array.push([events[i]]);
          }
        }
      }
    }

    events = array.map(event => event.map((e, i) => ({
      height: e.end - e.start,
      width: 240 / event.length,
      top: e.start,
      id: e._id,
      title: e.title,
      right: (240 / event.length) * i,
    })));

    console.log(events);

    return events.map(event => event.map((e, i) => (
      <Event key={e.id} right={e.right} title={e.title} height={e.height} width={e.width} top={e.top} />
    )));
  }

  render() {
    return (
      <article className="graph">
        <ul className="graph__list">
          <li className="graph__time">8:00</li>
          <li className="graph__time graph__time-small">8:30</li>
          <li className="graph__time">9:00</li>
          <li className="graph__time graph__time-small">9:30</li>
          <li className="graph__time">10:00</li>
          <li className="graph__time graph__time-small">10:30</li>
          <li className="graph__time">11:00</li>
          <li className="graph__time graph__time-small">11:30</li>
          <li className="graph__time">12:00</li>
          <li className="graph__time graph__time-small">12:30</li>
          <li className="graph__time">13:00</li>
          <li className="graph__time graph__time-small">13:30</li>
          <li className="graph__time">14:00</li>
          <li className="graph__time graph__time-small">14:30</li>
          <li className="graph__time">15:00</li>
          <li className="graph__time graph__time-small">15:30</li>
          <li className="graph__time">16:00</li>
        </ul>

        {this.renderEvents()}
      </article>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
});

export default connect(mapStateToProps)(Graph);
