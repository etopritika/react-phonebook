import React, { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import Contacts from './Contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  filterInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    this.filterContactsHandler();
  };

  filterContactsHandler = () => {
    const filteredItems = this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return filteredItems;
  };

  handleDeleteButton = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const itemsToRender = this.state.filter
      ? this.filterContactsHandler()
      : this.state.contacts;
    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm
          button="Add contact"
          onSubmit={this.formSubmitHandler}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <Filter
          inputValue={this.state.filter}
          onChange={this.filterInputChange}
        />
        <Contacts
          contacts={itemsToRender}
          deleteButton={this.handleDeleteButton}
        />
      </section>
    );
  }
}
