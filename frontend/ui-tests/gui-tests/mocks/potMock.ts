import { Route } from 'playwright';
import { ColorNameEnum } from '../../../src/model/enum/ColorNameEnum';

const getPots = async (route: Route) => {
  const mockResponse = [
    {
      name: 'Savings',
      target: 2000.0,
      total: 159.0,
      theme: '#277C78',
    },
    {
      name: 'Concert Ticket',
      target: 150.0,
      total: 110.0,
      theme: '#626070',
    },
    {
      name: 'Gift',
      target: 150.0,
      total: 110.0,
      theme: '#82C9D7',
    },
    {
      name: 'New Laptop',
      target: 1000.0,
      total: 10.0,
      theme: '#F2CDAC',
    },
    {
      name: 'Holiday',
      target: 1440.0,
      total: 531.0,
      theme: '#826CB0',
    },
  ];

  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockResponse),
  });
};

export default getPots;
