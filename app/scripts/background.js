'use strict';

const Preferences = require('./preferences');
const Logger = require('./logger');

chrome.runtime.onInstalled.addListener(details => {
  onInstalled(details);
});

const onInstalled = (details) => {
  // bootstraps well known preferences
  bootstrap();
}

const bootstrap = () => {
  Preferences.all()
    .then(results => {
      const hasResults = results && results.length > 0;
      if (!hasResults) {
        const pairs = [
          {short: 'g', full: 'https://www.google.com'},
          {short: 'c', full: 'https://calendar.google.com'},
          {short: 'inbox', full: 'https://inbox.google.com'},
          {short: 'drive', full: 'https://drive.google.com'},
          {short: 'mail', full: 'https://mail.google.com'},
          {short: 'maps', full: 'https://maps.google.com'},
          {short: 'docs', full: 'https://docs.google.com'}
        ];
        return Preferences.addMultiple(pairs).then(() => {
          Logger.log('Basic preferences bootstrapped.');
        });
      }
    });
};

const onInputChanged = (text, suggest) => {
  Preferences.match(text).then(results => {
    const suggestions = results.map(result => {
        return {
          'content': result.full,
          'description': result.full
        };
    });
    suggest(suggestions);
  });
};

const navigate = (url) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs && tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, {url: url});
    }
  });
};

const onInputEntered = (fragment) => {
  // it either matches one of the preferences
  // or is a URL
  Preferences.match(fragment)
    .then(results => {
      if (results && results.length > 0) {
        const first = results[0];
        const full = first.full;
        if (full) {
          navigate(full);
        }
      } else {
        // no matches
        // look for urls
        Preferences.all()
          .then(results => {
            const urls = results.map(item => item.full);
            debugger;
            if (urls.indexOf(fragment) >= 0) {
              navigate(fragment);
            }
          });
      }
    });
};

chrome.omnibox.onInputChanged.addListener(onInputChanged);
chrome.omnibox.onInputEntered.addListener(onInputEntered);
