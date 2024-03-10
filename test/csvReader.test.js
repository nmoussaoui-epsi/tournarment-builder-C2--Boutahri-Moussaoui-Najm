import fs from "fs";
import csv from "csv-parser";
import { expect } from "chai";
import sinon from "sinon";

import CSVReader from "../src/csvReader";

describe("CSVReader", () => {
  let csvReader;
  const filePath = "test.csv";

  beforeEach(() => {
    csvReader = new CSVReader(filePath);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("constructor", () => {
    it("should set the filePath property correctly", () => {
      expect(csvReader.filePath).to.equal(filePath);
    });

    it("should initialize the data property as an empty array", () => {
      expect(csvReader.data).to.be.an("array").that.is.empty;
    });
  });

  describe("readCSV", () => {
    it("should resolve with the parsed CSV data", async () => {
      const data = [
        { name: "John", age: "25" },
        { name: "Jane", age: "30" },
      ];

      const createReadStreamStub = sinon.stub(fs, "createReadStream").returnsThis();
      const pipeStub = sinon.stub().returnsThis();
      const onStub = sinon.stub();

      createReadStreamStub.returns({ pipe: pipeStub });
      pipeStub.returns({ on: onStub });
      onStub.withArgs("data").callsArgWith(1, data[0]);
      onStub.withArgs("data").callsArgWith(1, data[1]);
      onStub.withArgs("end").callsArg(1);

      const result = await csvReader.readCSV();

      expect(result).to.deep.equal(data);
      expect(createReadStreamStub.calledOnceWithExactly(filePath)).to.be.true;
      expect(pipeStub.calledOnceWithExactly(csv())).to.be.true;
      expect(onStub.calledWith("data")).to.be.true;
      expect(onStub.calledWith("end")).to.be.true;
      expect(onStub.calledWith("error")).to.be.false;
    });

    it("should reject with an error if there is an error reading the CSV file", async () => {
      const error = new Error("Failed to read CSV file");

      const createReadStreamStub = sinon.stub(fs, "createReadStream").returnsThis();
      const pipeStub = sinon.stub().returnsThis();
      const onStub = sinon.stub();

      createReadStreamStub.returns({ pipe: pipeStub });
      pipeStub.returns({ on: onStub });
      onStub.withArgs("error").callsArgWith(1, error);

      try {
        await csvReader.readCSV();
        expect.fail("Expected an error to be thrown");
      } catch (err) {
        expect(err).to.equal(error);
        expect(createReadStreamStub.calledOnceWithExactly(filePath)).to.be.true;
        expect(pipeStub.calledOnceWithExactly(csv())).to.be.true;
        expect(onStub.calledWith("data")).to.be.false;
        expect(onStub.calledWith("end")).to.be.false;
        expect(onStub.calledWith("error")).to.be.true;
      }
    });
  });
});
