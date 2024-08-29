
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaChartBar,
  FaCalculator,
  FaSync,
  FaCheckSquare,
  FaPlay,
  FaRedo,
  FaClipboardCheck,
} from "react-icons/fa";
import DqNavbar from "../components/DqNavbar";

export default function ExecuteRules() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
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

  const fetchRules = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/executeRules');
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

  const handleCheckboxChange = (rowData) => {
    if (selectedRows.includes(rowData)) {
      // Deselect if already selected
      setSelectedRows(prevRows => prevRows.filter(row => row !== rowData));
    } else {
      // Add new row to the selection
      setSelectedRows(prevRows => [...prevRows, rowData]);
    }
    
    // Update form values with data from all selected rows
    setFormValues(prevFormValues => {
      const updatedFormValues = selectedRows.reduce((acc, row) => {
        return {
          ...acc,
          [row.exception_id]: {
            exception_id: row.exception_id || "",
            exception_name: row.exception_name || "",
            exception_logic_system: row.exception_logic_system || "",
            exception_owner: row.exception_owner || "",
            department: row.department || "",
            company: row.company || "",
            pipeline_stage: row.pipeline_stage || "",
            source_system_type: row.source_system_type || "",
            Severity: row.Severity || "",
            created_date: row.created_date || "",
            isactive: row.isactive ? "Yes" : "No",
            table_id: row.table_id || "",
            UniqueKey: row.UniqueKey || "",
            logic: row.logic || ""
          }
        };
      }, {});
      return { ...prevFormValues, ...updatedFormValues };
    });
  };

  const handleRun = () => {
    // Log the data that will be sent
    console.log('Data being sent:', selectedRows);
  
    // Send the POST request with axios
    axios.post('http://localhost:5000/api/execute_rule', selectedRows)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (

    <div>
      <DqNavbar />
      <div className="container mt-20 mx-auto p-6 border border-black rounded-lg">
        <h1 className="text-2xl mt-10 font-bold mb-2 p-5">
          Select rules to include in current DQ Test
        </h1>

        <div className="p-5">
          <div className="mx-2 max-h-[250px] max-w-full overflow-y-auto overflow-x-auto rounded-lg shadow-lg p-4 text-center">
            <table className="w-full border-collapse border border-black">
              <thead className="top-0 bg-white">
                <tr>
                  <th className="border border-black p-2 min-w-[50px]"></th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Exception ID</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Exception Name</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Logic System</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Owner</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Department</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Company</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Pipeline Stage</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Source System Type</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Severity</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Created Date</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Active</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Table ID</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Logic</th>
                  <th className="border border-black p-2 min-w-[200px] whitespace-normal whitespace-normal">Unique Key</th>
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

          <div className="button-class mt-10 mx-6 p-6 border border-black shadow-lg rounded-lg">
            <label htmlFor="indices" className="block mb-1">
              Enter indices (Comma-Separated)
            </label>
            <input
              type="text"
              id="indicesBox"
              name="IndicesBox"
              className="w-full px-2 py-1 border border-black rounded mb-2"
            />
            <div className="flex justify-center space-x-2 mt-4">
              <button
                type="button"
                className="button bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600"
              >
                <FaCheckSquare className="mr-2" /> Select checkboxes
              </button>
              <button
                type="button"
                onClick={handleRun}
                className="button bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600"
              >
                <FaPlay className="mr-2" /> Run
              </button>
              <button
                type="button"
                className="button bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600"
              >
                <FaSync className="mr-2" /> Refresh
              </button>
              <button
                type="button"
                className="button bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600"
              >
                <FaClipboardCheck className="mr-2" /> Select All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

