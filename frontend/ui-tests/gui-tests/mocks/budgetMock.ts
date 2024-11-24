import { Route } from 'playwright';

const getBudgets = async (route: Route) => {
  const mockResponse = [
    {
      category: 'Entertainment',
      maximum: 50.0,
      theme: '#277C78',
    },
    {
      category: 'Bills',
      maximum: 750.0,
      theme: '#82C9D7',
    },
    {
      category: 'Dining Out',
      maximum: 75.0,
      theme: '#F2CDAC',
    },
    {
      category: 'Personal Care',
      maximum: 100.0,
      theme: '#626070',
    },
  ];

  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockResponse),
  });
};

export default getBudgets;
