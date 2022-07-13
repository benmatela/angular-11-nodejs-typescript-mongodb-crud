# EmployeeUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

# Environment variables
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|production           | Angular environment value            | "production"      |
|employeeAPI           | API endpoint value            | "http://0.0.0.0:3000/api/v1/employee"      |

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) v16.13.1


### How it works:

* Create, find, update and delete an employee
* The page will show a list of employees(if any) or you can hit the 'Create New Employee' button to add an employee.
* To edit/remove an employee, simply click on the employee from the list

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
npm start
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **e2e**                 | Contains required tools to run end to end tests.  |
| **src/app/employee**      | Contains all components required for Employee CRUD 
| **src/app/employee/shared**      | Contains all dependecies used across the Employee CRUD operations 
| **node_modules**         | Contains all  npm dependencies                                                            |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    
| tslint.json              | Config settings for TSLint code style checking                       

## Development server
Run `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Example application.spec.ts
```
import "mocha";
import { expect } from "chai";
import request from "supertest";

import app from "../src/server";
import { IResponseWrapper } from "../src/models/interface/response-wrapper.interface";
import IEmployee from "../src/models/interface/employee.interface";

let employeeId = "";

describe("EmployeeController", () => {
  describe("POST employee", () => {
    it("should create a new employee with all required fields", (done) => {
      const newEmployee = {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "0757678789",
        emailAddress: "jdoe@gmail.com",
        dateOfBirth: "1997-06-23",
        address: `{streetAddress":"34 Bishop Square","city":"Cape Town","postalCode":7925,"country":"South Africa"}`,
        skills: `[{"skill":"C#","yearsOfExperience":4,"seniorityRating":"Intermediate"}]`,
      };

      request(app.httpServer)
        .post("/api/v1/employee/create")
        .send(newEmployee)
        .expect(201)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee> = res.body;
          expect(responseWrapper.success).to.be.true;
          expect(responseWrapper.error).to.be.equal("");
          expect(responseWrapper.status).to.be.equal(201);
          expect(responseWrapper.data).to.be.a("object");
          expect(responseWrapper.data._id.length).to.be.equal(6);
          employeeId = responseWrapper.data._id;
          done();
        })
        .catch((err) => done(err));
    });
}
```

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

