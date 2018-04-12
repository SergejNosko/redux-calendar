export default (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_MODAL_VISIBILITY': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'CHANGE_EVENTS': {
      return {
        ...state,
        events: action.payload,
      };
    }
    default: return state;
  }
};
