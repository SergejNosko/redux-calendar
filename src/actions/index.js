export const showModal = () => ({
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: true,
});

export const hideModal = () => ({
  type: 'CHANGE_MODAL_VISIBILITY',
  payload: false,
});

export const addEvent = event => (dispatch) => {
  fetch('/add', {
    method: 'POST',
    body: JSON.stringify({
      username: window.localStorage.username,
      event,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((res) => {
      dispatch({ type: 'ADD_EVENT', payload: res.user.events });
    })
    .catch((err) => { console.log(err); });
};
