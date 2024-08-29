import axios from 'axios'
const fetchBarChartDataForStaus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/records-vs-state', {
      // Axios handles CORS automatically if the server allows it
      headers: {
        'Content-Type': 'application/json',
      },
      // Optional CORS configuration; mostly handled server-side
      withCredentials: false, // Set to true if you need to send cookies
    }); // Replace with your actual API endpoint
    const data = response.data;
    const counts = data.map(item => item.count);
    const Labels= data.map(item => item.status)
    //console.log(data)
    console.log("Hello")
    //console.log(counts)
    // Assuming the API returns an object with 'labels' and 'values' arrays
    const barChartStatusData = {
      labels: Labels,
      //labels: data.labels, // e.g., ["Exception 1", "Exception 2", "Exception 3"]
      datasets: [
        {
          label: "Number of Records",
          data: counts, // e.g., [12, 19, 3]
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