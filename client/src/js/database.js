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

export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1)
  const transaction = jateDb.transaction('jate', 'readwrite')
  const store = transaction.objectStore('jate');
  const response = store.put({ id: 1, value: content });
  const result = await response
}

export const getDb = async () => {
  const jateDb = await openDB('jate', 1)
  const transaction = jateDb.transaction('jate', 'readonly')
  const store = transaction.objectStore('jate')
  const request = store.get(1)
  const result = await request
  if (result) {
    return result.value
  } else { 
    return
  }
}

initdb();
