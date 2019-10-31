import { generate_random_string } from '../support/commands.js'

context('Test Instances', () => {
  let random_string
  let project_name
  let testcase_name
  let testrun_name

  beforeEach(() => {
    const baseUrl = Cypress.config().baseUrl

    cy.clearCookies()
    random_string = generate_random_string(5)
    project_name = `Test Project ${random_string}`
    testcase_name = `Test Test case ${random_string}`
    testrun_name = `Test Test run ${random_string}`
    cy.login()

    // create project
    cy.get('div.app-projects a.addlink')
      .click()
    cy.get('#id_name')
      .type(project_name)
    cy.get('input.default')
      .click()
    cy.visit(baseUrl)

    // create test case
    cy.get('div.app-testcases a.addlink')
      .click()
    cy.get('#id_name')
      .type(testcase_name)
    cy.get('#id_project')
      .select(project_name)
    cy.get('input.default')
      .click()
    cy.visit(baseUrl)

    // create test run
    cy.get('div.app-testruns a.addlink')
      .click()
    cy.get('#id_name')
      .type(testrun_name)
    cy.get('#id_project')
      .select(project_name)
    cy.get('input.default')
      .click()
    cy.visit(baseUrl)
  })

  it('should be able to create a new test instance', () => {
    cy.get('div.app-test_instances a.addlink')
      .click()
    cy.get('#id_testcase')
      .select(testcase_name)
    cy.get('#id_testrun')
      .select(testrun_name)
    cy.get('#id_assignee')
      .type(`Assignee ${random_string}`)
    cy.get('#id_status')
      .select('passed')
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-testcase')
      .should('have.text', testcase_name)
    cy.get(':nth-child(1) > .field-assignee')
      .should('have.text', `Assignee ${random_string}`)
    cy.get(':nth-child(1) > .field-status')
      .should('have.text', 'Passed')
  })

  it('should be able to edit a test instance', () => {
    cy.get('div.app-test_instances a.addlink')
      .click()
    cy.get('#id_testcase')
      .select(testcase_name)
    cy.get('#id_testrun')
      .select(testrun_name)
    cy.get('#id_assignee')
      .type(`Assignee ${random_string}`)
    cy.get('#id_status')
      .select('passed')
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-testcase > a')
      .click()
    cy.get('#id_assignee')
      .clear()
      .type(`Edit assignee ${random_string}`)
    cy.get('#id_status')
      .select('failed')
    cy.get('input.default')
      .click()
    cy.get(':nth-child(1) > .field-assignee')
      .should('have.text', `Edit assignee ${random_string}`)
    cy.get(':nth-child(1) > .field-status')
      .should('have.text', 'Failed')
  })

  it('should be able to search a test instance', () => {
    cy.get('div.app-test_instances a.addlink')
      .click()
    cy.get('#id_testcase')
      .select(testcase_name)
    cy.get('#id_testrun')
      .select(testrun_name)
    cy.get('#id_assignee')
      .type(`Assignee ${random_string}`)
    cy.get('#id_status')
      .select('passed')
    cy.get('input.default')
      .click()
    cy.get('#searchbar')
      .type(random_string)
    cy.get('#changelist-search > div > [type="submit"]')
      .click()
    cy.get(':nth-child(1) > .field-testcase')
      .should('have.text', testcase_name)
    cy.get(':nth-child(1) > .field-assignee')
      .should('have.text', `Assignee ${random_string}`)
    cy.get(':nth-child(1) > .field-status')
      .should('have.text', 'Passed')
  })
})
