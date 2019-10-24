import { generate_random_string } from '../support/commands.js'

context('Testcases', () => {
  let random_string
  let project_name

  beforeEach(() => {
    random_string = generate_random_string(5)
    project_name = `Test New Project ${random_string}`
    cy.login()
    cy.get('div.app-projects a.addlink')
      .click()
    cy.get('#id_name')
      .type(project_name)
    cy.get('input.default')
      .click()
    cy.visit('http://34.248.52.210:8000/admin/')
  })

  it('should be able to create a new test case', () => {
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Test case ${random_string}`)
    cy.get('#id_project')
      .select(project_name)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name')
      .should('have.text', `Test New Test case ${random_string}`)
  })

  it('should be able to edit a test case', () => {
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Test case ${random_string}`)
    cy.get('#id_project')
      .select(project_name)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-id > a')
      .click()
    cy.get('#id_name')
      .clear()
      .type(`Edit test case ${random_string}`)
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-name')
      .should('have.text', `Edit test case ${random_string}`)
  })

  it('should be able to search a test case', () => {
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(`Test New Test case ${random_string}`)
    cy.get('#id_project')
      .select(project_name)
    cy.get('input.default')
      .click()
    cy.get('#searchbar')
      .type(random_string)
    cy.get('#changelist-search > div > [type="submit"]')
      .click()
    cy.get(':nth-child(1) > .field-name')
      .should('have.text', `Test New Test case ${random_string}`)
  })
})
