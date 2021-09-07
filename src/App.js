import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import Form from "./components/Form/Form";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import initContacts from "./initContacts.json";
import css from "./App.module.css";

class App extends Component {
  static defaultProps = {
    initContacts: initContacts,
  };

  state = {
    contacts: initContacts,
    filter: "",
  };

  randomId = () => uuidv4();

  formSubmitHandle = ({ name, number }) => {
    const contact = {
      id: this.randomId(),
      name,
      number,
    };

    this.setState(({ contacts }) => {
      const found = contacts.find((contact) => contact.name === name);
      if (!found) {
        return { contacts: [contact, ...contacts] };
      }
      alert(`${name} is already in contacts`);
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = (ev) => {
    this.setState({
      filter: ev.currentTarget.value,
    });
  };

  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h2 className={css.title_phonebook}>Phonebook</h2>
        <Form onSubmit={this.formSubmitHandle} />
        <h2 className={css.title_contacts}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
