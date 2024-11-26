import { Category } from '../model/Category';

export const Categories: Category[] = [
  { name: 'General', key: 'general' },
  { name: 'Dining Out', key: 'diningout' },
  { name: 'Groceries', key: 'groceries' },
  { name: 'Entertainment', key: 'entertainment' },
  { name: 'Transportation', key: 'transportation' },
  { name: 'Lifestyle', key: 'lifestyle' },
  { name: 'Personal Care', key: 'personalcare' },
  { name: 'Education', key: 'education' },
  { name: 'Bills', key: 'bills' },
  { name: 'Shopping', key: 'shopping' },
];

export const CategoriesMap: Record<string, Category> = Categories.reduce(
  (map, category) => {
    map[category.name] = category;
    return map;
  },
  {} as Record<string, Category>
);
