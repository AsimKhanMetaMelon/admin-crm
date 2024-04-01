import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app from "../firebase/firebase";
import EditModal from "./EditModal";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
      console.log(newData);
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
      setData(data.filter((item) => item.id !== id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const handleGeneratePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.text("Table", 10, 10);

    const tableRows = [];
    data.forEach((item) => {
      const rowData = [
        item.agentName,
        item.date,
        item.customerName,
        item.service,
        item.salesPrice,
        item.totalCost,
        item.profit,
        item.remaining,
        item.status,
      ];
      tableRows.push(rowData);
    });

    const columnWidths = [
      { cellWidth: 60 },
      { cellWidth: 60 },
      { cellWidth: 60 },
      { cellWidth: 60 },
      { cellWidth: 50 },
      { cellWidth: 50 },
      { cellWidth: 50 },
      { cellWidth: 50 },
      { cellWidth: 50 },
    ];

    const totalPagesExp = "{total_pages_count_string}";

    doc.autoTable({
      head: [
        [
          "Agent Name",
          "Date",
          "Customer Name",
          "Service",
          "Sales Price",
          "Total Cost",
          "Profit",
          "Remaining",
          "status",
        ],
      ],
      body: tableRows,
      styles: {
        fontSize: 10,
        cellPadding: 2,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
        valign: "middle",
      },
      columnStyles: columnWidths,
      margin: { top: 40 },
      addPageContent: function (data) {
        doc.text("Page " + data.pageCount, 550, 30);
      },
      didDrawPage: function (data) {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.setFontStyle("normal");
        if (typeof doc.putTotalPages === "function") {
          doc.putTotalPages(totalPagesExp);
        }
      },
    });

    doc.save("table_data.pdf");
  };

  // Function to calculate text width
  function getTextWidth(text, font, fontSize) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px ${font}`;
    return context.measureText(text).width;
  }

  return (
    <div className="overflow-x-auto">
      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialValues={editItem}
        onUpdate={handleUpdate}
      />

      <button
        onClick={handleGeneratePDF}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mb-4"
      >
        Generate PDF
      </button>
      {loading ? (
        <div className="flex justify-center align-middle">
          <p>Data is loading...</p>
        </div>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Agent Name
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">Date</th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Customer Name
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Service
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                C.P Method
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Received Amount
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Sale Price
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                ACC P Method
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Hotel Cost
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Hotel Cost Date
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Visa Cost
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Visa Cost Date
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Insurance Cost
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Insurance Cost Date
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Flight Cost
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Flight Cost Date
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Transport Cost
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Transport Cost Date
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Total Cost
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Profit
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Remaining
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Status
              </th>
              <th className="border border-gray-500 px-1 py-1 text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.agentName}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.date}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.customerName}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.service}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.cpMethod}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.receivedAmount}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.salesPrice}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.AccPMethod}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.hotel}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.hotelDate}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.visa}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.visaDate}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.insurance}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.insuranceDate}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.flight}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.flightDate}
                </td>
                <td className="border border-gray-500 px-1 py-1 text-xs">
                  {item?.transport}
                </td>
                <td className="border border-gray-500 text-xs px-1 py-1">
                  {item?.transportDate}
                </td>
                <td className="border border-gray-500 px-1 text-xs py-2">
                  {item?.totalCost}
                </td>
                <td
                  className={`border border-gray-500 px-1 text-xs py-1 ${
                    item.profit >= 0 ? "bg-green-500" : "bg-red-800"
                  }`}
                >
                  {item?.profit}
                </td>
                <td className="border border-gray-500 px-1  text-xs py-1">
                  {item?.remaining}
                </td>
                <td className="border border-gray-500 px-1  text-xs py-1">
                  {item?.status}
                </td>
                <td className="border border-gray-500 px-1 text-xs py-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  >
                    Delete
                  </button> */}
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
