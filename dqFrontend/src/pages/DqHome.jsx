import React from 'react';

import DqNavbar from '../components/DqNavbar';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
//import { useNavigate } from 'react-router-dom';

export default function DqHome() {

  return (
    <Container>
      <DqNavbar />
      <Content>
        <ServiceItem>
          <Description>
          Data Profiling provides insights into the structure, content, and quality of your data. It helps in identifying patterns, anomalies, and the overall state of your data, ensuring that it meets the required standards.
          </Description>
          <Button to="/dataProfiling">Data Profiling</Button>
        </ServiceItem>
        <ServiceItem>
          <Description>
          Exception Rules allow you to define and manage rules that identify data exceptions. These rules help in maintaining data integrity by flagging or handling data that does not meet predefined criteria
          </Description>
          <Button to="/exceptionRules">Exception Rules</Button>
        </ServiceItem>
        <ServiceItem>
          <Description>
          Execute Rules is a feature that lets you apply the defined rules to your data. It processes the data based on the rules to ensure compliance and identify any deviations or issues.
          </Description>
          <Button to="/executeRules">Execute Rules</Button>
        </ServiceItem>
        <ServiceItem>
          <Description>
          Exception Records provide a detailed view of data that has been flagged due to exceptions. This feature helps in analyzing and addressing data issues that do not conform to the established rules
          </Description>
          <Button to="/exceptionRecords">Exception Records</Button>
        </ServiceItem>
        <ServiceItem>
          <Description>
          Charts offer a visual representation of your data. This feature enables you to create and view various types of charts to better understand data trends, distributions, and patterns.
          </Description>
          <Button to="/charts">Charts</Button>
        </ServiceItem>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  background-color: white;
  min-height: 100vh;

`;

const Content = styled.div`
  display: flex;
  flex-direction: column; /* Ensure children stack vertically */
  align-items: center;
  padding: 20px;
  gap: 20px; /* Spacing between service items */
  padding-top:150px;
`;

const ServiceItem = styled.div`
  display: flex;
  flex-direction: column; /* Arrange description and button vertically */
  align-items: center; /* Center content horizontally */
  width: 85%;
  max-width: 100vw;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Description = styled.p`
  color: #000; /* Set text color to black */
  margin: 0;
  padding-bottom: 10px; /* Space between description and button */
  text-align: center; /* Center text within the description */
  font-size: 18px;;
  font-family: "Arial", serif;
  font-style: normal;
  font-weight:bold;
  color: black;
`;

const Button = styled(Link)`
  display: inline-block;
  margin-top:10px;
  padding: 10px 20px;
  font-size: 18px;;
  font-family: "Arial", serif;
  font-style: normal;
  font-weight:bold;
  color: white;
  background-color: rgba(17, 86, 204, 0.85); /* Button color */
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow effect */
  cursor: pointer;
  &:hover {
    background-color: #0056b3; /* Darker shade for hover effect */
  }
`;