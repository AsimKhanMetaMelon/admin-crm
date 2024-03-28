import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import app from '../firebase/firebase';
import EditModal from './EditModal';

function List() {
  const db = getFirestore(app);
  const value = collection(db, "data");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const getDataFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(value);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
      setLoading(false);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getDataFromFirestore();
  }, []);


  const handleEdit = (item) => {
    setEditItem(item);
    setEditModalOpen(true);
  };

  const handleUpdate = (updatedData) => {
    // Implement update functionality here
    console.log("Updated data:", updatedData);
    // Close the modal after updating
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "data", id));
      // Filter out the deleted item from the data state
      setData(data.filter(item => item.id !== id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialValues={editItem}
        onUpdate={handleUpdate}
      />
      {loading ? (
        <p>Data is loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Agent Name</th>
              <th className="border border-gray-500 px-4 py-2">Date</th>
              <th className="border border-gray-500 px-4 py-2">Customer Name</th>
              <th className="border border-gray-500 px-4 py-2">Service</th>
              <th className="border border-gray-500 px-4 py-2">C.P Method</th>
              <th className="border border-gray-500 px-4 py-2">Received Amount</th>
              <th className="border border-gray-500 px-4 py-2">Sale Price</th>
              <th className="border border-gray-500 px-4 py-2">ACC P Method</th>
              <th className="border border-gray-500 px-4 py-2">Hotel Cost</th>
              <th className="border border-gray-500 px-4 py-2">Visa Cost</th>
              <th className="border border-gray-500 px-4 py-2">Insurance Cost</th>
              <th className="border border-gray-500 px-4 py-2">Flight Cost</th>
              <th className="border border-gray-500 px-4 py-2">Transport Cost</th>
              <th className="border border-gray-500 px-4 py-2">Total Cost</th>
              <th className="border border-gray-500 px-4 py-2">Profit</th>
              <th className="border border-gray-500 px-4 py-2">Status</th>
              <th className="border border-gray-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(item => (
              <tr key={item.id}>
                <td className="border border-gray-500 px-4 py-2">{item?.agentName}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.date}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.customerName}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.service}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.cpMethod}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.receivedAmount}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.salesPrice}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.cpMethod}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.hotel}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.visa}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.Insurance}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.Flight}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.transport}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.totalCost}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.profit}</td>
                <td className="border border-gray-500 px-4 py-2">{item?.status}</td>
                <td className="border border-gray-500 px-4 py-2">
                <button onClick={() => handleEdit(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List;
