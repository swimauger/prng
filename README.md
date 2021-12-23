# PRNG (Pseudo Random Number Generator)
## A Collection of PRNG's in JavaScript and TypeScript

> This library is a wrapper around all implementations of the PRNG's made by @bryc found in https://github.com/bryc/code/blob/master/jshash/PRNGs.md

### **Install**

**With NPM:**
`npm install prng@npm:@prng/core`

**With Yarn:**
`yarn add prng@npm:@prng/core`

**With PNPM:**
`pnpm install prng@npm:@prng/core`

### Create a Generator (In JavaScript)
```javascript
  const { PRNG } = require('prng'); // or import { PRNG } from 'prng' with es6 modules

  // First argument is the algorithm, i.e. - mulberry32, sfc32, jsf32, gjrand32, etc.
  const prng = PRNG.createGenerator('mulberry32', 1999);
  console.log(prng.next().value);
  console.log(prng.next().value);
```

### Create a Callback (In JavaScript)
```javascript
  const { PRNG } = require('prng'); // or import { PRNG } from 'prng' with es6 modules

  // First argument is the algorithm, i.e. - mulberry32, sfc32, jsf32, gjrand32, etc.
  const prng = PRNG.createCallback('mulberry32', 1999);
  console.log(prng());
  console.log(prng());
```
