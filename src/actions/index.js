export const showModal = prop => ({
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: prop,
});

export const hideModal = prop => ({
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: prop,
});

export const addEvent = event => (dispatch) => {
  const start = ((event.start.split(':')[0] - 8) * 60) + +event.start.split(':')[1];
  const end = ((event.end.split(':')[0] - 8) * 60) + +event.end.split(':')[1];
  fetch('/add', {
    method: 'POST',
    body: JSON.stringify({
      username: window.localStorage.username,
      event: {
        ...event,
        start,
        end,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      dispatch({ type: 'CHANGE_EVENTS', payload: res.user.events });
    })
    .catch(err => console.log(err));
};

export const getEvents = username => (dispatch) => {
  fetch(`/calendar?username=${username}`)
    .then(res => res.json())
    .then((res) => {
      dispatch({ type: 'CHANGE_EVENTS', payload: res.user.events });
    })
    .catch(err => console.log(err));
};

export const removeEvent = (id, username) => (dispatch) => {
  fetch('/remove', {
    method: 'POST',
    body: JSON.stringify({
      id,
      username,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      dispatch({ type: 'CHANGE_EVENTS', payload: res.events });
    })
    .catch(err => console.log(err));
};
