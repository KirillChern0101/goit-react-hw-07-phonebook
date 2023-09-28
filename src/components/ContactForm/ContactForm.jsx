import React from 'react';
import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    const name = e.name;
    const number = e.number;
    const contactsList = [...contacts];

    if (contactsList.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ name, number }));
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    handleSubmit({ name: name, number: number });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <label className={css.formLabel}>Name </label>
      <input
        className={css.formName}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        placeholder="Enter name"
        value={name}
        onChange={handleChange}
      />
      <label className={css.formLabel}>Number </label>
      <input
        className={css.formNumber}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Enter phone number"
        value={number}
        onChange={handleChange}
      />
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
