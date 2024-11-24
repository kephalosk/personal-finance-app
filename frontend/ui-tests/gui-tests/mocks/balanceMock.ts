import { Route } from 'playwright';

const getBalance = async (route: Route) => {
  const mockResponse = {
    current: 4836.0,
    income: 3814.25,
    expenses: 1700.5,
  };

  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockResponse),
  });
};

export default getBalance;
