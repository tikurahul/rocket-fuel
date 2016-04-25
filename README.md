## Rocket Fuel

Here is a Chrome Omnibox extension that helps navigate to well known URLs.

Open a New Tab, and type `go`+`TAB` in the Omnibar, which activates the extension. Type the short name used and navigate. The extension <i>also</i> provides suggestions as you type. Once you have entered the `short` keyword followed by the `ENTER` key, you will be navigated to the fully qualified URL.

#### Technologies used
* Material UI
* React
* Chrome Extension Omnibox APIs and Chrome Sync

## Development

```bash
npm install
npm install -g browserify
npm install -g watchify
npm start
npm run-script background
```

## Building

```bash
npm run-script build
```
