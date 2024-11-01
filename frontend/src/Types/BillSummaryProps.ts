import { EPTransaction } from './EPTransaction';

export interface BillSummaryProps {
  bills: EPTransaction[];
  today: Date;
}
