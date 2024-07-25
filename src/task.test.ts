import test from 'ava';

import { CORRECT } from './correctResult';
import { INCORRECT } from './currentResult';
import { Category, getCategories } from './mockedApi';
import {
  arrayShorterEqualThan,
  categoryTree,
  createCategoryListElements,
  getOrder,
  isItemIndexLessThan,
  isOrderedByHash,
} from './task';

/* Main task tests */
test('main task: result is as same as CORRECT', async (t) => {
  const result = await categoryTree(getCategories, createCategoryListElements);

  t.deepEqual(result, CORRECT);
});

test('main task: result fails when comapred to INCORRECT', async (t) => {
  const result = await categoryTree(getCategories, createCategoryListElements);

  t.notDeepEqual(result, INCORRECT);
});

/* Array shorter or equal than */
test('function arrayShorterEqualThan gives false if no array provided', (t) => {
  t.falsy(arrayShorterEqualThan(1, 1 as unknown as []));
});

test('function arrayShorterEqualThan gives true if array is shorter than given number', (t) => {
  t.truthy(arrayShorterEqualThan(8, Array(5)));
});

test('function arrayShorterEqualThan gives true if array is the legth of given number', (t) => {
  t.truthy(arrayShorterEqualThan(5, Array(5)));
});

test('function arrayShorterEqualThan gives false if array bigger than given number', (t) => {
  t.falsy(arrayShorterEqualThan(5, Array(7)));
});

/* Is item index less than */
test('function isItemIndexLessThan throws an error if first of given arguments is not a number', (t) => {
  const error = t.throws(
    () => {
      isItemIndexLessThan('' as unknown as number, 1);
    },
    { instanceOf: Error }
  );

  t.is(error.message, 'Either num or index are not numbers!');
});

test('function isItemIndexLessThan throws an error if second of given arguments is not a number', (t) => {
  const error = t.throws(
    () => {
      isItemIndexLessThan(1, '' as unknown as number);
    },
    { instanceOf: Error }
  );

  t.is(error.message, 'Either num or index are not numbers!');
});

test('function isItemIndexLessThan throws an error if first of given arguments is a NaN', (t) => {
  const error = t.throws(
    () => {
      isItemIndexLessThan(Number.NaN, 1);
    },
    { instanceOf: Error }
  );

  t.is(error.message, 'Either num or index are not numbers!');
});

test('function isItemIndexLessThan throws an error if second of given arguments is a NaN', (t) => {
  const error = t.throws(
    () => {
      isItemIndexLessThan(1, Number.NaN);
    },
    { instanceOf: Error }
  );

  t.is(error.message, 'Either num or index are not numbers!');
});

test('function isItemIndexLessThan is truthy if index is less than given number', (t) => {
  t.truthy(isItemIndexLessThan(5, 3));
});

test('function isItemIndexLessThan is falsy if index is equal given number', (t) => {
  t.falsy(isItemIndexLessThan(5, 5));
});

test('function isItemIndexLessThan is falsy if index greater than given number', (t) => {
  t.falsy(isItemIndexLessThan(5, 7));
});

/* Get order */
test('function getOrder is taken from title if includes hash', (t) => {
  const order = getOrder({ id: 1, Title: '2#test' } as Category);
  t.is(order, 2);
});

test('function getOrder is taken from order if title is NaN', (t) => {
  const order = getOrder({ id: 12, Title: 'test' } as Category);
  t.is(order, 12);
});

test('function getOrder is taken from title if consists of number only', (t) => {
  const order = getOrder({ id: 4, Title: '23' } as Category);
  t.is(order, 23);
});

/* Get order */
test('function isOrderedByHash is truthy if given category Title contains #', (t) => {
  const category = { Title: '2#test' } as Category;
  t.truthy(isOrderedByHash(category));
});

test('function isOrderedByHash is falsy if given category Title does not contain #', (t) => {
  const category = { Title: '11111test' } as Category;
  t.falsy(isOrderedByHash(category));
});
