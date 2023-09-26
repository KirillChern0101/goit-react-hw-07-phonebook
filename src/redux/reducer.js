import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.items.push(action.payload);
    },
    delContact(state, action) {
      const index = state.items.findIndex(
        contacts => contacts.id === action.payload
      );
      state.items.splice(index, 1);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, delContact, setFilter } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
export const getContacts = state => {
  return state.contacts.items;
};
export const getFilter = state => {
  return state.contacts.filter;
};
