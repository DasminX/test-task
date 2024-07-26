import test from 'ava';

import { CORRECT } from './correctResult';
import { INCORRECT } from './currentResult';
import { getCategories } from './mockedApi';
import { categoryTree, determineOrder } from './task';

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
test('function determineOrder is taken from title if includes hash', (t) => {
  const order = determineOrder('2#test', 1);
  t.is(order, 2);
});

test('function determineOrder is taken from order if title is NaN', (t) => {
  const order = determineOrder('test', 12);
  t.is(order, 12);
});

test('function determineOrder is taken from title if consists of number only', (t) => {
  const order = determineOrder('23', 4);
  t.is(order, 23);
});
