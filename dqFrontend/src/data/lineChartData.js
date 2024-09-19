// const lineChartData = {
//     labels: ['January', 'February', 'March'],
//     datasets: [
//       {
//         label: 'Active Records Over Time',
//         data: [3, 2, 1],
//         backgroundColor: 'rgba(255, 159, 64, 0.5)',
//         borderColor: 'rgba(255, 159, 64, 1)',
//         borderWidth: 2,
//         fill: true,
//         pointBackgroundColor: 'rgba(255, 159, 64, 1)', // Color of the points
//         pointBorderColor: '#fff', // Color of the point border
//         pointBorderWidth: 2, // Width of the point border
//         pointRadius: 5, // Size of the points
//         tension: 0.4, // Smoothness of the line
//       },
//     ],
//   };
  
//   export default lineChartData;


  const fetchLineChartData = async () => {
    try {
      const response = await fetch("http://localhost:5000/count-rows-day"); // Replace with your actual API endpoint
      const data = await response.json();
  
      // Assuming the API returns an object with 'labels' and 'values' arrays
      console.log("pie: ",data)
      const labels = data.map(item => item.date);
      const counts = data.map(item => item.count);
      const lineChartData = {
        labels: labels, // e.g., ["January", "February", "March"]
        datasets: [
          {
            label: "Active Records Over Time",
            data: counts, // e.g., [3, 2, 1]
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 2,
            fill: true,
            pointBackgroundColor: "rgba(255, 159, 64, 1)", // Color of the points
            pointBorderColor: "#fff", // Color of the point border
            pointBorderWidth: 2, // Width of the point border
            pointRadius: 5, // Size of the points
            tension: 0.4, // Smoothness of the line
          },
        ],
      };
  
      return lineChartData;
    } catch (error) {
      console.error("Error fetching line chart data:", error);
      return {
        labels: [],
        datasets: [
          {
            label: "Active Records Over Time",
            data: [],
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 2,
            fill: true,
            pointBackgroundColor: "rgba(255, 159, 64, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            tension: 0.4,
          },
        ],
      };
    }
  };
  
  export default fetchLineChartData;