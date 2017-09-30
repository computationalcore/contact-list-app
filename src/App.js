import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import CreateContact from './CreateContact';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {

    state = {
        contacts: []
    };

    /*
     * Lifecycle event handler Called jujst after the App loads into the DOM
     */
    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts })
        })
    }

    removeContact = (contact) => {
        // Remove the contact from the UI
        // Since the app depends on the previous state use a functions instead of an object for setState
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }));

        // Remove the contact from remote server
        ContactsAPI.remove(contact);
    };

    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <ListContacts
                        onDeleteContact={this.removeContact}
                        contacts={this.state.contacts}
                    />
                )}/>
                <Route path='/create' component={CreateContact}/>
            </div>
        )
    }
}

export default App;
