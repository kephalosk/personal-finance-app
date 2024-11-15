import { EPPot } from '../model/entrypoints/EPPot';
import { ColorNameEnum } from '../model/enum/ColorNameEnum';
import { APIPotDTO } from '../model/api/APIPotDTO';

export const mockedPot: EPPot = {
  name: 'Savings',
  target: 2000.0,
  total: 159.0,
  color: ColorNameEnum.DARKGREEN,
};

export const mockedPots: EPPot[] = [
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

export const mockedPots2: EPPot[] = [
  {
    name: 'Savings',
    target: 2000.0,
    total: 159.0,
    color: ColorNameEnum.DARKGREEN,
  },
  {
    name: 'Concert Ticket',
    target: 150.0,
    total: 110.0,
    color: ColorNameEnum.DARKGREY,
  },
];
