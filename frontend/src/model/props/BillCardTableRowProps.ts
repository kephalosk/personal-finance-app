import { EPTransaction } from '../entrypoints/EPTransaction';

export interface BillCardTableRowProps {
  transaction: EPTransaction;
  today: Date;
}
