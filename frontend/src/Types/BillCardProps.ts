import { EPTransaction } from './EPTransaction';

export interface BillCardProps {
  bills: EPTransaction[];
  today: Date;
}
