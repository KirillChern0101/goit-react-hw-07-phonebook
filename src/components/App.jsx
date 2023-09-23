import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem('contactList');
    const parsedContacts = JSON.parse(contactsFromLocalStorage);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleSubmit = ({ name, number }) => {
    const existingContactIndex = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContactIndex) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { name, number, id: nanoid() },
    ]);
  };

  const handleDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} handleDelete={handleDelete} />
    </div>
  );
}
