"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageState = void 0;
var messageExecutionState = {
    0: "UNTOUCHED",
    1: "IN_PROGRESS",
    2: "SUCCESS",
    3: "FAILURE",
};
// Define the type for the status parameter
var getMessageState = function (status) {
    if (status in messageExecutionState) {
        return messageExecutionState[status];
    }
    return "unknown";
};
exports.getMessageState = getMessageState;
