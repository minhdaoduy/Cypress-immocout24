// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";
Cypress.Commands.add("input", (value, location) => {
  const field = cy.get(location);
  field.clear();
  field.type(value);
});

Cypress.Commands.add("login", (url) => {
  cy.visit(url);
  cy.get("[name='Username']").type("minhdao");
  cy.get("[name='Password']").type("5$Operation");
  cy.get("[id='localLoginSubmit']").click();
});

Cypress.Commands.add("parseXlsx", (inputFile) => {
  return cy.task("parseXlsx", { filePath: inputFile });
});

Cypress.Commands.add("createBroker", (_lng = "English", server, email) => {
  const urlList2 = {
    English:
      "https://web-" +
      server +
      ".immoscout24.ch/en/real-estate-leads?webtest=true",
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
});

Cypress.Commands.add("createSell", (_lng = "English", server, email) => {
  const urlList = {
    English:
      "https://web-" +
      server +
      ".immoscout24.ch/en/property-services-form/object-type?webtest=true",
    Italian:
      "https://web-" +
      server +
      ".immoscout24.ch/it/property-services-form/object-type?webtest=true",
    Fench:
      "https://web-" +
      server +
      ".immoscout24.ch/fr/property-services-form/object-type?webtest=true",
    German:
      "https://web-" +
      server +
      ".immoscout24.ch/de/property-services-form/object-type?webtest=true",
  };

  cy.visit(urlList[_lng]);
  cy.log("Seller Lead Form - Step 1");

  // Input fields
  cy.get(':has(>[value="house"])').click();
  cy.get('[data-refname="seller-lead-form-zipcity"] input').type(
    "1231 Conches"
  );
  cy.get('[data-refname="seller-lead-form-street"] input').type("1231 Conches");

  // Click submit button
  cy.get('[data-refname="confirmationbutton"]').click();

  cy.log("Seller Lead Form - Step 2");

  cy.get('[data-refname="seller-lead-form-living-space"]').type("10000");
  cy.get('[data-refname="seller-lead-form-floor-space"]').type("100000");
  cy.get('[data-refname="select-dropdown"]').select("8");
  cy.get('[name="constructionYear"]').type(new Date().getFullYear());
  cy.get('[name="renovationYear"]').type(new Date().getFullYear() + 2);

  // Click submit button
  cy.get('[data-refname="confirmationbutton"]').click();

  cy.log("Seller Lead Form - Step 3");
  // Wait step 3 displaying

  cy.get(':has(>[value="sell"])').click();
  cy.get(':has(>[value="now"])').click();

  // Click submit button
  cy.get('[data-refname="confirmationbutton"]').click();

  cy.log("Seller Lead Form - Step 4");
  // Wait step 4 displaying
  cy.get('[data-refname="seller-lead-form-full-name"]').type(
    "firstName lastName"
  );
  cy.get('[data-refname="seller-lead-form-email"]').type(email);
  cy.get('[data-refname="seller-lead-form-phone"]').clear().type("0797777777");
  cy.get('[data-refname="startform-gdpr"]').click("left");

  // Click submit button
  cy.get('[data-refname="confirmationbutton"]').click();
});

Cypress.Commands.add(
  "verifyUpdatingStatus",
  (
    action = "Share",
    status = "Valid",
    email,
    lng,
    source,
    numberBroker = 3
  ) => {
    cy.get('[href="/customerdata.lead"]').first().click();
    cy.get('[id="emailaddress"]').clear().type(email);
    cy.get('[id="Language"]').select(lng);
    cy.get('[id="Source"]').select(source);
    cy.get('[id="BtnSearch"]').click();
    cy.get("a[href]>img").eq(0).click();
    cy.get('[id="FirstName"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).type("FirstName");
    });
    cy.get('[id="LastName"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).type("LastName");
    });
    cy.get('[id="LivingSpace"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).type(100);
    });
    cy.get('[id="FloorSpace"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).type(100);
    });
    cy.get('[id="NumberOfRoom"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).type(1);
    });
    cy.get('[id="ConstructionYear"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).type(2000);
    });
    cy.get('[id="RenovationYear"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).type(2022);
    });
    cy.get('[id="TimeFrame"]').then((ele) => {
      if (ele.attr("value") === "") cy.wrap(ele).select("Jetzt");
    });
    cy.get('[id="qualificationStatus"]').select(status);
    if (status === "Reminder") {
      cy.get(".t-icon-calendar").click();
      cy.get(".t-calendar td").last().click();
      cy.get(".t-icon-clock").click();
      cy.get(".t-time-popup li").last().click();
    }
    if (status === "Shared") {
      for (let j = numberBroker; j < 3; j++) {
        // cy.get('[id="selectedRealtors"] option').eq(j).click()
        cy.get('[id="selectedRealtors"] option')
          .first()
          .then((ele) => {
            cy.get('[id="selectedRealtors"]').select(ele.text());
          });

        cy.get('[id="btnRemove"]').click();
      }
    }
    if (status === "Follow up Mail") cy.get('[id="btnSend"]').click();
    if (status !== "Follow up Mail" && status !== "Not Reachable 1") {
      cy.get('[id="btn' + action + '"]').click();
    }

    cy.get('[class="boxAlert boxColorGreen"]').should("be.visible");
    // Verify
    cy.get('[href="/customerdata.lead"]').first().click();
    // if (action === "Share") cy.get('[id="Status"]').select("Shared");
    cy.get('[id="Status"]').select("Alle");
    cy.get('[id="BtnSearch"]').click();
    cy.get("a[href]>img").eq(0).click();
    if (action === "Share")
      cy.get('td:has(>div[id="lead#qualification"])')
        .siblings()
        .should("have.text", "Shared");
    else {
      cy.get('[id="qualificationStatus"] [selected="selected"]').should(
        "have.text",
        status
      );
      if (status === "Reminder") {
        cy.get('[id="RemindDate"]').then((ele) => {
          if (ele.attr("value") === "" || ele.attr("value") === "undefined")
            return false;
        });
        cy.get('[id="RemindTime"]').then((ele) => {
          if (ele.attr("value") === "" || ele.attr("value") === "undefined")
            return false;
        });
      }
    }
  }
);
