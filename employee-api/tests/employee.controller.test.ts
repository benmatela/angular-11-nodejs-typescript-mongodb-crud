import "mocha";
import { expect } from "chai";
import request from "supertest";

import httpServer from "../src/server";
import { IResponseWrapper } from "../src/models/interface/response-wrapper.interface";
import IEmployee from "../src/models/interface/employee.interface";

describe("EmployeeController", () => {
  describe("LIST employees", () => {
    it("should return response wrapper with a success status", (done) => {
      request(httpServer.httpServer)
        .get("/api/v1/employee/list")
        .expect(200)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee[]> = res.body;
          expect(responseWrapper.success).to.be.true;
          done();
        })
        .catch((err) => done(err));
    });

    it("should return response wrapper with data greater than or equal to 0", (done) => {
      request(httpServer.httpServer)
        .get("/api/v1/employee/list")
        .expect(200)
        .then((res) => {
          const responseWrapper: IResponseWrapper<IEmployee[]> = res.body;
          expect(responseWrapper.data.length).to.be.greaterThanOrEqual(0);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
