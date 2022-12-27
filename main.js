const { initializeApp, credential } = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const { v4 } = require("uuid");
const { faker } = require("@faker-js/faker");

const serviceAccount = require("./firebase_key.json");

initializeApp({
  credential: credential.cert(serviceAccount),
});

const db = getFirestore();

const docRef = db.collection("contacts").doc(v4());

const addContact = async () => {
  await docRef.set({
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  });
};

const readContacts = async () => {
  const snapshot = await db.collection("contacts").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

const updateContact = async () => {
  await docRef.set({
    name: faker.name.fullName() + "_update",
    phone: faker.phone.number() + "_update",
    email: faker.internet.email() + "_update",
  });
};

const deleteContact = async () => {
  docRef.delete();
};

addContact();
readContacts();
updateContact();
deleteContact();
