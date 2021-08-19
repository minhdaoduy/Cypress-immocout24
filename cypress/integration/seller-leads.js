

describe("seller leads", () => {
  beforeEach(() => {
    cy.login()
  });

  it("Filter", () => {
    cy.get('[href="/customerdata.lead"]').click()
    cy.get('[id="Status"] option[selected="selected"]').should('have.text', 'To qualify ( New / New (reminder) / Valid / Not reachable 1 / Not reachable 2)')
    cy.get('[id="Valuation"] option[selected="selected"]').should('have.text', 'Sell')
    cy.get('[id="TimeFrame"] option[selected="selected"]').should('have.text', 'Alle')
    cy.get('[id="Source"] option[selected="selected"]').should('have.text', 'Alle')
    cy.get('[id="PropertyCategory"] option[selected="selected"]').should('have.text', 'Alle')
    cy.get('[id="Language"] option[selected="selected"]').should('have.text', 'Alle')
    cy.get('[id="ShowLeadWithPhoneNumber"]').should('be.checked')
 
  });
});
