const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('db', 'contacts.json');

const getContacts = async contacts => {
    const data = await fs.readFile(contacts);
    return JSON.parse(data);
};

const listContacts = async () => {
    try {
        const contactList = await getContacts(contactsPath);
        console.table(contactList);
    } catch (error) {
        return console.log('Oops something went wrong..:', error);
    }
};

const getContactById = async contactId => {
    try {
        const contactList = await getContacts(contactsPath);
        const filtredContact = contactList.find(
            contact => contact.id === contactId
        );
        console.table(filtredContact);
    } catch (error) {
        return console.log('Oops something went wrong..:', error);
    }
};

const removeContact = async contactId => {
    try {
        const contactList = await getContacts(contactsPath);
        const removedContact = contactList.filter(
            contact => contact.id !== contactId
        );
        console.table(removedContact);
    } catch (error) {
        return console.log('Oops something went wrong..:', error);
    }
};

const addContact = async (name, email, phone) => {
    try {
        const contactList = await getContacts(contactsPath);
        const newContact = {
            id: `${contactList.length + 1}`,
            name,
            email,
            phone,
        };
        const newData = [...contactList, newContact];
        console.table(newData);
        return fs.writeFile(contactsPath, JSON.stringify(newData));
    } catch (error) {
        return console.log('Oops something went wrong..:', error);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
