const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
const crypto = require("crypto");
const argv = require("yargs").argv;

class Contacts {
  static listContacts = () => {
    fs.readFile(contactsPath).then((data) => {
      const arrContacts = JSON.parse(data);

      if (!arrContacts.length) return console.log("Contacts not found!");
      console.table(arrContacts);
    });
  };

  static getContactById = (contactId) => {
    if (!contactId || contactId === true)
      return console.log("Please! Enter contact ID!");

    fs.readFile(contactsPath).then((data) => {
      const arrData = JSON.parse(data);
      const findContact = arrData.find((i) => i.id === contactId.toString());

      if (!findContact) return console.log("Contact not found!");
      console.log(findContact);
    });
  };
  static removeContact = (contactId) => {
    fs.readFile(contactsPath).then((data) => {
      const arrData = JSON.parse(data);
      const updateArr = arrData.filter((i) => i.id !== contactId.toString());

      if (arrData.length === updateArr.length)
        return console.log("Sorry! Contact does not exist!");

      fs.writeFile(contactsPath, JSON.stringify(updateArr, null, 2));
      console.log("Success!");
    });
  };

  static addContact = (name, email, phone) => {
    fs.readFile(contactsPath).then((data) => {
      const arrData = JSON.parse(data);

      if (
        !name ||
        name === true ||
        !email ||
        email === true ||
        !phone ||
        phone === true
      )
        return console.log("Error! Enter correct data!");

      if (name && email && phone) {
        arrData.push({
          id: crypto.randomUUID(),
          name,
          email,
          phone: phone.toString(),
        });

        fs.writeFile(contactsPath, JSON.stringify(arrData, null, 2));
        console.log("Success!");
        return;
      }
    });
  };

  static actionContacts = (action, id, name, email, phone) => {
    switch (action) {
      case "list":
        this.listContacts();
        break;

      case "get":
        this.getContactById(id);
        break;

      case "add":
        this.addContact(name, email, phone);
        break;

      case "remove":
        this.removeContact(id);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  };

  static init = ({ action, id, name, email, phone }) => {
    this.actionContacts(action, id, name, email, phone);
  };
}

module.exports = Contacts.init(argv);
