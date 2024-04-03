import React, { useEffect, useState } from "react";
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

function EditModal(props) {
  const { isOpen, onClose, initialValues, onUpdate } = props;

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
  const [id, setId] = useState("");

  const db = getFirestore(app);
  const value = collection(db, "data");

  useEffect(() => {
    if (initialValues) {
      setAgentName(initialValues.agentName || "");
      setDate(initialValues.date || "");
      setCustomerName(initialValues.customerName || "");
      setService(initialValues.service || "");
      setCpMethod(initialValues.cpMethod || "");
      setReceivedAmount(initialValues.receivedAmount || 0);
      setSalesPrice(initialValues.salesPrice || 0);
      setContact(initialValues.contact || "");
      setHotel(initialValues.hotel || 0);
      setVisa(initialValues.visa || 0);
      setInsurance(initialValues.insurance || 0);
      setFlight(initialValues.flight || 0);
      setTransport(initialValues.transport || 0);
      setStatus(initialValues.status || "");
      setId(initialValues.id || "");
      // Here you are setting all date values to `date`
      // You should set each date state variable to its respective value
      sethotelDate(initialValues.hotelDate || "");
      setvisaDate(initialValues.visaDate || "");
      setinsuranceDate(initialValues.insuranceDate || "");
      setflightDate(initialValues.flightDate || "");
      setTransportDate(initialValues.transportDate || "");
      setVisaCountry(initialValues.visaCountry || "");

      // Also, consider removing the alert for flightDate as it could lead to null alert messages
      // alert(initialValues.flightDate);
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    // alert();
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
    // alert("remain", remaining);
    const profit = parsedReceivedAmount - totalCost;
    // alert("profit", profit);

    const formData = {
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
    };
    // alert(flightDate);
    // alert(hotelDate);
    onUpdate(formData);
    const updatedata = doc(db, "data", id);
    await updateDoc(updatedata, {
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

    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg max-w-full md:max-w-3xl max-h-screen overflow-auto">
            <form className="w-full" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4 text-center">id : {id}</h2>

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
                    placeholder=" Enter Contact Number "
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
                    htmlFor="hotel-date"
                  >
                    Hotel Cost Date
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="hotel-date"
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
                    htmlFor="visa-insurance"
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
                    htmlFor="flight-date"
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

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditModal;
