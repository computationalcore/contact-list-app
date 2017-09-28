import React, {Component} from 'react';
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
        // Since the app depends on the previous state use a functions instead of an object for setState
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }))
    };

    render() {
        return (
            <div>
                <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} />
            </div>
        )
    }
}

export default App;
