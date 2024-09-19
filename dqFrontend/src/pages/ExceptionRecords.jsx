import React, { useState, useEffect } from "react";
import axios from "axios";
import DqNavbar from "../components/DqNavbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaFilter, FaChartBar, FaCalculator, FaIdBadge } from "react-icons/fa";
// import exceptionResults from "../data/exceptionResults";

const ExceptionRecords = () => {
  const [data, setData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState('/Charts');
  const [exceptionId, setExceptionId] = useState(''); // Input for exception ID
  const [error, setError] = useState('');
 
 
  // Function to fetch data
  const fetchRules = async (id = null) => {
    setLoading(true);
    try {
      const response = id
        ? await axios.get(`http://localhost:5000/api/exception_results/${id}`)
        : await axios.get('http://localhost:5000/api/exception_results'); // Adjust the API for default fetch
 
      setData(response.data); // Update data state
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setLoading(false);
    }
  };
 
  // Trigger API call on page load
  useEffect(() => {
    fetchRules(); // Fetches data without exception_id on page load
  }, []);
 
  // Handler for button click to fetch with exception_id
  const handleButtonClick = () => {
    if (!exceptionId) {
      alert('Please enter a valid exception ID');
      return;
    }
    fetchRules(exceptionId); // Fetches data using entered exception_id
  };
 
 
  const fetchData = async () => {
 
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/exception_stats');
      // Convert the data to a string format suitable for textarea
      const { total_records, records_by_exception_id } = response.data;
   
      // Format the data into a key-value pair string
      let formattedData = `Total Records: ${total_records}\n\nRecords by Exception ID:\n`;
      records_by_exception_id.forEach(record => {
        formattedData += `Exception ID: ${record.exception_id}, Count: ${record.count}\n`;
      });
      //const formattedData = JSON.stringify(response.data, null, 2); // Pretty print with indentation
       setSummaryData(formattedData);
 
 
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setSummaryData('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <DqNavbar />
      <div className="container mt-20 mx-auto p-6 border border-gray-300 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mt-5">Exception Records</h1>

        {/* Filter input and button */}
        <div className="mt-1 p-5 flex justify-center items-center space-x-5 w-1/3  mx-auto">
          <div className="flex items-center">
            <label htmlFor="filterById" className="flex items-center">
              <FaIdBadge className="mr-2" /> Filter By ID:
            </label>
            <input
              type="text"
              id="filterById"
              value={exceptionId}
              onChange={(e) => setExceptionId(e.target.value)}
              className="ml-2 w-36 p-2 h-10 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            onClick={handleButtonClick}
            className="bg-blue-600 hover:bg-blue-500 rounded-md w-32 h-10 flex items-center justify-center py-2 px-4"
          >
            <FaFilter className="mr-2" /> Filter
          </button>
        </div>

        <div className="mx-10 mt-4 rounded-lg shadow-lg p-4 text-center">
          <h1 className="mb-3 text-xl fw-bold">
            Total number of exception records: {data.length}
          </h1>

          <div className="max-h-[265px] max-w-full overflow-y-auto">
            <table className="w-full border-collapse border border-gray">
              {/* Fixed Header */}
              <thead className="bg-blue-600 text-white sticky top-0 z-20 ">
                <tr>
                  <th className="border border-gray hover:bg-blue-500 p-2">
                    Serial No
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2">
                    Exception_Id
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2">
                    Primary Key
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2">
                    Logic
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2">
                    Created Date
                  </th>
                  {/* <th className="border border-gray hover:bg-blue-500 p-2">
                    Created Time
                  </th> */}
                  <th className="border border-gray hover:bg-blue-500 p-2">
                    Valid Upto
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
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
                    {/* <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                      {item.created_time}
                    </td> */}
                    <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                      {item.valid_upto}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4">No data available</td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 p-5 mx-auto text-center">
          <textarea
            rows="10"
            className="border border-gray rounded-xl w-1/2 h-1/2 mx-auto"
            value={summaryData}
            readOnly
          ></textarea>
        </div>
        <div className="mx-auto flex space-x-5 my-5 justify-center">
          <Link to="/Charts">
            <button
              type="submit"
              onClick={() => setActiveLink("/Charts")}
              className="text-white bg-blue-600 hover:bg-blue-500 rounded-md w-48 flex items-center justify-center py-2 px-4"
            >
              <FaChartBar className="mr-2" /> Create Charts
            </button>
          </Link>

          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-500 rounded-md w-48 flex items-center justify-center py-2 px-4"
            onClick={fetchData}
          >
            <FaCalculator className="mr-2" /> Calculate Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExceptionRecords;

{
  /*         
        <div className="mt-5 p-5 flex justify-centeritems-center space-x-5 border border-gray-300 w-1/3  shadow-lg rounded-lg">
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

          {/* <div className="flex items-center">
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
        </div> */
}
