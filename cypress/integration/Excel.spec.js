//npm install node-xlsx --save-dev
let title;
describe("My First Test", function () {
  it("Does not do much!", function () {
    cy.parseXlsx("cypress/data/data.xlsx").then((jsonData) => {
      // finally we write the assertion rule to check if that data matches the data we expected the excel file to have.
      cy.log(jsonData[0].data[1][1]);
    });
  });
});
