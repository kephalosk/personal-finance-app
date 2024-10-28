import { render, screen } from '@testing-library/react';
import { TransactionRowProps } from '../../../types/TransactionRowProps';
import { MemoryRouter } from 'react-router-dom';
import { BudgetCard } from './BudgetCard';
import { BudgetCardProps } from '../../../types/BudgetCardProps';

describe('BudgetCard', () => {
  const transactions: TransactionRowProps[] = [
    {
      name: 'James Thompson',
      value: -5,
      date: '11 Aug 2024',
      imgSrc: './src/assets/images/avatars/james-thompson.jpg',
    },
    {
      name: 'Pixel Playground',
      value: -10,
      date: '15 Aug 2024',
      imgSrc: './src/assets/images/avatars/pixel-playground.jpg',
    },
    {
      name: 'Rina Sato',
      value: -10,
      date: '13 Jul 2024',
      imgSrc: './src/assets/images/avatars/rina-sato.jpg',
    },
  ];
  const link: string = 'testLink';
  const maximum: number = 100;
  const category: string = 'testCategory';
  const color: string = 'testColor';

  const testProps: BudgetCardProps = {
    transactions,
    link,
    maximum,
    category,
    color,
  };

  let spent: number = 0;
  transactions.forEach((transaction) => {
    spent = spent + transaction.value;
  });
  spent = spent * -1;

  const remaining: number = maximum - spent;

  it('renders div budgetCard', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetCardHeader', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('budget-card-header');

    expect(component).toBeInTheDocument();
  });

  it('renders div budgetCardBar', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetCardBarLabel', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`Maximum of $${maximum}`);
  });

  it('renders div budgetCardBarMax', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarMax');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardBarCurrent', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarCurrent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardBarValues', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component ValueBox-spent with passed color', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('value-box');

    components.forEach((component) => {
      const title = component.querySelector('.valueBoxContentTitle')!.textContent;
      if (title === 'Spent') {
        expect(component.querySelector('.valueBoxBorder')).toHaveClass(color);
        const value = component.querySelector('.valueBoxContentValue')!.textContent;
        expect(value).toEqual(`$${spent}`);
      }
    });
  });

  it('renders component ValueBox-remaining', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('value-box');

    components.forEach((component) => {
      const title = component.querySelector('.valueBoxContentTitle')!.textContent;
      if (title === 'Remaining') {
        const value = component.querySelector('.valueBoxContentValue')!.textContent;
        expect(value).toEqual(`$${remaining}`);
      }
    });
  });

  it('renders component BudgetCardList', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('budget-card-list');

    expect(component).toBeInTheDocument();
  });
});
