import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Form() {
  const [agentName, setAgentName] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [service, setService] = useState("");
  const [cpMethod, setCpMethod] = useState("");
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [contact, setContact] = useState("");
  const [hotel, setHotel] = useState(0);
  const [visa, setVisa] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [flight, setFlight] = useState(0);
  const [transport, setTransport] = useState(0);
  // const [totalCost, setTotalCost] = useState('');
  // const [profit, setProfit] = useState('');
  const [status, setStatus] = useState("");
  const [visaDate, setvisaDate] = useState("");
  const [insuranceDate, setinsuranceDate] = useState("");
  const [flightDate, setflightDate] = useState("");
  const [transportDate, setTransportDate] = useState("");
  const [hotelDate, sethotelDate] = useState("");
  const [visaCountry, setVisaCountry] = useState("");
  const navigate = useNavigate();

  const db = getFirestore(app);
  const value = collection(db, "data");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!agentName || !date || !customerName || !service || !cpMethod || !receivedAmount || !salesPrice || !hotel || !visa || !insurance || !flight || !transport || !status || !visaDate || !hotelDate || !insuranceDate || !flightDate || !transportDate ) {
    //   alert("Please fill out all fields.");
    //   return;
    // }
    // Convert string inputs to numbers
    const parsedHotel = parseFloat(hotel);
    // alert(parsedHotel)
    const parsedVisa = parseFloat(visa);
    const parsedInsurance = parseFloat(insurance);
    const parsedFlight = parseFloat(flight);
    // alert(parsedFlight)
    const parsedTransport = parseFloat(transport);
    const parsedReceivedAmount = parseFloat(receivedAmount);
    const parsedSalesPrice = parseFloat(salesPrice);
    // alert(parsedSalesPrice)

    // Calculate total cost
    const totalCost =
      parsedHotel +
      parsedVisa +
      parsedInsurance +
      parsedFlight +
      parsedTransport;
    // alert(totalCost);
    // Calculate profit
    const remaining = parsedSalesPrice - parsedReceivedAmount;
    // alert(remaining);
    const profit = parsedReceivedAmount - totalCost;
    // alert(profit);

    try {
      const docRef = await addDoc(value, {
        agentName,
        date,
        customerName,
        service,
        cpMethod,
        receivedAmount,
        salesPrice,
        contact,
        hotel,
        visa,
        insurance,
        flight,
        transport,
        totalCost,
        profit,
        status,
        visaDate,
        flightDate,
        hotelDate,
        transportDate,
        insuranceDate,
        remaining,
        visaCountry,
      });
      console.log("Document written with ID: ", docRef.id);

      // Reset form fields after successful submission
      setAgentName("");
      setDate("");
      setCustomerName("");
      setService("");
      setCpMethod("");
      setReceivedAmount("");
      setSalesPrice("");
      // setContact('');
      setHotel("");
      setVisa("");
      setInsurance("");
      setFlight("");
      setTransport("");
      // setTotalCost('');
      // setProfit('');
      setStatus("");
      setvisaDate("");
      setTransportDate("");
      sethotelDate("");
      setinsuranceDate("");
      setFlight("");
      setVisaCountry("");

      alert("Data submitted successfully!");
      navigate("/list");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center mt-12">
      <form
        className="w-full max-w-6xl border rounded-lg p-7 shadow-slate-700"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">DATA FORM</h2>

        {/* row 1 */}
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="agent-name"
            >
              Agent Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="agent-name"
              type="text"
              placeholder="Agent Name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="customer-name"
            >
              Customer Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="customer-name"
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="service"
            >
              Service
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Select Service</option>
              <option value="Visa">Visa</option>
              <option value="Flight">Flight</option>
              <option value="Holidays">Holidays</option>
              <option value="Umrah">Umrah</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* row 2 */}
        <div className="grid grid-cols-4 gap-6 mt-5">
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="cpMethod"
            >
              C.P Method
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="cpMethod"
              value={cpMethod}
              onChange={(e) => setCpMethod(e.target.value)}
            >
              <option value="">Select C.P Method</option>
              <option value="Paypal">Bank Transfer</option>
              <option value="Stripe">3D Stripe Link</option>
              <option value="Payoneer">London Office</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="rcvAmount"
            >
              Received Amount
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="rcvAmount"
              type="number"
              placeholder="Received Amount"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="contact"
            >
              Contact Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="contact"
              type="text"
              placeholder="Enter Contact Number "
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="salesPrice"
            >
              Sale Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="salesPrice"
              type="number"
              placeholder="Sales Price"
              value={salesPrice}
              onChange={(e) => setSalesPrice(e.target.value)}
            />
          </div>
        </div>

        {/* row 3 */}
        <div className="grid grid-cols-4 gap-6 mt-5">
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="hotel"
            >
              Hotel Cost
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="hotel"
              type="number"
              placeholder="Hotel Cost"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="date"
            >
              Hotel Cost Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="date"
              type="date"
              value={hotelDate}
              onChange={(e) => sethotelDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="visa"
            >
              Visa Cost
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="visa"
              type="number"
              placeholder="Visa Cost"
              value={visa}
              onChange={(e) => setVisa(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="visa-date"
            >
              Visa Cost Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="visa-date"
              type="date"
              value={visaDate}
              onChange={(e) => setvisaDate(e.target.value)}
            />
          </div>
        </div>

        {/* row 4 */}
        <div className="grid grid-cols-4 gap-6 mt-5">
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="insurance"
            >
              Insurance Cost
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="insurance"
              type="number"
              placeholder="Insurance Cost"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="insurance-date"
            >
              Insurance Cost Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="insurance-date"
              type="date"
              value={insuranceDate}
              onChange={(e) => setinsuranceDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="Flight"
            >
              Flight Cost
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="Flight"
              type="number"
              placeholder="Flight Cost"
              value={flight}
              onChange={(e) => setFlight(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="flight"
            >
              Flight Cost Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="flight-date"
              type="date"
              value={flightDate}
              onChange={(e) => setflightDate(e.target.value)}
            />
          </div>
        </div>

        {/* row 5 */}
        <div className="grid grid-cols-4 gap-6 mt-5">
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="transport"
            >
              Transport Cost
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="transport"
              type="number"
              placeholder="Transport Cost"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="transport-date"
            >
              Transport Cost Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="transport-date"
              type="date"
              value={transportDate}
              onChange={(e) => setTransportDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="unclosed">Unclosed</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="col-span-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="visa-country"
            >
              Visa Country
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="visa-country"
              value={visaCountry}
              onChange={(e) => setVisaCountry(e.target.value)}
            >
              <option value="">Select Visa Country</option>
              <option value="Austria">Austria</option>
              <option value="France">France</option>
              <option value="Latvia">Latvia</option>
              <option value="Norway">Norway</option>
              <option value="Sweden">Sweden</option>
              <option value="Belgium">Belgium</option>
              <option value="Germany">Germany</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Poland">Poland</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Greece">Greece</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Portugal">Portugal</option>
              <option value="Denmark">Denmark</option>
              <option value="Hungary">Hungary</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Estonia">Estonia</option>
              <option value="Iceland">Iceland</option>
              <option value="Malta">Malta</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Finland">Finland</option>
              <option value="Italy">Italy</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Spain">Spain</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-full max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
