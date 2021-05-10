# Timer-tools

Timers utils. In case you don't want to mess with `setTimeout` yourself.

## Install

```sh
npm install timer-tools
```

## Functions

### Wait

Wait time.

```js
const { wait } = require("timer-tools");

(async () => {
  console.log("Time before", new Date());
  await wait(1000);
  console.log("Time after", new Date());
})();
```

### waitInfinity (waitIndefinitely)

Wait indefinitely.

```js
const { waitInfinity } = require("timer-tools");

(async () => {
  await waitInfinity();
  console.log("this code will never be executed");
})();
```

### waitUntil

Wait until the condition is met (can't stop it manually).

```js
const { waitUntil } = require("timer-tools");

(async () => {
  const currentTime = +new Date();
  await waitUntil(() => +new Date() - currentTime > 1000, 50);
  console.log("End");
})();
```

```js
const { waitUntil } = require("timer-tools");

(async () => {
  try {
    await waitUntil(
      () => {
        return false;
      },
      1000, // waiting between executions
      5 // max tries
    );
  } catch (e) {
    console.warn(
      "the comparison went through 5 times and caused an exceeded execution attempt exception"
    );
  }
})();
```

### setIntervalAsync

Execute the specified asynchronous function at the specified interval and limiting the maximum number of calls.

```js
const { setIntervalAsync } = require("timer-tools");

setIntervalAsync(
  () => {
    console.log(new Date());
  },
  1000, // time between executions
  5 // max count of executions
);
```
