import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { APICategoryDTO } from '../src/model/apis/APICategoryDTO';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Server is reachable and healthy');
  });

  it('/balance (GET)', async () => {
    return request(app.getHttpServer())
      .get('/balance')
      .expect(200)
      .expect({ current: '4836.00', income: '3814.25', expenses: '1700.50' });
  });

  it('/transactions (GET)', async () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(200)
      .expect([
        {
          avatar: '/images/avatars/emma-richardson.jpg',
          name: 'Emma Richardson',
          category: 'General',
          date: '2024-08-19T14:23:11.000Z',
          amount: '75.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/savory-bites-bistro.jpg',
          name: 'Savory Bites Bistro',
          category: 'Dining Out',
          date: '2024-08-19T20:23:11.000Z',
          amount: '-55.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/daniel-carter.jpg',
          name: 'Daniel Carter',
          category: 'General',
          date: '2024-08-18T09:45:32.000Z',
          amount: '-42.30',
          recurring: false,
        },
        {
          avatar: '/images/avatars/sun-park.jpg',
          name: 'Sun Park',
          category: 'General',
          date: '2024-08-17T16:12:05.000Z',
          amount: '120.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/urban-services-hub.jpg',
          name: 'Urban Services Hub',
          category: 'General',
          date: '2024-08-17T21:08:09.000Z',
          amount: '-65.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/liam-hughes.jpg',
          name: 'Liam Hughes',
          category: 'Groceries',
          date: '2024-08-15T18:20:33.000Z',
          amount: '65.75',
          recurring: false,
        },
        {
          avatar: '/images/avatars/lily-ramirez.jpg',
          name: 'Lily Ramirez',
          category: 'General',
          date: '2024-08-14T13:05:27.000Z',
          amount: '50.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/ethan-clark.jpg',
          name: 'Ethan Clark',
          category: 'Dining Out',
          date: '2024-08-13T20:15:59.000Z',
          amount: '-32.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/james-thompson.jpg',
          name: 'James Thompson',
          category: 'Entertainment',
          date: '2024-08-11T15:45:38.000Z',
          amount: '-5.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/pixel-playground.jpg',
          name: 'Pixel Playground',
          category: 'Entertainment',
          date: '2024-08-11T18:45:38.000Z',
          amount: '-10.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/ella-phillips.jpg',
          name: 'Ella Phillips',
          category: 'Dining Out',
          date: '2024-08-10T19:22:51.000Z',
          amount: '-45.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/sofia-peterson.jpg',
          name: 'Sofia Peterson',
          category: 'Transportation',
          date: '2024-08-08T08:55:17.000Z',
          amount: '-15.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/mason-martinez.jpg',
          name: 'Mason Martinez',
          category: 'Lifestyle',
          date: '2024-08-07T17:40:29.000Z',
          amount: '-35.25',
          recurring: false,
        },
        {
          avatar: '/images/avatars/green-plate-eatery.jpg',
          name: 'Green Plate Eatery',
          category: 'Groceries',
          date: '2024-08-06T08:25:44.000Z',
          amount: '-78.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/sebastian-cook.jpg',
          name: 'Sebastian Cook',
          category: 'Transportation',
          date: '2024-08-06T10:05:44.000Z',
          amount: '-22.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/william-harris.jpg',
          name: 'William Harris',
          category: 'Personal Care',
          date: '2024-08-05T14:30:56.000Z',
          amount: '-10.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/elevate-education.jpg',
          name: 'Elevate Education',
          category: 'Education',
          date: '2024-08-04T11:15:22.000Z',
          amount: '-50.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/serenity-spa-and-wellness.jpg',
          name: 'Serenity Spa & Wellness',
          category: 'Personal Care',
          date: '2024-08-03T14:00:37.000Z',
          amount: '-30.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/spark-electric-solutions.jpg',
          name: 'Spark Electric Solutions',
          category: 'Bills',
          date: '2024-08-02T09:25:11.000Z',
          amount: '-100.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/rina-sato.jpg',
          name: 'Rina Sato',
          category: 'Bills',
          date: '2024-08-02T13:31:11.000Z',
          amount: '-50.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/swift-ride-share.jpg',
          name: 'Swift Ride Share',
          category: 'Transportation',
          date: '2024-08-01T18:40:33.000Z',
          amount: '-18.75',
          recurring: false,
        },
        {
          avatar: '/images/avatars/aqua-flow-utilities.jpg',
          name: 'Aqua Flow Utilities',
          category: 'Bills',
          date: '2024-07-30T13:20:14.000Z',
          amount: '-100.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/ecofuel-energy.jpg',
          name: 'EcoFuel Energy',
          category: 'Bills',
          date: '2024-07-29T11:55:29.000Z',
          amount: '-35.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/yuna-kim.jpg',
          name: 'Yuna Kim',
          category: 'Dining Out',
          date: '2024-07-29T13:51:29.000Z',
          amount: '-28.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/flavor-fiesta.jpg',
          name: 'Flavor Fiesta',
          category: 'Dining Out',
          date: '2024-07-27T20:15:06.000Z',
          amount: '-42.75',
          recurring: false,
        },
        {
          avatar: '/images/avatars/harper-edwards.jpg',
          name: 'Harper Edwards',
          category: 'Shopping',
          date: '2024-07-26T09:43:23.000Z',
          amount: '-89.99',
          recurring: false,
        },
        {
          avatar: '/images/avatars/buzz-marketing-group.jpg',
          name: 'Buzz Marketing Group',
          category: 'General',
          date: '2024-07-26T14:40:23.000Z',
          amount: '3358.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/technova-innovations.jpg',
          name: 'TechNova Innovations',
          category: 'Shopping',
          date: '2024-07-25T16:25:37.000Z',
          amount: '-29.99',
          recurring: false,
        },
        {
          avatar: '/images/avatars/bytewise.jpg',
          name: 'ByteWise',
          category: 'Lifestyle',
          date: '2024-07-23T09:35:14.000Z',
          amount: '-49.99',
          recurring: true,
        },
        {
          avatar: '/images/avatars/nimbus-data-storage.jpg',
          name: 'Nimbus Data Storage',
          category: 'Bills',
          date: '2024-07-21T10:05:42.000Z',
          amount: '-9.99',
          recurring: true,
        },
        {
          avatar: '/images/avatars/emma-richardson.jpg',
          name: 'Emma Richardson',
          category: 'General',
          date: '2024-07-20T17:30:55.000Z',
          amount: '-25.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/daniel-carter.jpg',
          name: 'Daniel Carter',
          category: 'General',
          date: '2024-07-19T12:45:09.000Z',
          amount: '50.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/sun-park.jpg',
          name: 'Sun Park',
          category: 'General',
          date: '2024-07-18T19:20:23.000Z',
          amount: '-38.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/harper-edwards.jpg',
          name: 'Harper Edwards',
          category: 'Shopping',
          date: '2024-07-17T14:55:37.000Z',
          amount: '-29.99',
          recurring: false,
        },
        {
          avatar: '/images/avatars/liam-hughes.jpg',
          name: 'Liam Hughes',
          category: 'Groceries',
          date: '2024-07-16T10:10:51.000Z',
          amount: '-52.75',
          recurring: false,
        },
        {
          avatar: '/images/avatars/lily-ramirez.jpg',
          name: 'Lily Ramirez',
          category: 'General',
          date: '2024-07-15T16:35:04.000Z',
          amount: '75.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/ethan-clark.jpg',
          name: 'Ethan Clark',
          category: 'Dining Out',
          date: '2024-07-14T20:50:18.000Z',
          amount: '-41.25',
          recurring: false,
        },
        {
          avatar: '/images/avatars/rina-sato.jpg',
          name: 'Rina Sato',
          category: 'Entertainment',
          date: '2024-07-13T09:15:32.000Z',
          amount: '-10.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/james-thompson.jpg',
          name: 'James Thompson',
          category: 'Bills',
          date: '2024-07-12T13:40:46.000Z',
          amount: '-95.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/ella-phillips.jpg',
          name: 'Ella Phillips',
          category: 'Dining Out',
          date: '2024-07-11T18:05:59.000Z',
          amount: '-33.75',
          recurring: false,
        },
        {
          avatar: '/images/avatars/yuna-kim.jpg',
          name: 'Yuna Kim',
          category: 'Dining Out',
          date: '2024-07-10T12:30:13.000Z',
          amount: '-27.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/sofia-peterson.jpg',
          name: 'Sofia Peterson',
          category: 'Transportation',
          date: '2024-07-09T08:55:27.000Z',
          amount: '-12.50',
          recurring: false,
        },
        {
          avatar: '/images/avatars/mason-martinez.jpg',
          name: 'Mason Martinez',
          category: 'Lifestyle',
          date: '2024-07-08T15:20:41.000Z',
          amount: '-65.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/sebastian-cook.jpg',
          name: 'Sebastian Cook',
          category: 'Transportation',
          date: '2024-07-07T11:45:55.000Z',
          amount: '-20.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/william-harris.jpg',
          name: 'William Harris',
          category: 'Personal Care',
          date: '2024-07-06T09:00:00.000Z',
          amount: '-15.00',
          recurring: false,
        },
        {
          avatar: '/images/avatars/elevate-education.jpg',
          name: 'Elevate Education',
          category: 'Education',
          date: '2024-07-05T11:15:22.000Z',
          amount: '-50.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/serenity-spa-and-wellness.jpg',
          name: 'Serenity Spa & Wellness',
          category: 'Personal Care',
          date: '2024-07-03T14:00:37.000Z',
          amount: '-30.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/spark-electric-solutions.jpg',
          name: 'Spark Electric Solutions',
          category: 'Bills',
          date: '2024-07-02T09:25:51.000Z',
          amount: '-100.00',
          recurring: true,
        },
        {
          avatar: '/images/avatars/swift-ride-share.jpg',
          name: 'Swift Ride Share',
          category: 'Transportation',
          date: '2024-07-02T19:50:05.000Z',
          amount: '-16.50',
          recurring: false,
        },
      ]);
  });

  it('/pots (GET)', async () => {
    return request(app.getHttpServer())
      .get('/pots')
      .expect(200)
      .expect([
        {
          name: 'Savings',
          target: '2000.00',
          total: '159.00',
          theme: '#277C78',
        },
        {
          name: 'Concert Ticket',
          target: '150.00',
          total: '110.00',
          theme: '#626070',
        },
        { name: 'Gift', target: '150.00', total: '110.00', theme: '#82C9D7' },
        {
          name: 'New Laptop',
          target: '1000.00',
          total: '10.00',
          theme: '#F2CDAC',
        },
        {
          name: 'Holiday',
          target: '1440.00',
          total: '531.00',
          theme: '#826CB0',
        },
      ]);
  });

  it('/pots/addNewPot (POST)', async () => {
    const newPot = {
      name: 'Move',
      target: 300000,
      total: 60000,
      theme: '#FFFFFF',
    };

    return request(app.getHttpServer())
      .post('/pots/addNewPot')
      .send(newPot)
      .expect(201)
      .expect({});
  });

  it('/budget (GET)', async () => {
    return request(app.getHttpServer())
      .get('/budget')
      .expect(200)
      .expect([
        { category: 'Entertainment', maximum: '50.00', theme: '#277C78' },
        { category: 'Bills', maximum: '750.00', theme: '#82C9D7' },
        { category: 'Dining Out', maximum: '75.00', theme: '#F2CDAC' },
        { category: 'Personal Care', maximum: '100.00', theme: '#626070' },
      ]);
  });

  it('/budget/addNewBudget (POST)', async () => {
    const newBudget = {
      category: 'Transportation',
      maximum: 50.0,
      theme: '#277C78',
    };

    return request(app.getHttpServer())
      .post('/budget/addNewBudget')
      .send(newBudget)
      .expect(201)
      .expect({});
  });

  it('/budget/editBudget (PUT)', async () => {
    const updatedBudget = {
      category: 'Transportation',
      maximum: 100.0,
      theme: '#FFFFFF',
    };

    return request(app.getHttpServer())
      .put('/budget/editBudget')
      .send(updatedBudget)
      .expect(200)
      .expect({});
  });

  it('/budget/deleteBudget (DELETE)', async () => {
    const category: APICategoryDTO = {
      category: 'Transportation',
    };

    return request(app.getHttpServer())
      .delete('/budget/deleteBudget')
      .send(category)
      .expect(200)
      .expect({});
  });
});
