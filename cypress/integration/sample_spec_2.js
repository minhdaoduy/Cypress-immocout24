// let chai = require('chai');
// let expect = chai.expect;
// let Cypress = require('../../node_modules/cypress/types/index.d.ts');
// let cy = Cypress.cy;
let sha256 = require('sha256');
beforeEach(function () {
    console.log('Start test ');

    // cy.get('h1').invoke('text').as('text1');
});
describe('My First Test', function() {

    before(function () {
        cy.visit('/');
        // cy.get('h1').invoke('text').as('text1');
    });

    it('Does not do much!', async function() {
        expect(true).to.equal(true);
        cy.get('h1').invoke('text').as('text1');
    });

    it('Visits the Kitchen Sink', async function() {
        cy.get('h1').should("have.text", 'Kitchen Sink');
    });

    it('verify text', async function() {
        // let element  = await cy.get('h1');
        // text = await element.text();
        localStorage.debug = 'cypress*';
        console.log('text1: ' + this.text1);
        expect('Kitchen Sink').to.equal(this.text1)
    });

    it('should edit a new item', async function() {
        let title = await cy.get('h1');
        expect('Kitchen Sink').to.equal(title.text());
    });

    it('verify class', async function() {
        let classTest = await cy.get('.navbar-brand');
        expect('navbar-brand').to.equal(classTest.attr('class'));
    });

    it('verify type attribute', async function() {
        let classTest = await cy.get('button[class="navbar-toggle collapsed"]');
        expect('button').to.equal(classTest.attr('type'));
    });

});
