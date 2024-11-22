import { EPTransaction } from '../entrypoints/EPTransaction';

export interface BillCardProps {
  bills: EPTransaction[];
  today: Date;
  isLoading: boolean;
}
