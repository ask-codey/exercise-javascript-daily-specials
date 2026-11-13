# Exercise: The Daily Specials

Exercise code for the lesson **Exercise: The Daily Specials** in the JavaScript in Depth course on [ask-codey.com](https://www.ask-codey.com).

The Daily Grind, a neighborhood coffee shop, writes its specials on a chalkboard by the door every morning. You'll finish `specials.js`, a program that prints that chalkboard in the terminal with `console.log`, one line per item. Along the way you'll fix a line with a mistake in it and switch a line off with a comment. Tests check every line.

## What's here

- `specials.js`: the chalkboard program. The comments list each special; two examples at the top show the format. For you to finish.
- `specials.test.js`: tests that run your program and read what it prints. You don't need to change this file.
- `package.json`: tells Node.js how to run this folder's code and its tests. Ready to use.

## Run it

Open the folder in VS Code, then open its terminal with **Terminal > New Terminal**, and type:

```bash
node specials.js
```

The first time, it stops with an error instead of printing the board. That's expected: one line has a mistake, and fixing it is problem 7.

## Check your work

```bash
node --test
```

At first every test fails: that is expected. Each problem you solve turns its test green. A failing test's message says which problem it is and what it expected, for example *Problem 3 printed nothing. Print a line like: 3) Item name: value*.

## The rules

- Print each answer on one line: the problem number, `)`, the item's name, `: `, and its value. For example: `1) Pumpkin Spice Latte: $5.25`.
- Print the lines in the same order as the problems.
- Write prices with a dollar sign and two digits after the point, as the chalkboard does: `$5.25`.

## Tips

- Copy the shape of the two examples. Every line you write is the same pattern with different words.
- Text goes between double quotes, and every `(` needs its `)`. When the program stops, the error message names the line to look at.
- Two slashes, `//`, at the start of a line turn it into a comment: JavaScript skips it.
- Run `node specials.js` after every line or two you add, so a mistake is never far from where you're working.

## Hand it in

When it works, put your solution in a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. You don't need Git: create the repo on GitHub, choose **Add file**, then **Upload files**, and upload everything in this folder. The lesson page shows each step, and the lesson *Put Your Code on GitHub* walks through every screen.
