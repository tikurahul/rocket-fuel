const Logger = require('./logger');

const Preferences = {};
const PREFIX = 'KEY';
const SEP = '|';

const keyName = (short) => `${PREFIX}${SEP}${short}`

const removePreference = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(key, () => {
      resolve(true);
    });
  });
};

const setPreferences = (pairs) => {
  return new Promise((resolve, reject) => {
    const preferences = {};
    pairs.forEach(item => {
      const key = keyName(item.short);
      preferences[key] = item;
    });
    chrome.storage.sync.set(preferences, () => {
      resolve(true);
    });
  });
};

const getPreference = (key, defaultValue) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({key: defaultValue}, (item) => {
      resolve(item[key]);
    })
  });
};

const getAllPreferences = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null /* gets everything */, (item) => {
      const prefixed = Object.keys(item);
      const items = prefixed.map(key => item[key]);
      resolve(items);
    });
  });
};

const matchPreference = (fragment, property) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null /* gets everything */, (item) => {
      // all keys
      const prefixed = Object.keys(item);
      const itemProps = prefixed.filter(key => item[key][property]);
      const filtered = itemProps.filter(key => key.indexOf(fragment) >= 0);
      const items = filtered.map(key => item[key]);
      resolve(items);
    });
  });
};

const clear = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.clear(() => {
      resolve(true);
    });
  });
};

Preferences.addMultiple = (...pairs) => {
  return setPreferences(...pairs);
};

Preferences.add = (short, full) => {
  const pairs = [
    {short: short, full: full}
  ];
  return Preferences.addMultiple(pairs);
};

Preferences.remove = (short) => {
  return removePreference(keyName(short));
};

Preferences.match = (fragment) => {
  return matchPreference(fragment, 'short');
};

Preferences.get = (short, defaultValue) => {
  return getPreference(keyName(short), defaultValue);
}

Preferences.all = () => {
  return getAllPreferences();
};

Preferences.clear = () => clear();

module.exports = Preferences;
