

import React from 'react';
import DqNavbar from '../components/DqNavbar';
import { Link } from 'react-router-dom';
import { FaDatabase, FaExclamationTriangle, FaPlay, FaFileAlt, FaChartBar } from 'react-icons/fa';

export default function DqHome() {
  return (
    <div className="bg-white min-h-screen">
    <DqNavbar />
    <div className="flex flex-wrap justify-center gap-6 p-6 pt-24">
      {/* First Row */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <FaDatabase className="text-3xl mx-auto mb-2" />
        <p className="text-center font-bold mb-2">
          Data Profiling provides insights into the structure, content, and quality of your data. It helps in identifying patterns, anomalies, and the overall state of your data, ensuring that it meets the required standards.
        </p>
        <Link to="/dataProfiling" className="block mt-4 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Data Profiling
        </Link>
      </div>
      <div className="w-full md:w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <FaExclamationTriangle className="text-3xl mx-auto mb-2" />
        <p className="text-center font-bold mb-2">
          Exception Rules allow you to define and manage rules that identify data exceptions. These rules help in maintaining data integrity by flagging or handling data that does not meet predefined criteria.
        </p>
        <Link to="/exceptionRules" className="block mt-4 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Exception Rules
        </Link>
      </div>
      <div className="w-full md:w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <FaPlay className="text-3xl mx-auto mb-2" />
        <p className="text-center font-bold mb-2">
          Execute Rules is a feature that lets you apply the defined rules to your data. It processes the data based on the rules to ensure compliance and identify any deviations or issues.
        </p>
        <Link to="/executeRules" className="block mt-4 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Execute Rules
        </Link>
      </div>
  
      {/* Second Row */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <FaFileAlt className="text-3xl mx-auto mb-2" />
        <p className="text-center font-bold mb-2">
          Exception Records provide a detailed view of data that has been flagged due to exceptions. This feature helps in analyzing and addressing data issues that do not conform to the established rules.
        </p>
        <Link to="/exceptionRecords" className="block mt-4 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Exception Records
        </Link>
      </div>
      <div className="w-full md:w-1/3 p-4 bg-gray-100 border border-gray-300 rounded-lg">
        <FaChartBar className="text-3xl mx-auto mb-2" />
        <p className="text-center font-bold mb-2">
          Charts offer a visual representation of your data. This feature enables you to create and view various types of charts to better understand data trends, distributions, and patterns.
        </p>
        <Link to="/charts" className="block mt-4 px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Charts
        </Link>
      </div>
    </div>
  </div>
  

  );
}


// import React from 'react';

// import DqNavbar from '../components/DqNavbar';
// import { Link } from 'react-router-dom';

// import styled from 'styled-components';
// //import { useNavigate } from 'react-router-dom';

// export default function DqHome() {

//   return (
//     <Container>
//       <DqNavbar />
//       <Content>
//         <ServiceItem>
//           <Description>
//           Data Profiling provides insights into the structure, content, and quality of your data. It helps in identifying patterns, anomalies, and the overall state of your data, ensuring that it meets the required standards.
//           </Description>
//           <Button to="/dataProfiling">Data Profiling</Button>
//         </ServiceItem>
//         <ServiceItem>
//           <Description>
//           Exception Rules allow you to define and manage rules that identify data exceptions. These rules help in maintaining data integrity by flagging or handling data that does not meet predefined criteria
//           </Description>
//           <Button to="/exceptionRules">Exception Rules</Button>
//         </ServiceItem>
//         <ServiceItem>
//           <Description>
//           Execute Rules is a feature that lets you apply the defined rules to your data. It processes the data based on the rules to ensure compliance and identify any deviations or issues.
//           </Description>
//           <Button to="/executeRules">Execute Rules</Button>
//         </ServiceItem>
//         <ServiceItem>
//           <Description>
//           Exception Records provide a detailed view of data that has been flagged due to exceptions. This feature helps in analyzing and addressing data issues that do not conform to the established rules
//           </Description>
//           <Button to="/exceptionRecords">Exception Records</Button>
//         </ServiceItem>
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