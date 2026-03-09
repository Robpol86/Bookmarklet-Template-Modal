# ![Logo](icons/favicon.png?raw=true "Logo") Bookmarklet-Template-Modal

Bookmarklet-Template-Modal is an example git repo that includes unit tests, linting, multiple modules (source files), and a
compiler that compiles all modules into a single JavaScript [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE).
This is how I structure all my one-off [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet).

<table>
    <tr>
        <td width="50%">
            <div align="center">
                <img src="used-in-chrome-macos.png" alt="Used in Chrome on macOS" />
                <em>Used in Chrome on macOS</em>
            </div>
        </td>
        <td width="50%">
            <div align="center">
                <img src="used-in-firefox-macos.png" alt="Used in Firefox on macOS" />
                <em>Used in Firefox on macOS</em>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <div align="center">
                <img src="used-in-safari-macos.png" alt="Used in Safari on macOS" />
                <em>Used in Safari on macOS</em>
            </div>
        </td>
        <td>
            <div align="center">
                <img src="used-in-edge-win11.png" alt="Used in Edge on Windows 11" />
                <em>Used in Edge on Windows 11</em>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <div align="center">
                <img src="used-in-chrome-iphone.png" alt="Used in Chrome on iPhone" />
                <em>Used in Chrome on iPhone</em>
            </div>
        </td>
        <td>
            <div align="center">
                <img src="used-in-safari-iphone.png" alt="Used in Safari on iPhone" />
                <em>Used in Safari on iPhone</em>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <div align="center">
                <img src="used-in-chrome-android.png" alt="Used in Chrome on Android" />
                <em>Used in Chrome on Android</em>
            </div>
        </td>
        <td>
            <div align="center">
                <img src="used-in-firefox-android.png" alt="Used in Firefox on Android" />
                <em>Used in Firefox on Android</em>
            </div>
        </td>
    </tr>
</table>

## Features

Some features I've included in this project are:

* The project's source files are written in
  [JavaScript module files](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (*.mjs)
* The project is "compiled" into an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) `javascript:...` "URL"
  using [Terser](https://Terser.org/) and [rollup](https://rollupjs.org/)
    * Terser also minifies the JavaScript
    * The IIFE ensures your bookmarklet code won't conflict with a webpage's code, whilst still giving you access to the
      `document` and `window` objects
* Tests are written for [jest](https://jestjs.io/) and [eslint](https://eslint.org/) is used for linting
* An importable bookmarks HTML file is generated with a favicon for Chrome and Edge so users of those browsers can see an
  icon for your bookmarklet

## Directory Structure

```gap
├─ src/               # All bookmarklet code goes in this directory
│  ├─ main.mjs        # Main file to place your code in
│  ├─ log.mjs         # Example of how to split complex code into multiple files
│  └─ entrypoint.mjs  # Tells Terser what to include in the output bookmarklet
│
├─ icons/
│  └─ favicon.png
│
├─ tests/          # Tests are grouped by the file being tested
│  └─ log.test.js
│
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ release.yml  # Automatically adds compiled JS/HTML files to releases
│
├─ eslint.config.mjs
├─ jest.config.mjs
├─ jest.setup.mjs
└─ rollup.config.mjs  # "Compiler" configuration
```

## Development

For more information on developing a bookmarklet using this repo as a template read the [CONTRIBUTING.md](CONTRIBUTING.md)
document.

## Install

There are three ways to install the bookmarklet.

### Import Bookmarks HTML Method

![Screenshot](install-html.png?raw=true "Screenshot")

The best way to install this bookmarklet for **Chrome** and **Edge** is to import the bookmarks HTML file. This way the
bookmarklet will have a favicon. Unfortunately the favicon doesn't show in other browsers.

1. Download the latest `bookmarklet.html` from the [releases section](https://github.com/Robpol86/Bookmarklet-Template-Modal/releases)
1. Import in Chrome:
    1. In Chrome go to Bookmarks > Bookmark Manager
    1. Click on the three dots in the upper right corner and click "Import bookmarks"
    1. Select the downloaded `bookmarklet.html`
    1. You'll see a new folder "Imported" in your bookmarks bar with the bookmarklet inside
1. Import in Firefox:
    1. In Firefox go to Bookmarks > Manage Bookmarks
    1. In the Library window click on the import/backup button (up and down arrows) then Import Bookmarks from HTML
    1. Select the downloaded `bookmarklet.html`
    1. Locate **Bookmarklet-Template-Modal** in the Bookmarks Menu folder
1. Import in Safari:
    1. In Safari go to File > Import Browsing Data from File or Folder > Choose File or Folder
    1. Select the downloaded `bookmarklet.html`
    1. Locate **Bookmarklet-Template-Modal** in your bookmarks

### Copy and Paste Method

This method doesn't require importing, you just copy and paste the javascript "URL" into a new bookmark manually.

1. Download the latest `bookmarklet.js` from the [releases section](https://github.com/Robpol86/Bookmarklet-Template-Modal/releases)
1. Copy the contents of `bookmarklet.js` to your clipboard
1. In Chrome:
    1. In Chrome go to Bookmarks > Bookmark Manager
    1. Click on the three dots in the upper right corner and click "Add new bookmark"
    1. Type **Bookmarklet-Template-Modal** for the name and paste the contents of `bookmarklet.js` into the URL field
1. In Firefox:
    1. In Firefox go to Bookmarks > Manage Bookmarks
    1. In the Library window click on the organize button (gear icon) then click "Add Bookmark"
    1. Type **Bookmarklet-Template-Modal** for the name and paste the contents of `bookmarklet.js` into the URL field

### Drag and Drop Method

*This method doesn't work from a GitHub readme.*

## Usage

Go to any website and click on the bookmarklet in the bookmarks bar (or wherever you've placed it). You should get an alert
that says "Hello World".

## TODO

- Mention based on Lucas Menezes's post: https://dev.to/lucasm/amazing-native-modal-with-just-html-meet-element-4jpl
- Unit tests for modal.mjs and utils.mjs
- Revisit dir structure section
- Revisit entire README
- New screenshots
