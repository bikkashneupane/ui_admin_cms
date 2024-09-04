const uselast7daysSales = (confirmedOrder) => {
  const date = new Date("2024/09/03");
  const sevenDaysAgo = new Date(date);
  sevenDaysAgo.setDate(date.getDate() - 7);

  // Helper function to get the abbreviated day name
  const getDayName = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  // Initialize an object to hold sales data for each day
  const salesByDay = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  // Filter sales and aggregate by day
  confirmedOrder
    ?.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= sevenDaysAgo && orderDate <= date;
    })
    .forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const dayName = getDayName(orderDate);
      salesByDay[dayName] += order.amount; // Assuming order.sales contains the sales amount
    });

  // Convert salesByDay object to array format
  const last7DaysSalesdata = Object.keys(salesByDay).map((dayName) => ({
    name: dayName,
    sales: salesByDay[dayName],
  }));

  return { last7DaysSalesdata };
};

export default uselast7daysSales;
