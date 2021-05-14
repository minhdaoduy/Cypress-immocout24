let expectedTitle = "The best-known real estate marketplace in Switzerland";
describe("My First Test", function () {
  beforeEach(function () {
    cy.visit("/");
    // cy.get('h1').invoke('text').as('text1');
  });

  it.only("Does not do much!", async function () {
    cy.get("h1").should("have.text", expectedTitle);
  });

  it.only("Visits the Kitchen Sink", async function () {
    let title = (await cy.get("h1")).text();
    expect(expectedTitle).to.equal(title);
  });

  it("verify text", async function () {
    // let element  = await cy.get('h1');
    // text = await element.text();
    console.log("text1: " + this.text1);
    expect("The best-known real estate marketplace in Switzerland").to.equal(
      this.text1
    );
  });

  it("should edit a new item", async function () {
    title = await cy.get("h1");
    expect("The best-known real estate marketplace in Switzerland").to.equal(
      title.text()
    );
    cy.log(title.text());
  });

  it("verify class", async function () {
    let classTest = await cy.get(".navbar-brand");
    expect("navbar-brand").to.equal(classTest.attr("class"));
  });

  it("verify type attribute", async function () {
    let classTest = await cy.get('button[class="navbar-toggle collapsed"]');
    expect("button").to.equal(classTest.attr("type"));
    cy.log("classTest.attr('type')" + classTest.attr("type"));
    cy.log(title.text());
  });
});
