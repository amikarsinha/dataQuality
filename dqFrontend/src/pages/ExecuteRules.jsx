import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPlay } from "react-icons/fa";
import DqNavbar from "../components/DqNavbar";
// import sampleRules from "../data/sampleRules";

export default function ExecuteRules() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row
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
      // const rules = sampleRules;
      // setData(rules);
    } catch (error) {
      console.error("Error fetching rules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleRadioChange = (rowData) => {
    setSelectedRow(rowData);

    // Update form values with the selected row
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
      isactive: rowData.isactive ? "Yes" : "No",
      table_id: rowData.table_id || "",
      UniqueKey: rowData.UniqueKey || "",
      logic: rowData.logic || "",
    });
  };

  function showAlert(message) {
    Swal.fire({
      title: "Custom Alert!",
      text: message,
      icon: "info",
      confirmButtonText: "OK",
    });
  }

  const handleRun = () => {
    if (!selectedRow) {
      showAlert("Please select a row before running.");
      return;
    }
    // Log the data that will be sent
    console.log("Data being sent:", selectedRow);

    // Send the POST request with axios
    axios
      .post("http://localhost:5000/api/execute_rule", selectedRow)
      .then((response) => {
        console.log("Success:", response.data);
        showAlert(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <DqNavbar />
      <div className="mt-28 mx-3 p-3 border border-gray rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-2 p-5">
          Select rules to include in current DQ Test
        </h1>

        <div className="p-5">
          <div className="mx-2 max-h-[265px] max-w-full overflow-y-auto overflow-x-auto rounded-lg shadow-lg text-center">
            <table className="w-full border-collapse border border-gray">
              <thead className="bg-blue-600 sticky text-white top-0 z-20">
                <tr>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[50px]"></th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Exception ID
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Exception Name
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Logic System
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Owner
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Department
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Company
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Pipeline Stage
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Source System Type
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Severity
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Created Date
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Active
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Table ID
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Logic
                  </th>
                  <th className="border border-gray hover:bg-blue-500 p-2 min-w-[200px] whitespace-normal">
                    Unique Key
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray p-2 min-w-[50px]">
                      <input
                        type="radio"
                        name="ruleSelection"
                        checked={selectedRow === item}
                        onChange={() => handleRadioChange(item)}
                      />
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.exception_id}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.exception_name}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.exception_logic_system}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.exception_owner}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.department}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.company}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.pipeline_stage}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.source_system_type}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.Severity}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.created_date}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.isactive == 1 ? "true" : "false"}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.table_id}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.logic}
                    </td>
                    <td className="border border-gray p-2 min-w-[200px] whitespace-normal">
                      {item.UniqueKey}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center space-x-2 mt-4">
            <button
              type="button"
              onClick={handleRun}
              className="button bg-blue-500 text-white py-3 px-6 rounded flex items-center hover:bg-blue-600"
            >
              <FaPlay className="mr-2" /> Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
