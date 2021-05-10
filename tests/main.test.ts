import { setIntervalAsync, wait, waitUntil } from "../src/main";

test("wait ", async () => {
  const beforeTime = +new Date();
  await wait(300);
  const afterTime = +new Date();

  expect(afterTime - beforeTime).toBeGreaterThan(300);
});

test("waitUntil", async () => {
  const beforeTime = +new Date();
  let counter = 0;
  const triggerFunc = jest.fn();
  await waitUntil(() => {
    counter += 1;
    triggerFunc();
    return counter === 3;
  }, 100);

  const afterTime = +new Date();

  expect(triggerFunc).toHaveBeenCalledTimes(3);
  expect(afterTime - beforeTime).toBeGreaterThan(300);
});

test("waitUntil maxTries", async () => {
  const triggerFunc = jest.fn();
  const exceptionFunc = jest.fn();
  try {
    await waitUntil(
      () => {
        triggerFunc();
        return false;
      },
      100,
      3
    );
  } catch (e) {
    exceptionFunc();
  }

  expect(exceptionFunc).toHaveBeenCalledTimes(1);
  expect(triggerFunc).toHaveBeenCalledTimes(3);
});

test("setIntervalAsync", async () => {
  const beforeTime = +new Date();

  const triggerFunc = jest.fn();
  setIntervalAsync(triggerFunc, 100, 5);

  await wait(1000);

  const afterTime = +new Date();

  expect(triggerFunc).toHaveBeenCalledTimes(5);
  expect(afterTime - beforeTime).toBeGreaterThan(1000);
});

test("setIntervalAsync clearTimer", async () => {
  const triggerFunc = jest.fn();
  const clearTimer = setIntervalAsync(triggerFunc, 200);

  await wait(700);

  clearTimer();

  expect(triggerFunc).toHaveBeenCalledTimes(3);
});
