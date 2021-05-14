class Header {
  clickSignInLink() {
    cy.contains(`span`, `Sign in`).click();
  }
}

export default Header;
