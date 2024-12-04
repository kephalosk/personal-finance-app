import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { getTransactions } from '../services/TransactionService';

interface PaidUpcomingAndDueSumAndIndex {
  paidBillsSum: number;
  paidBillsIndex: number;
  upcomingBillsSum: number;
  upcomingBillsIndex: number;
  dueBillsSum: number;
  dueBillsIndex: number;
}

export class BillsHelper {
  static async getRecurringBillsFromTransactions(): Promise<EPTransaction[]> {
    const transactions: EPTransaction[] = await getTransactions();
    const bills: EPTransaction[] = transactions.filter((transaction: EPTransaction) => {
      return transaction.recurring;
    });
    return bills.filter(
      (transaction: EPTransaction, index: number, self: EPTransaction[]) =>
        index ===
        self.findIndex((t: EPTransaction) => {
          return t.name === transaction.name;
        })
    );
  }

  static getPaidUpcomingAndDueBillsSumAndIndex(
    bills: EPTransaction[],
    today: Date
  ): PaidUpcomingAndDueSumAndIndex {
    const todayDay: number = today.getDate();
    const soonDay: number = todayDay + 5;

    let paidBillsSum: number = 0;
    let paidBillsIndex: number = 0;
    let upcomingBillsSum: number = 0;
    let upcomingBillsIndex: number = 0;
    let dueBillsSum: number = 0;
    let dueBillsIndex: number = 0;

    const raisePaidBills = (amount: number): void => {
      const amountPositive: number = amount * -1;
      paidBillsSum = paidBillsSum + amountPositive;
      paidBillsIndex = paidBillsIndex + 1;
    };

    const raiseUpcomingBills = (amount: number) => {
      const amountPositive: number = amount * -1;
      upcomingBillsSum = upcomingBillsSum + amountPositive;
      upcomingBillsIndex = upcomingBillsIndex + 1;
    };

    const raiseDueBills = (amount: number) => {
      const amountPositive: number = amount * -1;
      dueBillsSum = dueBillsSum + amountPositive;
      dueBillsIndex = dueBillsIndex + 1;
    };

    bills.forEach((bill: EPTransaction) => {
      const billDay: number = bill.dateRaw.getDate();
      if (billDay <= todayDay) {
        raisePaidBills(bill.amount);
      } else if (billDay <= soonDay) {
        raiseUpcomingBills(bill.amount);
        raiseDueBills(bill.amount);
      } else {
        raiseUpcomingBills(bill.amount);
      }
    });

    return {
      paidBillsSum,
      paidBillsIndex,
      upcomingBillsSum,
      upcomingBillsIndex,
      dueBillsSum,
      dueBillsIndex,
    };
  }
}
