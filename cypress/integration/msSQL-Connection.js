//npm i cypress-sql-server --save-dev
it("Verify displaying of Property Valuation Landing Page", function () {
  cy.sqlServer(
    `select top 2 property_id
    from immoscout24.Ad.properties`
  ).then(($result) => {
    cy.log($result);
  });
});

it.only("Verify displaying of Property Valuation Landing Page", function () {
  cy.task(
    "queryDb",
    `select top 2 property_id from immoscout24.Ad.properties`
  ).then((res) => {
    cy.log(res);
  });
});
