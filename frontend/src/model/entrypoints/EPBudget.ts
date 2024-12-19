import { ColorNameEnum } from '../enum/ColorNameEnum';

export interface EPBudget {
  category: string;
  categoryKey: string;
  maximum: number;
  color: ColorNameEnum;
}
