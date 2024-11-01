import { EPTransaction } from '../entrypoints/EPTransaction';

export interface BillSummaryProps {
  bills: EPTransaction[];
  today: Date;
}
