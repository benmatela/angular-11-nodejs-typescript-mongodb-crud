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

    it("should not create a new employee when required fields are missing", (done) => {
      const newEmployee = {
        firstName: "John",
        lastName: "Doe",
        address: `{streetAddress":"34 Bishop Square","city":"Cape Town","postalCode":7925,"country":"South Africa"}`,
        skills: `[{"skill":"C#","yearsOfExperience":4,"seniorityRating":"Intermediate"}]`,
      };

      request(app.httpServer)
        .post("/api/v1/employee/create")
        .send(newEmployee)
        .expect(500)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee> = res.body;
          expect(responseWrapper.success).to.be.false;
          expect(responseWrapper.error).to.not.equal("");
          expect(responseWrapper.status).to.be.equal(500);
          expect(responseWrapper.data).to.be.a("object");
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("FIND employees", () => {
    it("should return a list of employees", (done) => {
      request(app.httpServer)
        .get("/api/v1/employee/list")
        .expect(200)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee[]> = res.body;
          expect(responseWrapper.success).to.be.true;
          expect(responseWrapper.error).to.be.equal("");
          expect(responseWrapper.status).to.be.equal(200);
          expect(responseWrapper.data).to.be.a("array");
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("PUT employee", () => {
    it("should update an employee", (done) => {
      const employeeToUpdate = {
        _id: employeeId,
        firstName: "Jane",
        lastName: "Doe",
        contactNumber: "0757678789",
        emailAddress: "jane@gmail.com",
        dateOfBirth: "1997-06-23",
        address: `{streetAddress":"34 Bishop Square","city":"Cape Town","postalCode":7925,"country":"South Africa"}`,
        skills: `[{"skill":"C#","yearsOfExperience":0,"seniorityRating":"Intermediate"}]`,
      };

      request(app.httpServer)
        .put("/api/v1/employee/update")
        .send(employeeToUpdate)
        .expect(200)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee> = res.body;
          expect(responseWrapper.success).to.be.true;
          expect(responseWrapper.error).to.be.equal("");
          expect(responseWrapper.status).to.be.equal(200);
          expect(responseWrapper.data).to.be.a("object");
          expect(responseWrapper.data.firstName).to.equal("Jane");
          expect(responseWrapper.data.emailAddress).to.equal("jane@gmail.com");
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("DELETE employee", () => {
    it("should delete an employee", (done) => {
      request(app.httpServer)
        .delete(`/api/v1/employee/remove?employeeId=${employeeId}`)
        .expect(200)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee> = res.body;
          expect(responseWrapper.success).to.be.true;
          expect(responseWrapper.error).to.be.equal("");
          expect(responseWrapper.status).to.be.equal(200);
          expect(responseWrapper.data).to.be.a("object");
          done();
        })
        .catch((err) => done(err));
    });
  });
});
