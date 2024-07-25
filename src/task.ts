import { Category } from './mockedApi';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

type DataOf<T> = { data: T };

type DataFetcherFn<T> = () => Promise<DataOf<T>>;
type DataTransformerFn<Input, Output> = (data: Input) => Output;

export const categoryTree = async (
  dataFetcher: DataFetcherFn<Category[]>,
  dataTransformer: DataTransformerFn<Category[], CategoryListElement[]>
): Promise<CategoryListElement[]> => {
  const { data } = await dataFetcher();

  if (!data) {
    return [];
  }

  return dataTransformer(data);
};

export function createCategoryListElements(
  categories: Category[],
  depth = 1
): CategoryListElement[] {
  return categories
    .map((category, index) => ({
      id: category.id,
      image: category.MetaTagDescription,
      name: category.name,
      order: getOrder(category),
      children: category.hasChildren
        ? createCategoryListElements(category.children, depth + 1)
        : [],
      showOnHome:
        depth === 1 &&
        (arrayShorterEqualThan(5, categories) ||
          isOrderedByHash(category) ||
          isItemIndexLessThan(3, index)),
    }))
    .sort((a, b) => a.order - b.order);
}

/* Export these below only for testing purposes - mentally it's a part of this module.
Anyways, these functions seem to be quite generic, so some of them could be also part of utils. */
export function arrayShorterEqualThan(num: number, array: unknown[]) {
  if (!Array.isArray(array)) return false;
  return array.length <= num;
}

export function isItemIndexLessThan(num: number, index: number) {
  if (
    typeof num !== 'number' ||
    isNaN(num) ||
    typeof index !== 'number' ||
    isNaN(index)
  ) {
    throw new Error('Either num or index are not numbers!');
  }
  return index < num;
}

export function getOrder(category: Category): number {
  let order = category.Title;
  if (isOrderedByHash(category)) {
    order = category.Title.split('#')[0];
  }

  const orderAsInteger = parseInt(order);
  return isNaN(orderAsInteger) ? category.id : orderAsInteger;
}

export function isOrderedByHash(category: Category) {
  return category?.Title.includes('#');
}
