import * as env from "./env";
import * as router from "./router";
import * as offramp from "./offramp";

// Override console.log to disable ethersjs warning when there are duplicates in ABI
const oldLog = console.log;

const log = (...args: any[]) => {
  const msg: string = args.length > 0 ? args[0] : "";

  if (/Duplicate definition of/.test(msg)) {
    return;
  }

  oldLog(...args); // This will pass all the arguments to the original console.log function
};

console.log = log;

export * as router from "./router";
export * as env from "./env";
export * as offramp from "./offramp";
