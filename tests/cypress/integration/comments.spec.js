import { generate_random_string } from '../support/commands.js'

context('Comments in Test Instance', () => {
  let random_string
  let project_name
  let testcase_name
  let testrun_name
  let comment_text

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

    // create test instance
    cy.get(':nth-child(4) > .table-overview > tbody > :nth-child(2) > :nth-child(3) > .addlink')
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
    cy.visit(baseUrl)

    comment_text = `Test Comment ${random_string}`
    cy.get(':nth-child(4) > .table-overview > tbody > :nth-child(1) > :nth-child(3) > .addlink')
      .click()
    cy.get('.field-test_instance > :nth-child(1) > .controls')
      .click()
    cy.contains('li', testcase_name)
      .click()
    cy.get('#id_text').type(comment_text)
    cy.get('.btn-info')
      .click()
    cy.get(':nth-child(1) > .field-test_instance')
      .should('have.text', testcase_name)
  })

  it('should be able to create a new comment', () => {
    cy.get(':nth-child(1) > .field-text')
      .should('have.text', comment_text)
  })

  it('should be able to edit a comment', () => {
    cy.get(':nth-child(1) > .field-test_instance > a')
      .click()
    cy.get('#id_text')
      .clear()
      .type(`Test Edit Comment ${random_string}`)
    cy.get('.btn-info')
      .click()
    cy.get(':nth-child(1) > .field-text')
      .should('have.text', `Test Edit Comment ${random_string}`)
  })

  it('should be able to search comments by text', () => {
    cy.get('#searchbar')
      .type(`${random_string}`)
    cy.get('.search-container > .btn')
      .click()
    cy.get(':nth-child(1) > .field-text')
      .should('have.text', comment_text)
  })
})
