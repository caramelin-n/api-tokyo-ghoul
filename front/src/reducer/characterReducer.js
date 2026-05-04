export const characterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return action.payload;
    case 'ADD_CHARACTER':
      return [...state, action.payload];
    case 'UPDATE_CHARACTER':
      return state.map(char => 
        char.id === action.payload.id ? action.payload : char
      );
    case 'DELETE_CHARACTER':
      return state.filter(char => char.id !== action.payload);
    default:
      return state;
  }
};