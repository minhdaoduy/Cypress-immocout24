class SignInPage {
    visit() {
        cy.visit('/private/login?returnUrl=%2Fen');
    }

    getEmailError() {
        return cy.get(`[data-testid=SignInEmailError]`);
    }

    getPasswordError() {
        return cy.get(`[data-testid=SignInPasswordError]`);
    }

    fillEmail(value) {
        cy.input(value,"[id='LoginDataModel_LoginName']");

        return this;
    }

    fillPassword(value) {
        cy.input(value,"[id='LoginDataModel_Password']");

        return this;
    }

    submit() {
        const button = cy.get(`a[class='button hero big submit'] span:contains('Sign in')`);
        button.click();
    }
}

export default SignInPage;