import { EPTransaction } from '../entrypoints/EPTransaction';

export interface OverviewBillsProps {
  bills: EPTransaction[];
  today: Date;
}
