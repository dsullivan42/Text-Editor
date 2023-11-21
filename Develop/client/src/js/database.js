import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

console.log('Putting content in the database');
// sets a variable to the database with the name 'jate' and version 1
const db = await openDB('jate', 1);
// sets a variable to the transaction in the database with readwrite access
const tx = db.transaction('jate', 'readwrite'); 
// sets a variable to the object store in the transaction with the name 'jate'
const store = tx.objectStore('jate');
// sets a variable to the request to put the content in the database
const request = await store.put(content);
// sets a variable to the result of the request to put the content in the database
const result = await request;
console.log("data added to database", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('Getting content from the database');
// sets a variable to the database with the name 'jate' and version 1
const db = await openDB('jate', 1);
// sets a variable to the transaction in the database with readonly access
const tx = db.transaction('jate', 'readonly');
// sets a variable to the object store in the transaction with the name 'jate'
const store = tx.objectStore('jate');
// sets a variable to the request to get all the content from the database
const request = store.getAll();
// sets a variable to the result of the request to get all the content from the database
const result = await request;
console.log("data retrieved from database", result);
// returns the result of the request to get all the content from the database
return result.value;
};
initdb();
