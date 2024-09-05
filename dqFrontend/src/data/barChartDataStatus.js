import axios from 'axios'
//import sampleStatus from './sampleStatusData';
const fetchBarChartDataForStaus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/records-vs-state', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        });
     
        const data = response.data;
    // const data=sampleStatus;
        // Sort the data so that 'Active' is always first and 'Not Active' second
        const sortedData = data.sort((a, b) => {
          if (a.status === 'Active') return -1;
          if (a.status === 'NotActive') return 1;
          return 0;
        });
     
        // Extract counts and labels after sorting
        const counts = sortedData.map(item => item.count);
        const Labels = sortedData.map(item => item.status);
     
        // Set the background colors based on status
        const backgroundColors = sortedData.map(item =>
          item.status === 'Active' ? 'rgba(40, 167, 69, 0.7)' : 'rgba(220, 53, 69, 0.7)' // bg-success for 'Active', bg-danger for 'Not Active'
        );
        const borderColors = sortedData.map(item =>
          item.status === 'Active' ? 'rgba(40, 167, 69, 1)' : 'rgba(220, 53, 69, 1)' // bg-success for 'Active', bg-danger for 'Not Active'
        );
        const hoverColors = sortedData.map(item =>
          item.status === 'Active' ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)' // bg-success for 'Active', bg-danger for 'Not Active'
        );
        const hoverborderColors = sortedData.map(item =>
          item.status === 'Active' ? 'rgba(40, 167, 69, 0.5)' : 'rgba(220, 53, 69, 0.5)' // bg-success for 'Active', bg-danger for 'Not Active'
        );
        const barChartStatusData = {
          labels: Labels,
          datasets: [
            {
              label: "Number of Records",
              data: counts,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
              hoverBackgroundColor: hoverColors,
              hoverBorderColor: hoverborderColors,
              barPercentage: 0.6,
              categoryPercentage: 0.8,
            },
          ],
        };
     
        return barChartStatusData;
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
        return {
          labels: [],
          datasets: [
            {
              label: "Number of Records",
              data: [],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(75, 192, 192, 0.7)",
              hoverBorderColor: "rgba(75, 192, 192, 1)",
              barPercentage: 0.6,
              categoryPercentage: 0.8,
            },
          ],
        };
      }
};

export default fetchBarChartDataForStaus;