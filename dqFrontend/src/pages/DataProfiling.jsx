import React, { useState } from 'react';
import DqNavbar from '../components/DqNavbar';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
export default function DataProfiling() {
    // const navigate = useNavigate();
    const [text, setText] = useState('');
    const [tableData, setTableData] = useState([]);
 
    const handleChange = (event) => {
        setText(event.target.value);
    };
 
    const handleClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/dataProfiling`, {
                params: {
                    table_name: text
                }
            });
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
 
    return (
        <Container>
            <DqNavbar />
            <div className='hero'>
                <div className='content'>
                    <div className='search-container'>
                        <input
                            type='text'
                            value={text}
                            onChange={handleChange}
                            className='search-box'
                            placeholder='Search...'
                        />
                        <button onClick={handleClick} className='search-button'>Search</button>
                    </div>
                </div>
            </div>
            {tableData.length > 0 && (
                <TableContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Column Name</th>
                                <th>Data Type</th>
                                <th>Distinct Value Count</th>
                                <th>Null Value Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index}> {/* Using sno as the key */}
                                    <td>{item.sno}</td>
                                    <td>{item.column_name}</td>
                                    <td>{item.data_type}</td>
                                    <td>{item.distinct_values}</td>
                                    <td>{item.null_values}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TableContainer>
            )}
        </Container>
    );
}
 
const Container = styled.div`
  background-color: white;
  // color: white;
  min-height: 100vh;
 
 
  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .content {
      position: relative;
      z-index: 2;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .search-container {
      position: fixed;
      top: 125px; /* Position below the navbar */
      left: 0;
      right: 0;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      //background: rgba(186, 17, 17, 0.48);;/* Semi-transparent background */
      padding: 10px;
      .search-box {
        padding: 10px;
        font-size: 18px;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: 300px;
      }
      .search-button {
        padding: 10px;
        margin-left: 10px;
        font-size: 18px;
        border: none;
        border-radius: 4px;
        background-color: rgba(17, 86, 204, 0.85);
        color:white;
        cursor: pointer;
        &:hover {
          background-color: #rgba(17, 86, 204, 0.85);
        }
      }
    }
  }
`;
 
const TableContainer = styled.div`
  margin-top: 225px; /* Adjust this value to be the height of the search bar plus some margin */
  background: white; /* Semi-transparent background */
  max-height: 400px; /* Fixed height for scrolling */
  overflow-y: auto; /* Enables vertical scrolling */
  border-radius: 10px; /* Optional: for rounded corners */
  box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Optional: for a shadow effect */
 
 
  table {
    width: 100%;
    border-collapse: collapse;
    th, td {
      border: 4px solid #ddd;
      padding: 8px;
      text-align: left;
      color: black;
    }
    th {
       background-color: white; /* Add a background color to the header */
       position: sticky;
       top: 0; /* Keeps the header at the top of the container */
       z-index: 10; /* Ensure it is above the other content */
       padding: 16px; /* Increase the padding for a larger header */
       font-size: 18px; /* Increase the font size for the header */
    }
      thead {
     // display: table-header-group; /* Ensure the header remains at the top */
    }
  }
`;