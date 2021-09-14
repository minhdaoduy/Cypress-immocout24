const server = "int-06";
const email = "minhdao@nvg.vn";

describe.only("Seller Lead Form - Free Property Valuation", () => {
  const urlList = [
    "https://web-" +
      server +
      ".immoscout24.ch/en/property-services-form/object-type?webtest=true",
    // "https://web-" +
    //   server +
    //   ".immoscout24.ch/it/property-services-form/object-type?webtest=true",
    // "https://web-" +
    //   server +
    //   ".immoscout24.ch/fr/property-services-form/object-type?webtest=true",
    // "https://web-" +
    //   server +
    //   ".immoscout24.ch/de/property-services-form/object-type?webtest=true",
  ];
  for (let i = 0; i < 0; i++) {
    urlList.push(...urlList);
  }

  urlList.forEach((url) => {
    it("Free Property Valuation Funnel - Sell", () => {
      cy.visit(url);
      cy.log("Seller Lead Form - Step 1");

      // Input fields
      cy.get(':has(>[value="house"])').click();
      // cy.get(':has(>[value="apartment"])').click();
      cy.get('[data-refname="seller-lead-form-zipcity"] input')
        .clear()
        .type("1231 Conches");
      cy.get('[data-refname="seller-lead-form-street"] input')
        .clear()
        .type("1231 Conches");

      // Click submit button
      cy.get('[data-refname="confirmationbutton"]').click();

      cy.log("Seller Lead Form - Step 2");

      cy.get('[data-refname="seller-lead-form-living-space"]')
        .clear()
        .type("10000");
      cy.get('[data-refname="seller-lead-form-floor-space"]')
        .clear()
        .type("100000");
      cy.get('[data-refname="select-dropdown"]').select("8");
      cy.get('[name="constructionYear"]')
        .clear()
        .type(new Date().getFullYear());
      // cy.get('[name="renovationYear"]').type(new Date().getFullYear() + 2);

      // Click submit button
      cy.get('[data-refname="confirmationbutton"]').click();

      cy.log("Seller Lead Form - Step 3");
      // Wait step 3 displaying

      cy.get(':has(>[value="buy"])').click();
      // cy.get(':has(>[value="evaluate"])').click();
      // cy.get(':has(>[value="sell"])').click();
      // cy.get(':has(>[value="now"])').click();

      // Click submit button
      cy.get('[data-refname="confirmationbutton"]').click();

      cy.log("Seller Lead Form - Step 4");
      // Wait step 4 displaying
      cy.get('[data-refname="seller-lead-form-full-name"]')
        .clear()
        .type("firstName lastName");
      cy.get('[data-refname="seller-lead-form-email"]').clear().type(email);
      // cy.get('[data-refname="seller-lead-form-phone"]')
      //   .clear()
      //   .type("0797777777");
      cy.get('[data-refname="startform-gdpr"]').click("left");

      // Click submit button
      cy.get('[data-refname="confirmationbutton"]').click();
    });
  });
});

describe("Seller Lead Form - Find A Broker", function () {
  const urlList2 = [
    // 'https://web-'+server+'.immoscout24.ch/en/real-estate-leads?webtest=true',
    "https://web-" + server + ".immoscout24.ch/it/vendere-casa?webtest=true",
    // 'https://web-'+server+'.immoscout24.ch/fr/vendre-immobilier?webtest=true',
    "https://web-" +
      server +
      ".immoscout24.ch/de/haus-verkaufen-makler?webtest=true",
  ];
  for (let i = 0; i < 1; i++) {
    urlList2.push(...urlList2);
  }

  urlList2.forEach((url) => {
    it("Find a broker flow", function () {
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

      cy.get('[data-refname="seller-lead-form-full-name"]').type(
        "firstName lastName"
      );
      cy.get('[data-refname="seller-lead-form-email"]').type(email);
      cy.get('[data-refname="seller-lead-form-phone"]').type("+41757777777");
      cy.get('[data-refname="startform-gdpr"]').click("left");

      // Click submit button
      cy.get('[data-refname="confirmationbutton"]').click();
    });
  });
});

describe("admin - share", function () {
  const numberBroker = 1;
  const listLng = ["German", "Fench", "Italian", "English"];
  const lng = listLng[0];
  const sourceList = [
    "Broker Recommendation",
    "Contact Center",
    "Free Property Valuation",
  ];
  const source = sourceList[0];
  before(function () {
    cy.visit("https://admin-" + server + ".immoscout24.ch");
    cy.get("#Username.text").type("minhdao");
    cy.get("#Password.text").type("5$Operation");
    cy.get("a#localLoginSubmit.button").click();
  });

  it("Find a broker flow", function () {
    cy.get('[href="/customerdata.lead"]').click();
    cy.get('[id="emailaddress"]').type(email);
    cy.get('[id="Language"]').select(lng);
    cy.get('[id="Source"]').select(source);
    cy.get('[id="BtnSearch"]').click();
    for (let i = 0; i < 1; i++) {
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
      // cy.get('[id="qualificationStatus"]').select('Valid')
      // cy.get('[id="qualificationStatus"]').select('Invalid')
      // cy.get('[id="qualificationStatus"]').select('Not Reachable 1')
      // cy.get('[id="qualificationStatus"]').select('Not Reachable 2')
      // cy.get('[id="qualificationStatus"]').select('Not Reachable 3')
      // cy.get('[id="qualificationStatus"]').select('Follow up Mail')
      cy.get('[id="qualificationStatus"]').select("Reminder");
      cy.get(".t-icon-calendar").click();
      cy.get(".t-calendar td").last().click();
      cy.get(".t-icon-clock").click();
      cy.get(".t-time-popup li").last().click();
      for (let j = numberBroker; j < 3; j++) {
        // cy.get('[id="selectedRealtors"] option').eq(j).click()
        cy.get('[id="selectedRealtors"] option')
          .first()
          .then((ele) => {
            cy.get('[id="selectedRealtors"]').select(ele.text());
          });

        cy.get('[id="btnRemove"]').click();
      }

      // cy.get('[id="btnShare"]').click()
      // cy.get('[id="btnSave"]').click()
    }
  });
});
