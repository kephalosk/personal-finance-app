import { Injectable } from '@nestjs/common';
import { APIPotDTO } from '../model/APIPotDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class PotsService {
  getPots(): APIPotDTO[] {
    const filePath = path.join(__dirname, '../pots/pots.data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { pots } = data;
    return pots;
  }
}
