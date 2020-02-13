// let chai = require('chai');
// let expect = chai.expect;
// let Cypress = require('../../node_modules/cypress/types/index.d.ts');
// let cy = Cypress.cy;

describe('My First Test', function() {
    let text;


    it('Does not do much!', async function() {
        debugger
        expect(true).to.equal(true)
    });

    it('Visits the Kitchen Sink', async function() {
        await cy.visit('/');
        let element  = cy.get('h1', { timeout: 10000}).debug();
        await element.should('have.text', 'Kitchen Sink');
        // text = await Chainable.get('h1', { timeout: 10000}).its('text()');
    });

    it('verify text', async function() {
        expect('Kitchen Sink').to.equal(text)
    })
});
//
// module.exports = (on, config) => {
//
//     on('before:browser:launch', (browser = {}, args) => {
//
//     it('Does not do much!', async function() {
//         expect(true).to.equal(true)
//     });
//
//     it('Visits the Kitchen Sink', async function() {
//         await cy.visit('/');
//         let element  = cy.get('h1', { timeout: 10000}).debug();
//         await element.should('have.text', 'Kitchen Sink');
//         // text = await Chainable.get('h1', { timeout: 10000}).its('text()');
//     });
//
//     it('verify text', async function() {
//         expect('Kitchen Sink').to.equal(text)
//     })
//
//     })
//   }