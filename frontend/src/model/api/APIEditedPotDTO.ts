import { APIPotDTO } from './APIPotDTO';

export interface APIEditedPotDTO extends APIPotDTO {
  oldName: string;
}
