// Tests for specials.js. Run them with: node --test
// They run your program once and read each line it prints, such as "1) Pumpkin Spice Latte: $5.25".
// You don't need to change this file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const program = fileURLToPath(new URL('./specials.js', import.meta.url));
const run = spawnSync(process.execPath, [program], { encoding: 'utf8' });
const printed = run.stdout.split(/\r?\n/).filter((line) => line.trim() !== '');

// "1) Pumpkin Spice Latte: $5.25" -> answers.get("1") is "$5.25": everything after the last ": ".
const answers = new Map();
for (const line of printed) {
  const close = line.indexOf(')');
  const colon = line.lastIndexOf(': ');
  if (close > 0 && colon > close) answers.set(line.slice(0, close).trim(), line.slice(colon + 2).trim());
}

// The first lines of the error, if the program stopped with one: where it is, and its name and message.
function errorReport() {
  const lines = run.stderr.split(/\r?\n/);
  const named = lines.find((line) => /^\w*Error/.test(line)) ?? lines[0];
  return `${lines[0]}\n${named}`;
}

function programRuns() {
  assert.equal(run.status, 0,
    `specials.js stopped with an error. Run node specials.js in the terminal and read the message:\n${errorReport()}`);
}

function answer(problem) {
  programRuns();
  assert.ok(answers.has(String(problem)),
    `Problem ${problem} printed nothing. Print a line like: ${problem}) Item name: value`);
  return answers.get(String(problem));
}

function expect(problem, value) {
  const actual = answer(problem);
  assert.equal(actual, value, `Problem ${problem}: the chalkboard should show ${value} after the ": ", but it shows ${actual}.`);
}

test('the program runs without an error', () => programRuns());

test('problem 1: Pumpkin Spice Latte', () => expect(1, '$5.25'));
test('problem 2: Maple Cold Brew', () => expect(2, '$4.95'));
test('problem 3: Hot Chocolate', () => expect(3, '$3.75'));
test('problem 4: Blueberry Muffin', () => expect(4, '$3.25'));
test('problem 5: Breakfast Burrito', () => expect(5, '$6.75'));
test('problem 6: the soup of the day', () => expect(6, 'Tomato Basil'));
test('problem 7: the pastry of the day, fixed', () => expect(7, 'Cinnamon Roll'));

test('problem 8: the banana bread is a comment, not deleted', () => {
  programRuns();
  assert.ok(!answers.has('8'), 'Problem 8: the banana bread sold out, so its line should not print. Turn it into a comment.');
  const source = readFileSync(program, 'utf8');
  assert.ok(/^\s*\/\/.*Banana Bread/m.test(source) || /\/\*(?:(?!\*\/)[^])*Banana Bread/.test(source),
    'Problem 8: keep the banana bread line in the file, as a comment, for tomorrow.');
});

test('problem 9: happy hour', () => expect(9, '2 PM to 4 PM'));

test('the lines print in the order of the chalkboard', () => {
  programRuns();
  const order = ['i', 'ii', '1', '2', '3', '4', '5', '6', '7', '9'];
  const numbers = [...answers.keys()].filter((number) => order.includes(number));
  assert.deepEqual(numbers, order.filter((number) => answers.has(number)),
    'The lines should print in the same order as the problems in specials.js.');
  assert.equal(numbers.length, order.length, 'Print every line of the chalkboard: the two examples, then 1 to 7 and 9.');
});
