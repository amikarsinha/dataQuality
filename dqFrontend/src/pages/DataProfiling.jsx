import React, { useState, useEffect } from "react";
import DqNavbar from "../components/DqNavbar";
import axios from "axios";
// import sampleFiles from "../data/sampleFiles";
// import sampleDataProfile from "../data/sampleDataProfile";
const DataProfiling = () => {
  const [files, setFiles] = useState([]); // State to hold the list of files (dropdown options)
  const [selectedFile, setSelectedFile] = useState(""); // State for the selected file
  const [tableData, setTableData] = useState([]); // State to hold the file data for the table
 
  // Fetch the list of files from the blob storage when the component mounts
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/listFiles");
        // const response=sampleFiles;
        const fileNames = response.data.files.map(file => file.fileName); // Extract file names
        setFiles(fileNames); // Set only file names in the state
        // const fileNames = sampleFiles.files.map(file => file.fileName);
        // setFiles(fileNames);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
  
    fetchFiles();
  }, []);
  
 
  // Handle dropdown change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };
 
  // Handle search button click to fetch data from the selected file
  const handleClick = async () => {
    try {
const response = await axios.get(`http://localhost:5000/api/dataProfiling`, {
        params: {
          query: selectedFile, // Pass the selected file name as the query parameter
        },
      });
      setTableData(response.data); // Assuming the data is returned in the format provided
// const sampleProfile=sampleDataProfile;
// setTableData(sampleProfile)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  return (
    <div className="bg-white min-h-screen">
      <DqNavbar />
      <div className="flex flex-col items-center justify-center">
        <div className="fixed top-32 left-0 right-0 z-10 flex items-center justify-center p-4">
          {/* Dropdown Input */}
          <select
            value={selectedFile}
            onChange={handleFileChange}
            className="px-4 py-2 text-lg border border-gray-300 rounded-md w-72"
          >
            <option value="">Select a file</option>
            {files.map((file, index) => (
              <option key={index} value={file}>
                {file}
              </option>
            ))}
          </select>
          {/* Search Button */}
          <button
            onClick={handleClick}
            className="px-4 py-2 ml-4 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700"
            disabled={!selectedFile} // Disable button if no file is selected
          >
            Search
          </button>
        </div>
      </div>
 
      {/* Display File Data in a Scrollable Table */}
      {tableData.length > 0 && (
        <div className="mt-56 max-h-[400px] overflow-y-auto rounded-lg shadow-lg max-w-6xl mx-auto">
        <table className="w-full border-collapse border border-gray">
          <thead className="bg-blue-600 text-white sticky top-0 z-20 ">
            <tr>
              <th className="px-4 py-3 text-left border border-gray hover:bg-blue-500 p-2 text-lg">ID</th>
              <th className="px-4 py-3 text-left border border-gray hover:bg-blue-500 p-2 text-lg">Column Name</th>
              <th className="px-4 py-3 text-left border border-gray hover:bg-blue-500 p-2 text-lg">Data Type</th>
              <th className="px-4 py-3 text-left border border-gray hover:bg-blue-500 p-2 text-lg">Distinct Value Count</th>
              <th className="px-4 py-3 text-left border border-gray hover:bg-blue-500 p-2 text-lg">Null Value Count</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-200">{row.sno}</td>
                <td className="px-4 py-2 border border-gray-200">{row.column_name}</td>
                <td className="px-4 py-2 border border-gray-200">{row.data_type}</td>
                <td className="px-4 py-2 border border-gray-200">{row.distinct_values}</td>
                <td className="px-4 py-2 border border-gray-200">{row.null_values}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      )}
    </div>
  );
};
 
export default DataProfiling;