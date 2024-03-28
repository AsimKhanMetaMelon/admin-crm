// YourComponent.js

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import app from '../firebase/firebase';

function Crud() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    // fetchData();
    const getData =async ()=>{
        const dbvalue = await getDocs(value)
        console.log(dbvalue)
    } 

    getData()
  }, []);

  const db = getFirestore(app);

  const value = collection(db , "data")


//   const fetchData = async () => {
//     const querySnapshot = await getDocs(collection(db, 'items'));
//     const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     console.log("data ", data)
//     setItems(data);
//   };

  const addItem = async () => {
    try {
      await addDoc(value , {name:itemName});
      setItemName('');
    //   fetchData();
    } catch (error) {
      console.error('Error adding item: ', error);  
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
    //   fetchData();
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const updateItem = async (id, newName) => {
    try {
      await updateDoc(doc(db, 'items', id), { name: newName });
    //   fetchData();
    } catch (error) {
      console.error('Error updating item: ', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder='heree '
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
            <button onClick={() => updateItem(item.id, 'New Name')}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crud;
