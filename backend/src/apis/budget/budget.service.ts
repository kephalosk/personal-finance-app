import { Injectable } from '@nestjs/common';
import { APIBudgetDTO } from '../../model/apis/APIBudgetDTO';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Injectable()
export class BudgetService {
  getBudget(): APIBudgetDTO[] {
    const filePath: string = path.join(__dirname, '../budget/budget.data.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { budgets } = data;
    return budgets;
  }
}
