import { Category } from '../model/Category';
import { CategoryKeyEnum } from '../model/StammdatenC/CategoryKeyEnum';
import { CategoryEnum } from '../model/StammdatenC/CategoryEnum';

export const Categories: Category[] = [
  { name: CategoryEnum.GENERAL, key: CategoryKeyEnum.GENERAL },
  { name: CategoryEnum.DINING_OUT, key: CategoryKeyEnum.DINING_OUT },
  { name: CategoryEnum.GROCERIES, key: CategoryKeyEnum.GROCERIES },
  { name: CategoryEnum.ENTERTAINMENT, key: CategoryKeyEnum.ENTERTAINMENT },
  { name: CategoryEnum.TRANSPORTATION, key: CategoryKeyEnum.TRANSPORTATION },
  { name: CategoryEnum.LIFESTYLE, key: CategoryKeyEnum.LIFESTYLE },
  { name: CategoryEnum.PERSONAL_CARE, key: CategoryKeyEnum.PERSONAL_CARE },
  { name: CategoryEnum.EDUCATION, key: CategoryKeyEnum.EDUCATION },
  { name: CategoryEnum.BILLS, key: CategoryKeyEnum.BILLS },
  { name: CategoryEnum.SHOPPING, key: CategoryKeyEnum.SHOPPING },
];

export const CategoriesMap: Record<string, Category> = Categories.reduce(
  (map: Record<string, Category>, category: Category) => {
    map[category.name] = category;
    return map;
  },
  {} as Record<string, Category>
);
