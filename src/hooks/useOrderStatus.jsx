const useOrderStatus = (allOrders) => {
  let orderChartData = [];

  for (let i = 0; i < allOrders?.length; i++) {
    const existingItem = orderChartData.find(
      (item) => item.name === allOrders[i]?.orderStatus
    );
    if (existingItem) {
      existingItem.total += 1;
    } else {
      orderChartData.push({ name: allOrders[i]?.orderStatus, total: 1 });
    }
  }

  return { orderChartData };
};

export default useOrderStatus;
