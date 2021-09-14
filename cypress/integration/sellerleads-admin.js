import { v4 as uuidv4 } from "uuid";
import * as Sellerlead from "../helpers/sellerlead";
import "../helpers/sellerlead2";
const server = "int-05";
const sellerlead = new Sellerlead();
describe("seller leads", () => {
  beforeEach(() => {
    cy.login("https://admin-" + server + ".immoscout24.ch");
  });

  it("Filter and detail", () => {
    cy.get('[href="/customerdata.lead"]').click();
    cy.get('[id="Status"] option[selected="selected"]').should(
      "have.text",
      "To qualify ( New / New (reminder) / Valid / Not reachable 1 / Not reachable 2)"
    );
    cy.get('[id="Valuation"] option[selected="selected"]').should(
      "have.text",
      "Sell"
    );
    cy.get('[id="TimeFrame"] option[selected="selected"]').should(
      "have.text",
      "Alle"
    );
    cy.get('[id="Source"] option[selected="selected"]').should(
      "have.text",
      "Alle"
    );
    cy.get('[id="PropertyCategory"] option[selected="selected"]').should(
      "have.text",
      "Alle"
    );
    cy.get('[id="Language"] option[selected="selected"]').should(
      "have.text",
      "Alle"
    );
    cy.get('[id="ShowLeadWithPhoneNumber"]').should("be.checked");
  });
});

describe.only("admin - broker", function () {
  const listLng = ["German", "Fench", "Italian", "English"];
  const lng = listLng[0];
  const sourceList = [
    "Broker Recommendation",
    "Contact Center",
    "Free Property Valuation",
  ];
  const source = sourceList[0];
  const brokerStatusList = [
    "Not Reachable 1",
    "Not Reachable 2",
    "Follow up Mail",
    "Reminder",
    "Invalid",
    "Valid",
  ];

  const sellStatusList = [
    "Not Reachable 1",
    "Not Reachable 2",
    "Not Reachable 3",
    "Reminder",
    "Invalid",
    "Valid",
  ];

  it.only("share a broker", function () {
    const email = `${uuidv4()}@test.ch`;
    const numberBroker = 1;
    // sellerlead.createBroker(lng, server, email);
    createBroker(lng, server, email);
    cy.login("https://admin-" + server + ".immoscout24.ch");
    sellerlead.verifyUpdatingStatus(
      "Share",
      "Valid",
      email,
      lng,
      source,
      numberBroker
    );
  });

  it("Verify updating Status", function () {
    const email = `${uuidv4()}@test.ch`;
    const numberBroker = 1;
    sellerlead.createBroker(lng, server, email);
    cy.login("https://admin-" + server + ".immoscout24.ch");
    brokerStatusList.forEach((status) => {
      sellerlead.verifyUpdatingStatus(
        "Save",
        status,
        email,
        lng,
        source,
        numberBroker
      );
    });
  });

  it("Verify updating Status", function () {
    const email = `${uuidv4()}@test.ch`;
    const email2 = `${uuidv4()}@test.ch`;
    const inputData = {
      firtsName: "FirstName",
      lastsName: "LirstName",
      lng: "de",
      phone: "+41757777777",
      searchEmail: email,
      email: email2,
      canton: "GE",
      LivingSpace: 100,
      FloorSpace: 100,
      NumberOfRoom: 1,
      ConstructionYear: 2000,
      RenovationYear: 2020,
      TimeFrame: "Jetzt",
    };
    sellerlead.createBroker(lng, server, email);
    cy.login("https://admin-" + server + ".immoscout24.ch");
    sellerlead.updateLeadInDetail(inputData);
  });
});
