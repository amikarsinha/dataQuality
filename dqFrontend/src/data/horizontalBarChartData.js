import axios from 'axios'
  const fetchHorizontalBarChartData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/records-vs-severity', {
        // Axios handles CORS automatically if the server allows it
        headers: {
          'Content-Type': 'application/json',
        },
        // Optional CORS configuration; mostly handled server-side
        withCredentials: false, // Set to true if you need to send cookies
      }); // Replace with your actual API endpoint
      const data = response.data;
      const counts = data.map(item => item.count);
      const Labels= data.map(item => item.severity)
      //console.log(data)
      console.log("horizontal:", counts)
      // Assuming the API returns an object with 'labels' and 'values' arrays
      const horizontalBarChartData = {
        labels: Labels, // e.g., ["Low", "Medium", "High"]
        datasets: [
          {
            label: "Number of Records by Severity",
            data: counts,//data.values, // e.g., [5, 10, 15]
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(153, 102, 255, 0.7)", // Optional: Change color on hover
            hoverBorderColor: "rgba(153, 102, 255, 1)", // Optional: Change border color on hover
            barPercentage: 0.6, // Optional: Adjust bar width
            categoryPercentage: 0.8, // Optional: Adjust category width
          },
        ],
      };
  
      return horizontalBarChartData;
    } catch (error) {
      console.error("Error fetching horizontal bar chart data:", error);
      return {
        labels: [],
        datasets: [
          {
            label: "Number of Records by Severity",
            data: [],
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(153, 102, 255, 0.7)",
            hoverBorderColor: "rgba(153, 102, 255, 1)",
            barPercentage: 0.6,
            categoryPercentage: 0.8,
          },
        ],
      };
    }
  };
  
  export default fetchHorizontalBarChartData;


// const fetchBarChartData = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/api/records-vs-id', {
//       // Axios handles CORS automatically if the server allows it
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Optional CORS configuration; mostly handled server-side
//       withCredentials: false, // Set to true if you need to send cookies
//     }); // Replace with your actual API endpoint
//     const data = response.data;
//     const counts = data.map(item => item.count);
//     //console.log(data)
//     console.log("Hello")
//     //console.log(counts)
//     // Assuming the API returns an object with 'labels' and 'values' arrays
//     const barChartData = {
//       labels: ["Exception 1"],
//       //labels: data.labels, // e.g., ["Exception 1", "Exception 2", "Exception 3"]
//       datasets: [
//         {
//           label: "Number of Records",
//           data: counts, // e.g., [12, 19, 3]
//           backgroundColor: "rgba(75, 192, 192, 0.5)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//           hoverBackgroundColor: "rgba(75, 192, 192, 0.7)",
//           hoverBorderColor: "rgba(75, 192, 192, 1)",
//           barPercentage: 0.6,
//           categoryPercentage: 0.8,
//         },
//       ],
//     };

//     return barChartData;
//   } catch (error) {
//     console.error("Error fetching bar chart data:", error);
//     return {
//       labels: [],
//       datasets: [
//         {
//           label: "Number of Records",
//           data: [],
//           backgroundColor: "rgba(75, 192, 192, 0.5)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//           hoverBackgroundColor: "rgba(75, 192, 192, 0.7)",
//           hoverBorderColor: "rgba(75, 192, 192, 1)",
//           barPercentage: 0.6,
//           categoryPercentage: 0.8,
//         },
//       ],
//     };
//   }
//};

// export default fetchBarChartData;
// const barChartData = {
//     labels: ["Exception 1", "Exception 2", "Exception 3"],
//     datasets: [
//       {
//         label: "Number of Records",
//         data: [12, 19, 3],
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//         hoverBackgroundColor: "rgba(75, 192, 192, 0.7)", // Optional: Change color on hover
//         hoverBorderColor: "rgba(75, 192, 192, 1)", // Optional: Change border color on hover
//         barPercentage: 0.6, // Optional: Adjust bar width
//         categoryPercentage: 0.8 // Optional: Adjust category width
//       },
//     ],
//   };
  
//   export default barChartData;

 