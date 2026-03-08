# Contributing

Everyone that wants to contribute to the project should read this document.

## Bug Reports

If you're reporting a bug it's most helpful if you include steps to reproduce the issue. Include the following:

* Node version

## Pull Requests

If you plan on submitting a pull request and you want to develop your contribution locally you can setup your local
environment using the steps below.

### Setup Development Environment

This project uses [npm](https://www.npmjs.com). After cloning this repo install `npm` and then run the following before
working on your code change:

```bash
make deps  # Installs project dependencies.
make test  # Runs unit tests.
make lint  # Runs linters.
```

To see all available commands with their descriptions just run:

```bash
make
```

## Releases

These are the steps a maintainer will take to make a new release.

To make a new release:

1. https://github.com/Robpol86/Bookmarklet-Template/releases
1. Draft a new release
1. Tag > Create new tag > `vX.X.X`
1. Set the release title
1. Generate release notes
1. Publish release

CI will then run and upload assets and append the bookmarklet to the release notes automatically.

## Thank You!

Thanks for fixing bugs or adding features to the project!
