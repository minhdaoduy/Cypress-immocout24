import Header from "./Header";
import SignInPage from "./SignInPage";

class HomePage {
  constructor() {
    this.header = new Header();
  }

  visit() {
    cy.visit("/");
  }

  labelEmail() {
    return cy.get(`[class='sc-1gw5j-0 dySbfF']`);
  }

  goToSignIn() {
    this.header.clickSignInLink();

    return new SignInPage();
  }

  verifyLoginSuccessfulByEmail(email) {
    cy.get(`[class='sc-1gw5j-0 dySbfF']`, { timeout: 10000 }).should(
      "have.text",
      email
    );
  }
}

export default HomePage;
