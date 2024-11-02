export interface EPTransaction {
  avatar: string;
  name: string;
  category: string;
  categoryKey: string;
  date: string;
  dateRaw: Date;
  amount: number;
  recurring: boolean;
}
