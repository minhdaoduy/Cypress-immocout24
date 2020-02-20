import HomePage from './PageObjects/HomePage';

describe('Sign In', () => {
    let home;
    before(function () {
        home = new HomePage();
        home.visit();
    });

    it('sign in', () => {

        const signIn = home.goToSignIn();

        signIn
            .fillEmail('daoduyminh@gmail.com')
            .fillPassword('operation')
            .submit();
    });

    it('should sign in with correct credentials', () => {
        home.verifyLoginSuccessfulByEmail('daoduyminh@gmail.com');
    });

    it('should sign in with correct credentials', async() => {
        cy.log('test')
    });
});