import { ColorNameEnum } from './ColorNameEnum';

export interface EPPot {
  name: string;
  target: number;
  total: number;
  color: ColorNameEnum;
}
