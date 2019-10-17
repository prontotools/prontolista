/// <reference types="Cypress" />

context('Homepage', () => {
  it('should have the congrats message', () => {
    cy.visit('http://34.248.52.210:8000/')
    cy.get('main h2').should('have.text', 'The install worked successfully! Congratulations!')
  })
})
