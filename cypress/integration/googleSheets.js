//npm install node-xlsx --save-dev
let title;
describe("My First Test", function () {
  it("Does not do much!", function () {
    cy.request({
      method: "GET",
      url: `https://docs.google.com/spreadsheets/d/1yy30ZOOjaf7zh9hPzt65yc9D1lK4HkqCdT7Pd-jZfdE/edit?usp=sharing&ranges=A1:C1&fields=properties.title,sheets(properties,data.rowData.values(effectiveValue,effectiveFormat))`,
    }).then(($res) => {
      cy.wrap($res.body)
        .filter('[property="og:description"]')
        .then(($ele) => {
          cy.log($ele.content);
        });
    });
  });
});
