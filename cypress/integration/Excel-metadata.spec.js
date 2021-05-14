const { parse } = require("node-xlsx");
let jsonData;
//npm install node-xlsx --save-dev
before("Does not do much!", function () {
  cy.parseXlsx("cypress/data/FR-meta-description-test.xlsx").then((json) => {
    jsonData = json;
  });
});
describe("ENGLISH", function () {
  for (let i = 1; i < 3111; i++) {
    // for (let i = 1; i < 8; i++) {
    it("Does not do much!", function () {
      var title = jsonData[0].data[i][2];
      var url = jsonData[0].data[i][0];
      url = url
        .toString()
        .replace(
          "https://www.immoscout24.ch",
          "https://web-int-05.immoscout24.ch"
        );
      cy.request(url).then(({ body }) => {
        body = body.substring(
          body.search(`<head>`),
          body.search(`</head>`) + 21
        );
        // let subBody2 = body.substring(
        //   body.search(`<meta data-rh="" property="og:description" content="`),
        //   body.search(`" data-reactroot=""/>`) + 21
        // );
        // expect(body).to.contains("<title");
        expect(body).to.contains(
          `<meta data-rh="" name="description" content="` +
            title +
            `" data-reactroot=""/>`
        );
        // expect(subBody2).to.contains(
        //   `<meta data-rh="" property="og:description" content="` +
        //     title +
        //     `" data-reactroot=""/>`
        // );
      });
    });
  }
});
