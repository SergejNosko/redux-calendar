export default (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_MODAL_VISIBILITY': {
      return {
        ...state,
        isModalVisible: action.payload,
      };
    }
    case 'ADD_EVENT': {
      return {
        ...state,
        events: action.payload,
      };
    }
    default: return state;
  }
};
