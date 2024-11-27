import { ColorNameEnum } from './enum/ColorNameEnum';
import { ColorCodeEnum } from './enum/ColorCodeEnum';
import { ColorDisplayNameEnum } from './enum/ColorDisplayNameEnum';

export interface Color {
  name: ColorNameEnum;
  code: ColorCodeEnum;
  displayName: ColorDisplayNameEnum;
  disabled: boolean;
}
