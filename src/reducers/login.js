const initState = {
  name: 'blabla',
};

export default function Login(state = initState, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: return state;
  }
}
