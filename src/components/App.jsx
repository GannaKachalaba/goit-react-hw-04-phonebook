import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Message from 'components/Message/Message';
import Modal from 'components/Modal/Modal';
import css from 'components/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    parsedContacts ? setContacts(parsedContacts) : setContacts([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Report.warning(
          `${name}`,
          'This user is already in the contact list.',
          'OK'
        )
      : setContacts(prevContacts => [newContact, ...prevContacts]);
    toggleModal();
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => setFilter(e.target.value);

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        Phone<span className={css.title__color}>book</span>
      </h1>
      <button className={css.button} type="button" onClick={toggleModal}>
        <span className={css.button__text}>Add new contact</span>{' '}
        <BsFillPersonPlusFill size={20} />
      </button>
      {showModal && (
        <Modal onClose={toggleModal} title="Add contact">
          <ContactForm onSubmit={addContact} />
        </Modal>
      )}

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />

      {contacts.length !== 0 ? (
        <ContactList
          contacts={filtredContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <Message text="Contact list is empty." />
      )}
    </div>
  );
};

export default App;
