// const pieChartData = {
//     labels: ['Department A', 'Department B', 'Department C'],
//     datasets: [
//       {
//         label: 'Number of Records vs. Department',
//         data: [10, 20, 30],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//         ],
//         borderWidth: 1,
//         hoverOffset: 10, // Optional: Increase offset on hover
//       },
//     ],
//   };
  
  // export default pieChartData;
  import axios from 'axios'
  const fetchPieChartData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records-vs-department', {
        // Axios handles CORS automatically if the server allows it
        headers: {
          'Content-Type': 'application/json',
        },
        // Optional CORS configuration; mostly handled server-side
        withCredentials: false, // Set to true if you need to send cookies
      }); // Replace with your actual API endpoint
      const data = response.data;
      const counts = data.map(item => item.count);
      const Labels= data.map(item => item.department)
      // Assuming the API returns an object with 'labels' and 'values' arrays
      const pieChartData = {
        labels: Labels, // e.g., ["Department A", "Department B", "Department C"]
        datasets: [
          {
            label: "Number of Records by Department",
            data: counts, // e.g., [10, 20, 30]
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
  
      return pieChartData;
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      return {
        labels: [],
        datasets: [
          {
            label: "Number of Records by Department",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    }
  };
  
  export default fetchPieChartData;