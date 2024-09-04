
import React, { useState, useEffect } from "react";
import axios from "axios";
import DqNavbar from "../components/DqNavbar";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaFilter,
  FaChartBar,
  FaCalculator,
  FaIdBadge,
  FaKey,
  FaCheckCircle,
} from "react-icons/fa";

const ExceptionRecords = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState('/Charts');
  const fetchRules = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/exception_results');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <DqNavbar />
      <div className="container mt-20 mx-auto p-6 border border-gray-300 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mt-10">Exception Records</h1>
        <div className="mt-5 p-5 flex items-center space-x-5 border border-gray-300 shadow-lg rounded-lg">
          <div className="flex items-center">
            <label htmlFor="filterById" className="flex items-center">
              <FaIdBadge className="mr-2" /> Filter By ID:
            </label>
            <input
              type="text"
              id="filterById"
              className="ml-2 w-50 h-50 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="filterByKeys" className="flex items-center">
              <FaKey className="mr-2" /> Filter By Keys:
            </label>
            <input
              type="text"
              id="filterByKeys"
              className="ml-2 w-50 h-50 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="filterByResolution" className="flex items-center">
              <FaCheckCircle className="mr-2" /> Filter By Resolution:
            </label>
            <input
              type="text"
              id="filterByResolution"
              className="ml-2 w-50 h-50 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="ml-2 my-5 bg-blue-600 hover:bg-blue-500 rounded-md w-64 flex items-center justify-center py-2 px-4"
          >
            <FaFilter className="mr-2" /> Filter
          </button>
        </div>
        <div className="mx-2 mt-10 max-h-[265px] max-w-full overflow-y-auto rounded-lg shadow-lg p-4 text-center">
          <table className="w-full border-collapse border border-black">
            <thead className="top-0 bg-gray-200 hover:bg-gray-300 transition duration-300">
              <tr>
                <th className="border border-black p-2">Serial No</th>
                <th className="border border-black p-2">Exception_Id</th>
                <th className="border border-black p-2">Primary Key</th>
                <th className="border border-black p-2">Logic</th>
                <th className="border border-black p-2">Created Date</th>
                <th className="border border-black p-2">Created Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>

                  <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                    {item.id}
                  </td>
                  <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                    {item.exception_id}
                  </td>
                  <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                    {item.primary_key}
                  </td>
                  <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                    {item.logic}
                  </td>
                  <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                    {item.created_date}
                  </td>
                  <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                    {item.created_time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 p-5 mx-auto text-center">
          <textarea
            name=""
            id=""
            rows="10"
            className="border border-black rounded-xl w-1/2 h-1/2 mx-auto"
          ></textarea>
        </div>
        <div className="mx-auto flex space-x-5 my-5 justify-center">

          <Link to='/Charts'>
            <button
              type="submit"
              onClick={() => setActiveLink('/Charts')}
              className="text-white bg-blue-600 hover:bg-blue-500 rounded-md w-48 flex items-center justify-center py-2 px-4"
            >
              <FaChartBar className="mr-2" /> Create Charts
            </button>
          </Link>



          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-500 rounded-md w-48 flex items-center justify-center py-2 px-4"
          >
            <FaCalculator className="mr-2" /> Calculate Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExceptionRecords;
