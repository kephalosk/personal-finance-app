import './BudgetsPage.scss';
import { HeaderBar } from '../components/budgets/HeaderBar';
import { BudgetsDiagramCard } from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import { TransactionRowProps } from '../types/TransactionRowProps';
import { BudgetCard } from '../components/budgets/BudgetCard/BudgetCard';
import { getBudgets } from '../globals/services/BudgetService';
import { EPBudget } from '../types/EPBudget';
import { EPTransaction } from '../types/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';

export function BudgetsPage() {
  const budgetCardListEntertainmentTransactions: TransactionRowProps[] = [
    {
      name: 'James Thompson',
      value: -5,
      date: '11 Aug 2024',
      imgSrc: './src/assets/images/avatars/james-thompson.jpg',
    },
    {
      name: 'Pixel Playground',
      value: -10,
      date: '11 Aug 2024',
      imgSrc: './src/assets/images/avatars/pixel-playground.jpg',
    },
    {
      name: 'Rina Sato',
      value: -10,
      date: '13 Jul 2024',
      imgSrc: './src/assets/images/avatars/rina-sato.jpg',
    },
  ];

  const budgetCardListBillsTransactions: TransactionRowProps[] = [
    {
      name: 'Spark Electric Solutions',
      value: -100,
      date: '2 Aug 2024',
      imgSrc: './src/assets/images/avatars/spark-electric-solutions.jpg',
    },
    {
      name: 'Rina Sato',
      value: -50,
      date: '2 Aug 2024',
      imgSrc: './src/assets/images/avatars/rina-sato.jpg',
    },
    {
      name: 'Aqua Flow Utilities',
      value: -100,
      date: '30 Jul 2024',
      imgSrc: './src/assets/images/avatars/aqua-flow-utilities.jpg',
    },
  ];

  const budgetCardListDiningOutTransactions: TransactionRowProps[] = [
    {
      name: 'Savory Bites Bistro',
      value: -55.5,
      date: '19 Aug 2024',
      imgSrc: './src/assets/images/avatars/savory-bites-bistro.jpg',
    },
    {
      name: 'Ethan Clark',
      value: -32.5,
      date: '20 Aug 2024',
      imgSrc: './src/assets/images/avatars/ethan-clark.jpg',
    },
    {
      name: 'Ella Phillips',
      value: -45,
      date: '10 Aug 2024',
      imgSrc: './src/assets/images/avatars/ella-phillips.jpg',
    },
  ];

  const budgetCardListPersonalCareTransactions: TransactionRowProps[] = [
    {
      name: 'William Harris',
      value: -10,
      date: '5 Aug 2024',
      imgSrc: './src/assets/images/avatars/william-harris.jpg',
    },
    {
      name: 'Serenity Spa & Wellness',
      value: -30,
      date: '3 Aug 2024',
      imgSrc: './src/assets/images/avatars/serenity-spa-and-wellness.jpg',
    },
    {
      name: 'Serenity Spa & Wellness',
      value: -30,
      date: '3 Jul 2024',
      imgSrc: './src/assets/images/avatars/serenity-spa-and-wellness.jpg',
    },
  ];

  const budgetCardListLink = '../transactions';

  const budgets: EPBudget[] = getBudgets();
  const transactions: EPTransaction[] = getTransactions();

  const budgetCardListEntertainmentBudgetCategory: string = 'Entertainment';
  const budgetCardListEntertainmentBudgetMaximum: number = 50.0;
  const budgetCardListEntertainmentBudgetColor: string = 'dark-green';

  const budgetCardListBillsBudgetCategory: string = 'Bills';
  const budgetCardListBillsBudgetMaximum: number = 750.0;
  const budgetCardListBillsBudgetColor: string = 'light-blue';

  const budgetCardListDiningOutBudgetCategory: string = 'Dining Out';
  const budgetCardListDiningOutBudgetMaximum: number = 75.0;
  const budgetCardListDiningOutBudgetColor: string = 'beige';

  const budgetCardListPersonalCareBudgetCategory: string = 'Personal Care';
  const budgetCardListPersonalCareBudgetMaximum: number = 100.0;
  const budgetCardListPersonalCareBudgetColor: string = 'dark-grey';

  return (
    <>
      <div className="budgetsPage" data-testid="budgets-page">
        <HeaderBar h1Headline="Budgets" buttonText="+ Add New Budget" />
        <div className="budgetsDetails">
          <div className="budgetsDetailsLeft">
            <BudgetsDiagramCard />
          </div>
          <div className="budgetsDetailsRight">
            <BudgetCard
              transactions={budgetCardListEntertainmentTransactions}
              link={budgetCardListLink}
              maximum={budgetCardListEntertainmentBudgetMaximum}
              category={budgetCardListEntertainmentBudgetCategory}
              color={budgetCardListEntertainmentBudgetColor}
            />
            <BudgetCard
              transactions={budgetCardListBillsTransactions}
              link={budgetCardListLink}
              maximum={budgetCardListBillsBudgetMaximum}
              category={budgetCardListBillsBudgetCategory}
              color={budgetCardListBillsBudgetColor}
            />
            <BudgetCard
              transactions={budgetCardListDiningOutTransactions}
              link={budgetCardListLink}
              maximum={budgetCardListDiningOutBudgetMaximum}
              category={budgetCardListDiningOutBudgetCategory}
              color={budgetCardListDiningOutBudgetColor}
            />
            <BudgetCard
              transactions={budgetCardListPersonalCareTransactions}
              link={budgetCardListLink}
              maximum={budgetCardListPersonalCareBudgetMaximum}
              category={budgetCardListPersonalCareBudgetCategory}
              color={budgetCardListPersonalCareBudgetColor}
            />
          </div>
        </div>
      </div>
    </>
  );
}
