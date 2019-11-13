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
    cy.get(':nth-child(3) > .table-overview > tbody > tr > :nth-child(3) > .addlink')
      .click()
    cy.get('#id_name')
      .type(project_name)
    cy.get('.btn-info')
      .click()
    cy.visit(baseUrl)

    // create test case
    cy.get(':nth-child(5) > .table-overview > tbody > tr > :nth-child(3) > .addlink')
      .click()
    cy.get('#id_name')
      .type(testcase_name)
    cy.get('#select2-id_project-container').click()
    cy.contains('li', project_name).click()
    cy.get('.btn-info')
      .click()
    cy.visit(baseUrl)

    // create test run
    cy.get(':nth-child(6) > .table-overview > tbody > tr > :nth-child(3) > .addlink')
      .click()
    cy.get('#id_name')
      .type(testrun_name)
    cy.get('#select2-id_project-container').click()
    cy.contains('li', project_name).click()
    cy.get('.btn-info')
      .click()
    cy.visit(baseUrl)
  })

  it('should be able to create a new test instance', () => {
    cy.get(':nth-child(4) > .table-overview > tbody > tr > :nth-child(3) > .addlink')
      .click()
    cy.get('#select2-id_testcase-container').click()
    cy.contains('li', testcase_name).click()
    cy.get('#select2-id_testrun-container').click()
    cy.contains('li', testrun_name).click()
    cy.get('.field-assignees > :nth-child(1) > .controls > .related-widget-wrapper > .select2 > .selection > .select2-selection > .select2-selection__rendered').click()
    cy.contains('li', 'cypress').click()
    cy.get('#select2-id_status-container').click()
    cy.contains('li', 'Passed').click()
    cy.get('.btn-info')
      .click()
    cy.get(':nth-child(1) > .field-testcase')
      .should('have.text', testcase_name)
    cy.get(':nth-child(1) > .field-status')
      .should('have.text', 'Passed')
  })

  it('should be able to edit a test instance', () => {
    cy.get(':nth-child(4) > .table-overview > tbody > tr > :nth-child(3) > .addlink')
      .click()
    cy.get('#select2-id_testcase-container').click()
    cy.contains('li', testcase_name).click()
    cy.get('#select2-id_testrun-container').click()
    cy.contains('li', testrun_name).click()
    cy.get('.field-assignees > :nth-child(1) > .controls > .related-widget-wrapper > .select2 > .selection > .select2-selection > .select2-selection__rendered').click()
    cy.contains('li', 'cypress').click()
    cy.get('#select2-id_status-container').click()
    cy.contains('li', 'Passed').click()
    cy.get('.btn-info')
      .click()
    cy.get(':nth-child(1) > .field-testcase > a')
      .click()
    cy.get('.select2-selection__choice__remove').click()
    cy.get('[name="_continue"]').click()
    cy.get('#select2-id_status-container').click()
    cy.contains('li', 'Failed').click()
    cy.get('.btn-info')
      .click()
    cy.get(':nth-child(1) > .field-status')
      .should('have.text', 'Failed')
  })

  it('should be able to filter a test instance by assignee', () => {
    cy.get(':nth-child(4) > .table-overview > tbody > tr > :nth-child(3) > .addlink')
      .click()
    cy.get('#select2-id_testcase-container').click()
    cy.contains('li', testcase_name).click()
    cy.get('#select2-id_testrun-container').click()
    cy.contains('li', testrun_name).click()
    cy.get('.field-assignees > :nth-child(1) > .controls > .related-widget-wrapper > .select2 > .selection > .select2-selection > .select2-selection__rendered').click()
    cy.contains('li', 'cypress').click()
    cy.get('#select2-id_status-container').click()
    cy.contains('li', 'Passed').click()
    cy.get('.btn-info')
      .click()
    cy.get('[data-select2-id="2"] > .selection > .select2-selection > .select2-selection__arrow').click()
    cy.contains('li', 'cypress').click()
    cy.get('#changelist-search > div > [type="submit"]')
      .click()
    cy.get(':nth-child(1) > .field-testcase')
      .should('have.text', testcase_name)
    cy.get(':nth-child(1) > .field-status')
      .should('have.text', 'Passed')
  })
})
