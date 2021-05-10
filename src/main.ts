/**
 * Wait time
 * @param time - waiting time (ms)
 */
export const wait = (time: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, time);
  });
};

/**
 * Wait indefinitely
 */
export const waitInfinity = (): Promise<void> => {
  return new Promise(() => undefined);
};

/**
 * Wait indefinitely
 */
export const waitIndefinitely = waitInfinity;

/**
 * Wait until the condition is met (can't stop it manually)
 * @param conditionalFunc - condition checking function
 * @param checkInterval - timeout between checks (ms)
 * @param maxTries - limit of maximum executions (0 - for no limit)
 */
export const waitUntil = (
  conditionalFunc: () => boolean | Promise<boolean>,
  checkInterval = 1000,
  maxTries = 0
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    let counter = 0;
    const check = async () => {
      const checkResult = await conditionalFunc();
      counter += 1;
      if (maxTries > 0 && counter >= maxTries) {
        return reject();
      }
      if (checkResult) {
        return resolve();
      }
      setTimeout(check, checkInterval);
    };

    setTimeout(check, checkInterval);
  });
};

/**
 * Execute the specified asynchronous function at the specified interval and limiting the maximum number of calls
 * @param func - function performed
 * @param intervalTime - time interval between executions (ms)
 * @param numberOfExecutions - maximum number of executions (0 - for no limit)
 */
export const setIntervalAsync = (
  func: (...args: unknown[]) => unknown,
  intervalTime: number,
  numberOfExecutions = 0
): (() => void) => {
  let counter = 0;
  let currentTimoutId: ReturnType<typeof setTimeout>;
  const exec = async (): Promise<void> => {
    await func();
    counter += 1;

    if (numberOfExecutions > 0 && counter >= numberOfExecutions) {
      return;
    }
    currentTimoutId = setTimeout(exec, intervalTime);
  };
  currentTimoutId = setTimeout(exec, intervalTime);

  return () => {
    clearTimeout(currentTimoutId);
  };
};
