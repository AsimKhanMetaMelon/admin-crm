import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import app from '../firebase/firebase';


function Form() {
  // Define state variables to store the values of input fields
  const [agentName, setAgentName] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [service, setService] = useState('');
  const [cpMethod, setCpMethod] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [salesPrice, setSalesPrice] = useState('');
  const [AccPMethod, setAccPMethod] = useState('');
  const [hotel, setHotel] = useState('');
  const [visa, setVisa] = useState('');
  const [Insurance, setInsurance] = useState('');
  const [Flight, setFlight] = useState('');  
  const [transport, setTransport] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [profit, setProfit] = useState('');
  const [status, setStatus] = useState('');

  const db = getFirestore(app);
  const value = collection(db , "data")
  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    
    if (!agentName || !date || !customerName || !service || !cpMethod || !receivedAmount || !salesPrice || !AccPMethod || !hotel || !visa || !Insurance || !Flight || !transport || !totalCost || !profit || !status) {
      alert("Please fill out all fields."); 
      return; 
    }
  
    try {
      
      const docRef = await addDoc(value, {
        agentName,
        date,
        customerName,
        service,
        cpMethod,
        receivedAmount,
        salesPrice,
        AccPMethod,
        hotel,
        visa,
        Insurance,
        Flight, 
        transport,
        totalCost,
        profit,
        status
      });
      console.log("Document written with ID: ", docRef.id);
  
      // Reset form fields after successful submission
      setAgentName('');
      setDate('');
      setCustomerName('');
      setService('');
      setCpMethod('');
      setReceivedAmount('');
      setSalesPrice('');
      setAccPMethod('');
      setHotel('');
      setVisa('');
      setInsurance('');
      setFlight('');
      setTransport('');
      setTotalCost('');
      setProfit('');
      setStatus('');
  
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit data. Please try again.");
    }
  };
  
  return (
    <div className='flex justify-center align-center mt-10'>
      <form className="w-full max-w-lg border rounded-lg p-7 shadow-slate-700" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">DATA FORM</h2>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="agent-name">
              Agent Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="agent-name" type="text" placeholder="Agent Name" value={agentName} onChange={(e) => setAgentName(e.target.value)}/>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="customer-name">
              Customer Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="customer-name" type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="service">
              Service
            </label>
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="service" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Select Service</option>
              <option value="Visa">Visa</option>
              <option value="Flight">Flight</option>
              <option value="Holidays">Holidays</option>
              <option value="Umrah">Umrah</option>
              <option value="Other">Other</option>
            </select>
          </div> 
        </div>

        
        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpMethod">
              C.P Method
            </label>
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="cpMethod" value={cpMethod} onChange={(e) => setCpMethod(e.target.value)}>
              <option value="">Select C.P Method</option>
              <option value="Paypal">Paypal</option>
              <option value="Stripe">Stripe</option>
              <option value="Payoneer">Payoneer</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Other">Other</option>
            </select>
          </div>  
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="rcvAmount">
              Received Amount
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="rcvAmount" type="number" placeholder="Received Amount" value={receivedAmount} onChange={(e) => setReceivedAmount(e.target.value)}/>
          </div>  
        </div>


          
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salesPrice">
              Sale Price
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="salesPrice" type="number" placeholder="Sales Price" value={salesPrice} onChange={(e) => setSalesPrice(e.target.value)}/>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accPMethod">
              ACC.P.Method
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="accPMethod" type="number" placeholder="ACC.P Method" value={AccPMethod} onChange={(e) => setAccPMethod(e.target.value)}/>
          </div>  
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hotel">
              Hotel Cost 
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="hotel" type="number" placeholder="Hotel Cost" value={hotel} onChange={(e) => setHotel(e.target.value)}/>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="visa">
              Visa Cost
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="visa" type="number" placeholder="Visa Cost" value={visa} onChange={(e) => setVisa(e.target.value)}/>
          </div>  
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="insurance">
              Insurance Cost 
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="insurance" type="number" placeholder="Insurance Cost" value={Insurance} onChange={(e) => setInsurance(e.target.value)}/>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Flight">
              Flight Cost
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Flight" type="number" placeholder="Flight Cost" value={Flight} onChange={(e) => setFlight(e.target.value)}/>
          </div>  
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="transport">
              Transport  Cost 
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="transport" type="number" placeholder="Transport Cost" value={transport} onChange={(e) => setTransport(e.target.value)}/>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Total">
             Total Cost
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Total" type="number" placeholder="Total Cost" value={totalCost} onChange={(e) => setTotalCost(e.target.value)}/>
          </div>  
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="profit">
              Profit
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="profit" type="number" placeholder="Profit" value={profit} onChange={(e) => setProfit(e.target.value)}/>
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="unclosed">Unclosed</option>
              <option value="closed">Closed</option>
              <option value="pending">Pending</option>
            </select>
          </div>   
        </div>

        <div className="flex justify-center">
          <button className="w-full max-w-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
