export default function createBroker(_lng = "English", server, email) {
  const urlList2 = {
    English: server + ".immoscout24.ch/en/real-estate-leads?webtest=true",
    Italian:
      "https://web-" + server + ".immoscout24.ch/it/vendere-casa?webtest=true",
    Fench:
      "https://web-" +
      server +
      ".immoscout24.ch/fr/vendre-immobilier?webtest=true",
    German:
      "https://web-" +
      server +
      ".immoscout24.ch/de/haus-verkaufen-makler?webtest=true",
  };

  // Open Sellear leads landing page
  cy.visit(urlList2[_lng]);

  // Open Seller lead from
  cy.get('[data-refname="heroheader"] button').click();

  cy.log("Seller Lead Form - Step 1");

  // Input fields
  cy.get(':has(>[value="apartment"])').click();
  cy.get('[data-refname="seller-lead-form-zipcity"] input').type(
    "1231 Conches"
  );
  cy.get('[data-refname="seller-lead-form-street"] input').type("1231 Conches");

  // Click submit button
  cy.get('[data-refname="confirmationbutton"]').click();

  cy.log("Seller Lead Form - Step 2");

  cy.get('[data-refname="seller-lead-form-full-name"]').type(
    "firstName lastName"
  );
  cy.get('[data-refname="seller-lead-form-email"]').type(email);
  cy.get('[data-refname="seller-lead-form-phone"]').type("+41757777777");
  cy.get('[data-refname="startform-gdpr"]').click("left");

  // Click submit button
  cy.get('[data-refname="confirmationbutton"]').click();
}
