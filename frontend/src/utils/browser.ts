interface Data {
  [key: string]: any;
}

export const setDataStorage = (key: string, value: any) => {
  let data: Data = {};
  data[key] = value;
  chrome.storage.local.set(data);
  console.log("value set to: ", data); //remove this line for production
};

export const getDataStorage = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
};

export const removeDataStorage = (key: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};
