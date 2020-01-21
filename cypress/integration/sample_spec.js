let chai = require('chai');
let expect = chai.expect;
// let cy = require('cypress');
// let cy = cypress.

describe('My First Test', function() {


    it('Does not do much!', async function() {
        expect(true).to.equal(true)
    });

    it('Visits the Kitchen Sink', async function() {
        await cy.visit('/');
        cy.get()
        // cy.log("Minh test");
    })
});