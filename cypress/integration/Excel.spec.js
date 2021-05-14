const { parse } = require("node-xlsx");
let jsonData;
//npm install node-xlsx --save-dev
before("Does not do much!", function () {
  cy.parseXlsx("cypress/data/En_It title test.xlsx").then((json) => {
    jsonData = json;
  });
});
describe("ENGLISH", function () {
  for (let i = 1; i < 4823; i++) {
    // for (let i = 1; i < 8; i++) {
    it("Does not do much!", function () {
      var title = jsonData[1].data[i][9];
      var url = jsonData[1].data[i][0];
      url = url
        .toString()
        .replace(
          "https://www.immoscout24.ch",
          "https://web-int-00.immoscout24.ch"
        );
      cy.request(url).then(({ body }) => {
        body = body.substring(
          body.search("<title"),
          body.search("</title>") + 8
        );
        // expect(body).to.contains("<title");
        expect(body).to.contains(title);
      });
    });
  }
});
