# EmployeeAPI

# Environment variables
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|MONGO_AUTH_SOURCE           | Mongo DB value            | "employeedb"      |
|MONGO_TABLE_NAME           | Mongo DB value            | "employeedb"      |
|MONGO_HOST_NAME           | Mongo DB value            | 0.0.0.0      |
|MONGO_PORT           | Mongo DB value            | 27017"     |
|MONGO_DB_USER           | Mongo DB value            | "dbuser"      |
|MONGO_DB_USER_PASSWORD           | Mongo DB value            | "testing"      |
|NODE_ENV           | Node server value            | "development"      |
|SERVER_PORT           | Node server value            | 3000      |
|SERVER_HOSTNAME           | Node server value            | "testing"      |
|CORS           | Node server value            | "http://localhost:4200"      |

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) v16.13.1


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm run start:dev
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **src/endpoints**      | Insomia call examples 
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **src/controllers**      | Controllers define functions to serve various express routes. 
| **src/services**      | Services define functions to serve controllers. 
| **src/util**              | Common libraries and configurations to be used across your app.  
| **src/util**/config.ts              | Initializes environment variables.  
| **src/util**/logging.ts              | Creates logging for the app.  
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from 
| **src**/server.ts         | Entry point to express app                                                               |
| **tests**/         | Tests for the app           
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    

## Building the project
### Configuring TypeScript compilation
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "lib": [
    "es2015"
  ],
  "exclude": [
    "./tests/",
    "./node_modules/",
    "./dist/"
  ],
  "ts-node": {
    "transpileOnly": true
  }
}
```

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
|
| `build`                   | Full build. Runs ALL build tasks with all watch tasks        |
| `dev`                   | Runs full build before starting all watch tasks. Can be invoked with `npm run start:dev`                                         |
| `prod`                   | Runs the production version of the project `npm run start:prod`   
| `test`                    | Runs build and run tests using mocha        |  `npm run test`

## Testing
The tests are  written in Mocha and the assertions done using Chai

```
"@types/supertest": "^2.0.12",
"chai": "^4.3.6",
"mocha": "^9.2.2",
"@types/chai": "^4.3.0",
"@types/mocha": "^9.1.0"
```

### Example application.spec.ts
```
import "mocha";
import { expect } from "chai";

import helpers from '../src/util/helpers';
import { Characters } from "../src/models/enums/characters.enum";

describe("UtilHelpers", () => {
  describe("RandomGenerator", () => {
    it("should generate 2 random uppercased letters", () => {
        const letters = helpers.randomGenerator(2, Characters.ALPHABETS);
        expect(letters).to.be.a('string');
        expect(letters.length).to.be.equal(2);
        expect(letters).to.be.equal(letters.toUpperCase());
    });

    it("should generate 4 random numbers", () => {
        const numbers = helpers.randomGenerator(4, Characters.NUMBERS);
        expect(Number(numbers)).to.be.a('number');
        expect(numbers.length).to.be.equal(4);
    });
  });
});
```

### Running tests using NPM Scripts
````
npm run test
````