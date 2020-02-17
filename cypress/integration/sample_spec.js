// let chai = require('chai');
// let expect = chai.expect;
// let Cypress = require('../../node_modules/cypress/types/index.d.ts');
// let cy = Cypress.cy;

describe('My First Test', function() {
    let text4 = '';
    async function test(par1, par2) {
       return cy.get(par1).invoke('text').as(par2);
    }
    before(function () {
        cy.visit('/');
        // cy.get('h1').invoke('text').as('text1');
    });

    it('Does not do much!', async function() {
        expect(true).to.equal(true);
        cy.get('h1').invoke('text').as('text1');
        cy.get('h1').then(($lbl) => {
            text4 = $lbl.text();
            cy.get('h1').should("have.text", text4);
        });
        test("h1", "text2");
        expect('Kitchen Sink').to.equal(text2)
    });

    it('Visits the Kitchen Sink', async function() {
        cy.get('h1').should("have.text", 'Kitchen Sink');
    });

    it('verify text', async function() {
        // let element  = await cy.get('h1');
        // text = await element.text();
        expect('Kitchen Sink').to.equal(this.text1)
    })
});
