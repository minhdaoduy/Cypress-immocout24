//https://www.cypress.io/blog/2021/05/24/full-testing-of-html-emails-using-ethereal-accounts/
const server = "int-05";
let url =
  "https://web-" + server + ".immoscout24.ch/it/vendere-casa?webtest=true";
describe("Email confirmation", () => {
  let userEmail;

  before(() => {
    // get and check the test email only once before the tests
    cy.task("getUserEmail").then((email) => {
      expect(email).to.be.a("string");
      userEmail = email;
    });
    // get and check the test email only once before the tests
    cy.task("getPass").then((pass) => {
      expect(pass).to.be.a("string");
      //   userEmail = email;
    });
  });

  it("sends confirmation code", () => {
    cy.intercept("**webviewdata*contact-info*").as("contact-info");
    // routeAPI("webviewdata", "webviewdata");

    // Open Sellear leads landing page
    cy.visit(url);

    // Open Seller lead from
    cy.get('[data-refname="heroheader"] button').click();

    cy.log("Seller Lead Form - Step 1");

    // Input fields
    cy.get(':has(>[value="apartment"])').click();
    cy.get('[data-refname="seller-lead-form-zipcity"] input').type(
      "1231 Conches"
    );
    cy.get('[data-refname="seller-lead-form-street"] input').type(
      "1231 Conches"
    );

    // Click submit button
    cy.get('[data-refname="confirmationbutton"]').click();

    cy.log("Seller Lead Form - Step 2");
    // Wait step 2 displaying
    cy.wait("@contact-info");

    // // Verify href value of phone number in contact box
    // cy.get('a[href="tel:031 744 17 13"]').each(($el) => {
    //   expect($el).to.be.exist;
    // });

    cy.get('[data-refname="seller-lead-form-full-name"]').type(
      "firstName lastName"
    );
    cy.get('[data-refname="seller-lead-form-email"]').type(userEmail);
    cy.get('[data-refname="seller-lead-form-phone"]').type("+41757777777");
    cy.get('[data-refname="startform-gdpr"]').click("left");

    // Click submit button
    cy.get('[data-refname="confirmationbutton"]').click();

    cy.wait(130000);
    cy.task("getLastEmail")
      .its("html")
      .then((html) => {
        cy.document({ log: false }).invoke({ log: false }, "write", html);
      });
    cy.log("**email has the user name**");
    // cy.contains("[data-cy=user-name]", userName).should("be.visible");
  });
});
