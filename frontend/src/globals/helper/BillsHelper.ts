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
  static getRecurringBillsFromTransactions(): EPTransaction[] {
    const bills: EPTransaction[] = getTransactions().filter((transaction) => {
      return transaction.recurring;
    });
    return bills.filter(
      (transaction, index, self) =>
        index ===
        self.findIndex((t) => {
          return t.name === transaction.name;
        })
    );
  }

  static getPaidUpcomingAndDueBillsSumAndIndex(
    bills: EPTransaction[],
    today: Date
  ): PaidUpcomingAndDueSumAndIndex {
    const todayDay = today.getDate();
    const soonDay = todayDay + 5;

    let paidBillsSum = 0;
    let paidBillsIndex = 0;
    let upcomingBillsSum = 0;
    let upcomingBillsIndex = 0;
    let dueBillsSum = 0;
    let dueBillsIndex = 0;

    const raisePaidBills = (amount: number) => {
      const amountPositive = amount * -1;
      paidBillsSum = paidBillsSum + amountPositive;
      paidBillsIndex = paidBillsIndex + 1;
    };

    const raiseUpcomingBills = (amount: number) => {
      const amountPositive = amount * -1;
      upcomingBillsSum = upcomingBillsSum + amountPositive;
      upcomingBillsIndex = upcomingBillsIndex + 1;
    };

    const raiseDueBills = (amount: number) => {
      const amountPositive = amount * -1;
      dueBillsSum = dueBillsSum + amountPositive;
      dueBillsIndex = dueBillsIndex + 1;
    };

    bills.forEach((bill) => {
      const billDay = bill.dateRaw.getDate();
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
