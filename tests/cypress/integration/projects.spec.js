import { generate_random_string } from '../support/commands.js'

context('Projects', () => {
  it('should be able to create a new project', () => {
    let random_string = generate_random_string(5)

    cy.visit('http://34.248.52.210:8000/admin/')
    cy.get('#id_username').type('cypress')
    cy.get('#id_password').type('Pradipat17!')
    cy.get('#login-form').submit()

    cy.get('div.app-projects a.addlink').click()
    cy.get('#id_name').type(`Test New Project ${random_string}`)
    cy.get('input.default').click()

    cy.get(':nth-child(1) > .field-name > a').should('have.text', `Test New Project ${random_string}`)
  })
})
