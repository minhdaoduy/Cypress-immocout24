//npm install node-xlsx --save-dev
let title;
describe("My First Test", function () {
  it("Does not do much!", function () {
    var res = "";
    cy.intercept("GET", "**/v4/en/locations?top=true").as("locations");
    cy.intercept("GET", "**/v4/en/menu/new-badge", {
      statusCode: 500,
      body: "it worked!",
    }).as("badge");
    cy.intercept("GET", "https://rest-api.immoscout24.ch/v4/en/favourites", {
      statusCode: 300,
      body: "mock favourites!",
    }).as("favourites");

    cy.visit("https://www.immoscout24.ch/en");
    cy.wait("@locations").then(($rep) => {
      cy.log("body: " + JSON.stringify($rep.response.body));
      cy.log("Status: " + JSON.stringify($rep.response.statusCode));
      res = $rep.response.body;
    });

    cy.wait("@badge").then(($rep) => {
      cy.log("body: " + $rep.response.body);
      cy.log("Status: " + JSON.stringify($rep.response.statusCode));
    });

    cy.request("https://rest-api.immoscout24.ch/v4/en/favourites").then(
      ($rep) => {
        cy.log("body: " + JSON.stringify($rep.body));
        cy.log("Status: " + $rep.status);
      }
    );

    cy.wait("@favourites").then(($rep) => {
      cy.log("body: " + $rep.response.body);
      cy.log("Status: " + JSON.stringify($rep.response.statusCode));
    });
  });

  it("Search", function () {
    var res = "";
    cy.request(
      "http://web-int-00.immoscout24.ch/en/real-estate/rent/city-bern"
    ).then(($rep) => {
      // cy.log("body: " + JSON.stringify($rep.body));
      res = $rep.body;
      cy.intercept(
        "GET",
        "https://www.immoscout24.ch/en/real-estate/rent/city-bern",
        {
          body: res,
        }
      ).as("Search");

      cy.visit("https://www.immoscout24.ch/en/real-estate/rent/city-bern");
    });
  });

  it.only("Search", function () {
    cy.intercept(
      "GET",
      "https://www.immoscout24.ch/en/real-estate/rent/city-bern",
      (req) => {
        req.url = req.url.replace("www", "web-int-00");
      }
    ).as("Search");

    cy.visit("https://www.immoscout24.ch/en/real-estate/rent/city-bern");
  });
});
