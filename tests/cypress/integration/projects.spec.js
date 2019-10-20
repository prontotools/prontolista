import { generate_random_string } from '../support/commands.js'

context('Projects', () => {
  var random_string

  beforeEach(() => {
    random_string = generate_random_string(5)
    cy.login()
  })

  it('should be able to create a new project', () => {
    cy.get('div.app-projects a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Project ${random_string}`)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name > a')
      .should('have.text', `Test New Project ${random_string}`)
  })

  it('should be able to edit a project', () => {
    cy.get('div.app-projects a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Project ${random_string}`)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name > a')
      .click()
    cy.get('#id_name')
      .clear()
      .type(`Edit Project ${random_string}`)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name > a')
      .should('have.text', `Edit Project ${random_string}`)
  })
})
