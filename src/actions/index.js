export const showModal = () => ({
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: true,
});

export const hideModal = () => ({
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: false,
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
      dispatch({ type: 'ADD_EVENT', payload: res.user.events });
    })
    .catch(err => console.log(err));
};

export const getEvents = username => (dispatch) => {
  fetch(`/calendar?username=${username}`)
    .then(res => res.json())
    .then((res) => {
      dispatch({ type: 'ADD_EVENT', payload: res.user.events });
    })
    .catch(err => console.log(err));
};
