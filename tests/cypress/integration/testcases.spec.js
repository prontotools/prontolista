import { generate_random_string } from '../support/commands.js'

context('Test Cases', () => {
  let random_string
  let project_name

  beforeEach(() => {
    const baseUrl = Cypress.config().baseUrl

    cy.clearCookies()
    random_string = generate_random_string(5)
    project_name = `Test New Project ${random_string}`
    cy.login()
    cy.get('div.app-projects a.addlink')
      .click()
    cy.get('#id_name')
      .type(project_name)
    cy.get('input.default')
      .click()
    cy.visit(baseUrl)
  })

  it('should be able to create a new test case', () => {
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Test Case ${random_string}`)
    cy.get('#id_project')
      .select(project_name)
    cy.get('#id_description')
      .type(`Test New Test Case Description ${random_string}`)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name')
      .should('have.text', `Test New Test Case ${random_string}`)
  })

  it('should be able to edit a test case', () => {
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Test Case ${random_string}`)
    cy.get('#id_project')
      .select(project_name)
    cy.get('#id_description')
      .type(`Test New Test Case Description ${random_string}`)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name > a')
      .click()
    cy.get('#id_name')
      .clear()
      .type(`Edit Test Case ${random_string}`)
    cy.get('#id_description')
      .clear()
      .type(`Edit Test Case Description ${random_string}`)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name')
      .should('have.text', `Edit Test Case ${random_string}`)
  })

  it('should be able to search a test case', () => {
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Test Case ${random_string}`)
    cy.get('#id_project')
      .select(project_name)
    cy.get('input.default')
      .click()
    cy.get('#searchbar')
      .type(random_string)
    cy.get('#changelist-search > div > [type="submit"]')
      .click()
    cy.get(':nth-child(1) > .field-name')
      .should('have.text', `Test New Test Case ${random_string}`)
  })

  it('should be able to filter test case by project', () => {
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Test Case ${random_string}`)
    cy.get('#id_project')
      .select(project_name)
    cy.get('input.default')
      .click()
    cy.contains(project_name)
      .click()
  })
})
