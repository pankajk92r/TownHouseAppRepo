# global-packages

[![Build Status](https://travis-ci.org/leo/global-packages.svg?branch=master)](https://travis-ci.org/leo/global-packages)

List global node packages easily.

## Usage

Simply install the package...

```bash
$ npm install --save global-packages
```

...and load it:

```js
import globalPackages from 'global-packages'

let packages

try {
  packages = await globalPackages()
} catch (err) {
  console.error(err)
  return
}

console.log(packages) // ['npm', ...]
```

## Contribute

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Link the package to the global module directory: `npm link`
3. Transpile the source code and watch for changes: `npm start`
4. Within the module you want to test your local development instance of global-packages, just link it to the dependencies: `npm link global-packages` and require it!
