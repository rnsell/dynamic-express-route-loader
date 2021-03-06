# dynamic-express-route-loader

## Quick Start

- Run `nvm use` or use node v14
- Run `npm i` to install dependencies
- Run `npm start`

## Problem To Solve

Create a module loader for Express.

Express MEAL takes a bunch of route files stored in folders and uses those folders as a prefix on the routes when registering them. The goal is that the file system structure mirrors the basic route structure.

For Example, given the following folder structure:

    /myapp/
        lions/
            routes.js
                - GET /simba
                - GET /aslan

        tigers/
            routes.js
                - GET /tony
                - GET /tigger

        bears/
            routes.js
                - GET /pooh
                - GET /baloo

The result would be the routes being configured like so:

    http://localhost:3000/lions/
        /simba/
        /aslan/

    http://localhost:3000/tigers/
        /tony/
        /tigger/

    http://localhost:3000/bears/
        /pooh/
        /baloo/

# Example 1

Consider a file named "/myapp/modules/compliance/routes.js", which exports the following Express routes:

```javascript
const router = require("express").Router();

router.get("/accounts", (req, res) => {
  res.send(`${req.path}`);
});

router.get("/assets", (req, res) => {
  res.send(`${req.path}`);
});

module.exports = router;
```

I would expect to be able to import these routes in express and wind up with an app that exposes these services:

    https://localhost/compliance/accounts
    https://localhost/compliance/assets

I would expect to be able to register them using the following construct:

```javascript
const express = require("express");
const path = require("path");
const app = express();
const loader = require("./express-meal");

const router = loader.getRouter({
  cwd: path.join(__dirname, "./modules"),
  glob: "**/*routes*.js",
});

app.use(router);
```
