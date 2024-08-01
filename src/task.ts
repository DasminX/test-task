import { Category } from './mockedApi';

// Refactored/done task

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

type DataFetcherFn<T> = () => Promise<{ data: T }>;

export const categoryTree = async (
  dataFetcher: DataFetcherFn<Category[]>
): Promise<CategoryListElement[]> => {
  const { data } = await dataFetcher();

  return createCategoryListElements(data, true);
};

export function createCategoryListElements(
  categories: Category[],
  isRoot = false
): CategoryListElement[] {
  return categories
    .map((category, index) => ({
      id: category.id,
      image: category.MetaTagDescription,
      name: category.name,
      order: determineOrder(category.Title, category.id),
      children: createCategoryListElements(category.children),
      showOnHome: isRoot && index < 5,
    }))
    .sort((a, b) => a.order - b.order);
}

/* Export these below only for testing purposes - mentally it's a part of this module.
Anyways, these functions seem to be quite generic, so some of them could be also part of utils. */

export function determineOrder(
  title: Category['Title'],
  id: Category['id']
): number {
  const orderAsInteger = parseInt(title);
  return isNaN(orderAsInteger) ? id : orderAsInteger;
}
