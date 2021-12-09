const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath).then((data) => {
    const arrContacts = JSON.parse(data);

    if (!arrContacts.length) return console.log("Contacts not found!");
    console.table(arrContacts);
  });
}

function getContactById(contactId) {
  if (!contactId || contactId === true)
    return console.log("Please! Enter contact ID!");

  fs.readFile(contactsPath).then((data) => {
    const arrData = JSON.parse(data);
    const findContact = arrData.find((i) => Number(i.id) === contactId);

    if (!findContact) return console.log("Contact not found!");
    console.log(findContact);
  });
}
function removeContact(contactId) {
  fs.readFile(contactsPath).then((data) => {
    const arrData = JSON.parse(data);
    const updateArr = arrData.filter((i) => Number(i.id) !== contactId);

    if (arrData.length === updateArr.length)
      return console.log("Sorry! Contact does not exist!");

    fs.writeFile(contactsPath, JSON.stringify(updateArr, null, 2));
    console.log("Success!");
  });
}

function addContact(name, email, phone) {
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
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
