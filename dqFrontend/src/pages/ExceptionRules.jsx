import React, { useState, useEffect } from "react";
import DqNavbar from "../components/DqNavbar";
import axios from "axios";
import { FaCheckSquare, FaPlus, FaSync, FaRedo, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
export default function ExceptionRules() {

  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/rules');
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

  const handleGetAllRules = async () => {
    await fetchRules();
  };

  const [formValues, setFormValues] = useState({
    exception_id: "",
    exception_name: "",
    exception_logic_system: "",
    exception_owner: "",
    department: "",
    company: "",
    pipeline_stage: "",
    source_system_type: "",
    Severity: "",
    created_date: "",
    isactive: "",
    table_id: "",
    logic: "",
    UniqueKey: "",
  });


  useEffect(() => {
    // 2. Fetch data from the backend using Axios
    axios.get("http://localhost:5000/api/rules")
      .then(response => {
        setData(response.data); // 3. Set the fetched data to the state
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);




  const handleCheckboxChange = (rowData) => {
    if (selectedRows.includes(rowData)) {
      // Deselect if already selected
      setSelectedRows(prevRows => prevRows.filter(row => row !== rowData));
    } else {
      // Replace selection with new row if less than 2 are selected
      if (selectedRows.length < 2) {
        setSelectedRows(prevRows => [...prevRows, rowData]);
      } else {
        // Deselect the oldest selected row and add new one
        setSelectedRows([rowData]);
      }
    }

    setFormValues({
      exception_id: rowData.exception_id || "",
      exception_name: rowData.exception_name || "",
      exception_logic_system: rowData.exception_logic_system || "",
      exception_owner: rowData.exception_owner || "",
      department: rowData.department || "",
      company: rowData.company || "",
      pipeline_stage: rowData.pipeline_stage || "",
      source_system_type: rowData.source_system_type || "",
      Severity: rowData.Severity || "",
      created_date: rowData.created_date || "",
      isactive: rowData.isactive ? "Yes" : "No" || "",
      table_id: rowData.table_id || "",
      UniqueKey: rowData.UniqueKey || "",
      logic: rowData.logic || ""
    });
  };

  function showAlert(message) {
    Swal.fire({
      title: 'Custom Alert!',
      text: message,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };
  const formatDate = (date) => {
    const d = new Date(date);

    // Get components of the date
    const day = d.toLocaleString('en-US', { weekday: 'short' }); // e.g., "Sat"
    const dateNum = d.toLocaleString('en-US', { day: '2-digit' }); // e.g., "10"
    const month = d.toLocaleString('en-US', { month: 'short' }); // e.g., "Aug"
    const year = d.getFullYear(); // e.g., "2024"
    const hours = d.toLocaleString('en-US', { hour: '2-digit', hour12: false }); // e.g., "00"
    const minutes = d.toLocaleString('en-US', { minute: '2-digit' }); // e.g., "00"
    const seconds = d.toLocaleString('en-US', { second: '2-digit' }); // e.g., "00"

    // Format date string as required
    const formattedDate = `${day}, ${dateNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;

    return formattedDate;
  };


  const handleAddRule = async () => {
    // Prepare the data to send with correct types
    const dataToSend = {
      ...formValues,
      exception_id: parseInt(formValues.exception_id, 10), // Convert to integer
      created_date: formatDate(formValues.created_date), // Convert to required date format
      table_id: parseInt(formValues.table_id, 10), // Convert to integer
      logic: formValues.logic, // Keep as text (string)
      isactive: parseInt(formValues.isactive, 10) // Convert to integer
    };

    console.log('Data being sent:', dataToSend); // Log the data to verify

    try {
      const response = await axios.post('http://localhost:5000/api/rules', dataToSend);
      console.log('Rule added:', response.data);
      showAlert(response.data.message)
    } catch (error) {
      console.error('Error adding rule:', error);
    }
  };

  const handleUpdateRule = async () => {
    let status = formValues.isactive;
    let isActive;

    const trueValues = ["True", "true", "Yes", "yes"];

    isActive = trueValues.includes(status) ? 1 : 0;
    const dataToSend = {
      ...formValues,
      exception_id: parseInt(formValues.exception_id, 10), // Convert to integer
      created_date: formatDate(formValues.created_date), // Convert to required date format
      table_id: parseInt(formValues.table_id, 10), // Convert to integer
      logic: formValues.logic, // Keep as text (string)
      isactive: isActive // Convert to integer
    };

    console.log('Data being sent:', dataToSend); // Log the data to verify

    try {

      const response = await axios.put(`http://localhost:5000/api/rules/${formValues.exception_id}`, dataToSend);
      console.log('Rule updated:', response.data);
      // alert(response.data.message);
      // Swal.fire({
      //   title: 'Custom Alert!',
      //   text: response.data.message,
      //   icon: 'info',
      //   confirmButtonText: 'OK'
      // });
      showAlert(response.data.message)
    } catch (error) {
      console.error('Error updating rule:', error);
    }
  };

  const handleDeleteRule = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/rules/${formValues.exception_id}`);
      console.log('Rule deleted:', response.data);
      showAlert(response.data.message)
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  // const handleGetAllRules = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/rules');
  //     console.log('All rules:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching rules:', error);
  //   }
  // };




  return (
    <div className="bg-white text-black min-h-screen">
      <DqNavbar />
      <div className="mx-6 mt-[150px] max-h-[265px] overflow-y-auto rounded-lg shadow-lg text-center overflow-x-auto whitespace-nowrap">
        <table className="w-full border-collapse border border-gray">
          <thead className="bg-blue-600 text-white sticky top-0 z-20 ">
            <tr>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[50px]"></th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Exception ID</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Exception Name</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Logic System</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Owner</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Department</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Company</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Pipeline Stage</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Source System Type</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Severity</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Created Date</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Active</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Table ID</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Logic</th>
              <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal whitespace-normal">Unique Key</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-black p-2 min-w-[50px]">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(item)}
                  />
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.exception_id}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.exception_name}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.exception_logic_system}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.exception_owner}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.department}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.company}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.pipeline_stage}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.source_system_type}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.Severity}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.created_date}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.isactive == 1 ? "true" : "false"}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.table_id}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.logic}
                </td>
                <td className="border border-black p-2 min-w-[200px] whitespace-normal">
                  {item.UniqueKey}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <form className="w-[80%] mt-10 mx-auto border border-black shadow-lg rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full  bg-white ">
            <tbody>
              <tr className="flex flex-wrap  justify-between">
                <td className="w-[65%]">
                  <table className="min-w-full">
                    <tbody>
                      <tr className="flex mb-4">
                        <td className="w-[20%] p-2">
                          <label className="block mb-1 font-bold">Exception ID:</label>
                          <input
                            type="text"
                            name="exception_id"
                            value={formValues.exception_id}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[54%] p-2">
                          <label className="block mb-1 font-bold">Exception Name:</label>
                          <input
                            type="text"
                            name="exception_name"
                            value={formValues.exception_name}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                      </tr>
                      <tr className="flex mb-4">
                        <td className="w-[20%] p-2">
                          <label className="block mb-1 font-bold">Logic System:</label>
                          <input
                            type="text"
                            name="exception_logic_system"
                            value={formValues.exception_logic_system}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[20%] p-2">
                          <label className="block mb-1 font-bold">Owner:</label>
                          <input
                            type="text"
                            name="exception_owner"
                            value={formValues.exception_owner}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[16%] p-2">
                          <label className="block mb-1 font-bold">Department:</label>
                          <input
                            type="text"
                            name="department"
                            value={formValues.department}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                      </tr>
                      <tr className="flex mb-4">
                        <td className="w-[20%] p-2">
                          <label className="block mb-1 font-bold">Company:</label>
                          <input
                            type="text"
                            name="company"
                            value={formValues.company}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[20%] p-2">
                          <label className="block mb-1 font-bold">Pipeline Stage:</label>
                          <input
                            type="text"
                            name="pipeline_stage"
                            value={formValues.pipeline_stage}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[30%] p-2">
                          <label className="block mb-1 font-bold">Source System Type:</label>
                          <input
                            type="text"
                            name="source_system_type"
                            value={formValues.source_system_type}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                      </tr>
                      <tr className="flex mb-4">
                        <td className="w-[20%] p-2">
                          <label className="block mb-1 font-bold">Severity:</label>
                          <input
                            type="text"
                            name="Severity"
                            value={formValues.Severity}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[50%] p-2">
                          <label className="block mb-1 font-bold">Created Date:</label>
                          <input
                            type="text"
                            name="created_date"
                            value={formValues.created_date}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[16%] p-2">
                          <label className="block mb-1 font-bold">Active:</label>
                          <input
                            type="text"
                            name="isactive"
                            value={formValues.isactive}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                      </tr>
                      <tr className="flex mb-4">
                        <td className="w-[34%] p-2">
                          <label className="block mb-1 font-bold">Table Name:</label>
                          <input
                            type="text"
                            name="table_id"
                            value={formValues.table_id}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                        <td className="w-[34%] p-2">
                          <label className="block mb-1 font-bold">Unique Key:</label>
                          <input
                            type="text"
                            name="UniqueKey"
                            value={formValues.UniqueKey}
                            onChange={handleInputChange}
                            className="w-full border border-black p-2 rounded-lg"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="w-[35%] p-2">
                  <label className="block mb-1 font-bold">Logic:</label>
                  <textarea
                    name="logic"
                    value={formValues.logic}
                    onChange={handleInputChange}
                    className="w-full h-[200px] border border-black p-2 rounded-lg"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-around mt-6">
          <button
            type="button"
            onClick={handleAddRule}
            className="w-[22%] bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Add New Rule
          </button>
          <button
            type="button"
            onClick={handleUpdateRule}
            className="w-[22%] bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <FaRedo className="mr-2" /> Update Rule
          </button>
          <button
            type="button"
            onClick={handleDeleteRule}
            className="w-[22%] bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <FaTrash className="mr-2" /> Delete Rule
          </button>
          <button
            type="button"
            onClick={handleGetAllRules}
            className="w-[22%] bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <FaRedo className="mr-2" /> Update Exception Rules
          </button>
        </div>
      </form>
    </div>
  );
}
