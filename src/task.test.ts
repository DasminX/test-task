import test from 'ava';

import { CORRECT } from './correctResult';
import { INCORRECT } from './currentResult';
import { Category, getCategories } from './mockedApi';
import { categoryTree, getOrder } from './task';

/* Main task tests */
test('main task: result is as same as CORRECT', async (t) => {
  const result = await categoryTree(getCategories);

  t.deepEqual(result, CORRECT);
});

test('main task: result fails when comapred to INCORRECT', async (t) => {
  const result = await categoryTree(getCategories);

  t.notDeepEqual(result, INCORRECT);
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
