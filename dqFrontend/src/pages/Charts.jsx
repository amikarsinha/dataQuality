
import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import fetchBarChartData from "../data/barChartData";
import fetchBarChartDataForStatus from "../data/barChartDataStatus";
import fetchHorizontalBarChartData from "../data/horizontalBarChartData";
import fetchLineChartData from "../data/lineChartData";
import fetchPieChartData from "../data/pieChartData";
import DqNavbar from '../components/DqNavbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
Chart.register(...registerables);

const Charts = () => {
  const barRef = useRef(null);
  const horizontalBarRef = useRef(null);
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  const barRefStatus = useRef(null);
  const [barChartInstance, setBarChartInstance] = useState(null);
  const [horizontalBarChartInstance, setHorizontalBarChartInstance] = useState(null);
  const [pieChatInstance, setPieCharInstance] = useState(null);
  const [barCharStatusInstance, setBarChartStatusInstance] = useState(null);
  const [lineChartInstance, setLineChartInstance] = useState(null);
  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      try {
        // Fetch data using the async function
        const barChartData = await fetchBarChartData();

        console.log(barChartData)
        // If there's an existing chart instance, destroy it before creating a new one
        if (barChartInstance) {
          barChartInstance.destroy();
          setBarChartInstance(null); // Set to null after destroying
        }

        // Create a new chart instance
        const newChartInstance = new Chart(barRef.current, {
          type: "bar",
          data: barChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setBarChartInstance(newChartInstance);
      } catch (error) {
        console.error("Error rendering the chart:", error);
      }
    };

    const fetchDataAndRenderHorizontalChart = async () => {
      try {
        // Fetch data using the async function
        const horizontalBarChartData = await fetchHorizontalBarChartData();

        console.log(horizontalBarChartData)
        // If there's an existing chart instance, destroy it before creating a new one
        if (horizontalBarChartInstance) {
          horizontalBarChartInstance.destroy();
          setHorizontalBarChartInstance(null); // Set to null after destroying
        }

        // Create a new chart instance
        const newChartInstance = new Chart(horizontalBarRef.current, {
          type: "bar",
          data: horizontalBarChartData,
          options: {
            responsive: true,
            indexAxis: "y",
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setHorizontalBarChartInstance(newChartInstance);
      } catch (error) {
        console.error("Error rendering the chart:", error);
      }
    };

    // const lineChart = new Chart(lineRef.current, {
    //   type: "line",
    //   data: lineChartData,
    //   options: { responsive: true, aspectRatio: 1, maintainAspectRatio: false },
    // });
    

    const fetchDataAndRenderPieChart = async () => {
      try {
        // Fetch data using the async function
        const pieChartData = await fetchPieChartData();

        console.log(pieChartData)
        // If there's an existing chart instance, destroy it before creating a new one
        if (pieChatInstance) {
          pieChatInstance.destroy();
          setPieCharInstance(null); // Set to null after destroying
        }

        // Create a new chart instance
        const newChartInstance = new Chart(pieRef.current, {
          type: "pie",
          data: pieChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setPieCharInstance(newChartInstance);
      } catch (error) {
        console.error("Error rendering the chart:", error);
      }
    };
    
    
    const fetchDataAndRenderStausChart = async () => {
      try {
        // Fetch data using the async function
        const barChartStatusData = await fetchBarChartDataForStatus();

        console.log(barChartStatusData)
        // If there's an existing chart instance, destroy it before creating a new one
        if (barCharStatusInstance) {
          barCharStatusInstance.destroy();
          setBarChartStatusInstance(null); // Set to null after destroying
        }

        // Create a new chart instance
        const newChartInstance = new Chart(barRefStatus.current, {
          type: "bar",
          data: barChartStatusData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setBarChartStatusInstance(newChartInstance);
      } catch (error) {
        console.error("Error rendering the chart:", error);
      }
    };

    const fetchDataRenderLineChart = async () => {
      try {
        // Fetch data using the async function
        const lineChartData = await fetchLineChartData();

        console.log(lineChartData)
        // If there's an existing chart instance, destroy it before creating a new one
        if (lineChartInstance) {
          lineChartInstance.destroy();
          setLineChartInstance(null); // Set to null after destroying
        }

        // Create a new chart instance
        const newChartInstance = new Chart(lineRef.current, {
          type: "line",
          data: lineChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setLineChartInstance(newChartInstance);
      } catch (error) {
        console.error("Error rendering the chart:", error);
      }
    };
    fetchDataAndRenderChart();
    fetchDataAndRenderHorizontalChart();
    fetchDataAndRenderPieChart();
    fetchDataAndRenderStausChart();
    fetchDataRenderLineChart();
    return () => {
      if (barChartInstance) {
        barChartInstance.destroy();
        setBarChartInstance(null); // Ensure to reset the instance after destruction
      }
      if (horizontalBarChartInstance) {
        horizontalBarChartInstance.destroy();
        setHorizontalBarChartInstance(null); // Ensure to reset the instance after destruction
      }
      // horizontalBarChart.destroy();
      // lineChart.destroy();
      if (barCharStatusInstance) {
        barCharStatusInstance.destroy();
        setBarChartStatusInstance(null); // Set to null after destroying
      }

      if (pieChatInstance) {
        pieChatInstance.destroy();
        setPieCharInstance(null); // Set to null after destroying
      }
      // pieChart.destroy();
      if(lineChartInstance){
        lineChartInstance.destroy();
        setLineChartInstance(null);
      }
    };
  }, []);

  return (
    <div>
      <DqNavbar />
      <div className="flex flex-wrap justify-around p-8 m-8 mt-10">
  {/* First Row */}
  <div className="w-full md:w-1/3 p-2">
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <FaChartBar className="mr-2" /> Exceptions by ID Chart
    </h3>
    <div className="border border-gray-300 rounded-lg shadow-md p-4">
      <canvas ref={barRef} style={{ height: '200px' }} />
    </div>
  </div>
  
  <div className="w-full md:w-1/3 p-2">
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <FaChartBar className="mr-2" /> Status Chart
    </h3>
    <div className="border border-gray-300 rounded-lg shadow-md p-4">
      <canvas ref={barRefStatus} style={{ height: '200px' }} />
    </div>
  </div>

  <div className="w-full md:w-1/3 p-2">
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <FaChartPie className="mr-2" /> Department Chart
    </h3>
    <div className="border border-gray-300 rounded-lg shadow-md p-4">
      <canvas ref={pieRef} style={{ height: '200px' }} />
    </div>
  </div>

  {/* Second Row */}
  
  <div className="w-full md:w-1/2 p-2">
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <FaChartLine className="mr-2" /> Active Records Over Time
    </h3>
    <div className="border border-gray-300 rounded-lg shadow-md p-4">
      <canvas ref={lineRef} style={{ height: '200px' }} />
    </div>
  </div>

  <div className="w-full md:w-1/2 p-2">
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      <FaChartBar className="mr-2" /> Severity Chart
    </h3>
    <div className="border border-gray-300 rounded-lg shadow-md p-4">
      <canvas ref={horizontalBarRef} style={{ height: '200px' }} />
    </div>
  </div>

</div>

    </div>
  );
};

export default Charts;

// import React from 'react';

// import DqNavbar from '../components/DqNavbar';
// import { Link } from 'react-router-dom';

// import styled from 'styled-components';
// //import { useNavigate } from 'react-router-dom';

// export default function Charts() {

//   return (
//     <Container>
//       <DqNavbar />
//       <Content>
//         <ServiceItem>
//           <Description>
//           Charts offer a visual representation of your data. This feature enables you to create and view various types of charts to better understand data trends, distributions, and patterns.
//           </Description>
//           <Button to="/charts">Charts</Button>
//         </ServiceItem>
//       </Content>
//     </Container>
//   );
// }
// const Container = styled.div`
//   background-color: white;
//   min-height: 100vh;

// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column; /* Ensure children stack vertically */
//   align-items: center;
//   padding: 20px;
//   gap: 20px; /* Spacing between service items */
//   padding-top:150px;
// `;

// const ServiceItem = styled.div`
//   display: flex;
//   flex-direction: column; /* Arrange description and button vertically */
//   align-items: center; /* Center content horizontally */
//   width: 85%;
//   max-width: 100vw;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const Description = styled.p`
//   color: #000; /* Set text color to black */
//   margin: 0;
//   padding-bottom: 10px; /* Space between description and button */
//   text-align: center; /* Center text within the description */
//   font-size: 18px;;
//   font-family: "Arial", serif;
//   font-style: normal;
//   font-weight:bold;
//   color: black;
// `;

// const Button = styled(Link)`
//   display: inline-block;
//   margin-top:10px;
//   padding: 10px 20px;
//   font-size: 18px;;
//   font-family: "Arial", serif;
//   font-style: normal;
//   font-weight:bold;
//   color: white;
//   background-color: rgba(17, 86, 204, 0.85); /* Button color */
//   text-align: center;
//   text-decoration: none;
//   border-radius: 6px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow effect */
//   cursor: pointer;
//   &:hover {
//     background-color: #0056b3; /* Darker shade for hover effect */
//   }
// `;