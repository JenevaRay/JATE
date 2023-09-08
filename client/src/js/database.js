import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: false });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.log('putDb called on line 17 of database.js')
  const jateDb = await openDB('jate', 1)
  const transaction = jateDb.transaction('jate', 'readwrite')
  const store = transaction.objectStore('jate');
  const response = store.put({ id: 1, value: content });
  const result = await response
  // console.log('result.value: ', result)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.log('getDb called on line 27 of database.js')
  const jateDb = await openDB('jate', 1)
  const transaction = jateDb.transaction('jate', 'readonly')
  const store = transaction.objectStore('jate')
  const request = store.get(1)
  const result = await request
  // console.log('result.value: ', result)
  if (result) {
    return result.value
  } else { 
    return
  }
}

initdb();
