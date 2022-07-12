import "mocha";
import { expect } from "chai";
import request from "supertest";

import app from "../src/server";
import { IResponseWrapper } from "../src/models/interface/response-wrapper.interface";
import IEmployee from "../src/models/interface/employee.interface";

describe("EmployeeController", () => {
//   describe("POST employee", () => {
//     it("should create a new employee with all required fields", (done) => {
//       const newEmployee = {
//         firstName: "John",
//         lastName: "Doe",
//         contactNumber: "0757678789",
//         emailAddress: "jdoe@gmail.com",
//         dateOfBirth: "1997-06-23",
//         address: `{streetAddress":"34 Bishop Square","city":"Cape Town","postalCode":7925,"country":"South Africa"}`,
//         skills: `[{"skill":"C#","yearsOfExperience":0,"seniorityRating":"Intermediate"}]`,
//       };
//       request(app.httpServer)
//         .post("/api/v1/employee/create")
//         .send(newEmployee)
//         .expect(201)
//         .then((res) => {
//           const responseWrapper: IResponseWrapper<IEmployee> = res.body;
//           expect(responseWrapper.success).to.be.true;
//           expect(responseWrapper.error).to.be.equal('');
//           expect(responseWrapper.status).to.be.equal(201);
//           expect(responseWrapper.data._id).to.be.length(6);
//           done();
//         })
//         .catch((err) => done(err));
//     });

//     it("should not create a new employee when required fields are missing", (done) => {
//       const newEmployee = {
//         firstName: "John",
//         lastName: "Doe",
//         address: `{streetAddress":"34 Bishop Square","city":"Cape Town","postalCode":7925,"country":"South Africa"}`,
//         skills: `[{"skill":"C#","yearsOfExperience":2,"seniorityRating":"Intermediate"}]`,
//       };
//       request(app.httpServer)
//         .post("/api/v1/employee/create")
//         .send(newEmployee)
//         .expect(500)
//         .then((res) => {
//           const responseWrapper: IResponseWrapper<IEmployee> = res.body;
//           expect(responseWrapper.success).to.be.false;
//           expect(responseWrapper.error).to.not.equal("");
//           expect(responseWrapper.status).to.be.equal(500);
//           expect(responseWrapper.data).to.be.eql({});
//           done();
//         })
//         .catch((err) => done(err));
//     });
//   });

  describe("LIST employees", () => {
    it("should return a list of employees", (done) => {
      request(app.httpServer)
        .get("/api/v1/employee/list")
        .expect(200)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee[]> = res.body;
          expect(responseWrapper.success).to.be.true;
          expect(responseWrapper.error).to.be.equal("");
          expect(responseWrapper.status).to.be.equal(200);
          expect(responseWrapper.data.length).to.be.greaterThanOrEqual(0);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
