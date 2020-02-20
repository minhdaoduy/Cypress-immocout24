class Header {
    clickSignInLink() {
        cy.get(`[class='sc-12m4kcc-0 gqHWzo']`).click();
        cy.get(`[class='xr0y3b-0-a c2ol4x-0 dZieNn w5cioe-0 bYEyFI']`).click();
    }
}

export default Header;