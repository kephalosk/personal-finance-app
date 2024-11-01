import { EPPot } from '../types/EPPot';
import { ColorNameEnum } from '../types/ColorNameEnum';

export const pot: EPPot = {
  name: 'Savings',
  target: 2000.0,
  total: 159.0,
  color: ColorNameEnum.DARKGREEN,
};

export const pots: EPPot[] = [
  {
    name: 'Savings',
    target: 2000.0,
    total: 159.0,
    color: ColorNameEnum.DARKGREEN,
  },
  {
    name: 'Holiday',
    target: 1000.0,
    total: 100.0,
    color: ColorNameEnum.LIGHTBLUE,
  },
  {
    name: 'Laptop',
    target: 200.0,
    total: 10.0,
    color: ColorNameEnum.PURPLE,
  },
  {
    name: 'Handy',
    target: 20.0,
    total: 15.0,
    color: ColorNameEnum.DARKGREY,
  },
];
