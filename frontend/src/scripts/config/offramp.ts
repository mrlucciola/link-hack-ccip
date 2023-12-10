// Define the type for the message execution states
type MessageExecutionState = {
  [key: number]: string;
};

const messageExecutionState: MessageExecutionState = {
  0: "UNTOUCHED",
  1: "IN_PROGRESS",
  2: "SUCCESS",
  3: "FAILURE",
};

// Define the type for the status parameter
const getMessageState = (status: number): string => {
  if (status in messageExecutionState) {
    return messageExecutionState[status];
  }
  return "unknown";
};

export { getMessageState };
