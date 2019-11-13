import { generate_random_string } from '../support/commands.js'

context('Test Runs', () => {
  let random_string
  let project_name
  let testcase_name

  beforeEach(() => {
    const baseUrl = Cypress.config().baseUrl

    cy.clearCookies()
    random_string = generate_random_string(5)
    project_name = `Test Project ${random_string}`
    testcase_name = `Test Test case ${random_string}`
    cy.login()

    // create project
    cy.get(
      ':nth-child(3) > .table-overview > tbody > tr > :nth-child(3) > .addlink',
    ).click()
    cy.get('#id_name').type(project_name)
    cy.get('.btn-info').click()
    cy.visit(baseUrl)

    // create test case
    cy.get(
      ':nth-child(5) > .table-overview > tbody > tr > :nth-child(3) > .addlink',
    ).click()
    cy.get('#id_name').type(testcase_name)
    cy.get('#select2-id_project-container').click()
    cy.contains('li', project_name).click()
    cy.get('.btn-info').click()
    cy.visit(baseUrl)
  })

  it('should be able to create a new test run', () => {
    cy.get(
      ':nth-child(6) > .table-overview > tbody > tr > :nth-child(3) > .addlink',
    ).click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#select2-id_project-container').click()
    cy.contains('li', project_name).click()
    cy.get('#select2-id_testinstance_set-0-testcase-container').click()
    cy.contains('li', `${project_name}: ${testcase_name}`).click()
    cy.get(
      '#testinstance_set-0 > .field-assignees > .related-widget-wrapper > .select2 > .selection > .select2-selection > .select2-selection__rendered',
    ).click()
    cy.contains('li', 'cypress').click()
    cy.get('#select2-id_testinstance_set-0-status-container').click()
    cy.contains('li', 'Passed').click()
    cy.get('.btn-info').click()
    cy.get(':nth-child(1) > .field-name').should(
      'have.text',
      `Test new test run ${random_string}`,
    )
    cy.get(':nth-child(1) > .field-project').should('have.text', project_name)
  })

  it('should be able to edit a test run', () => {
    cy.get(
      ':nth-child(6) > .table-overview > tbody > tr > :nth-child(3) > .addlink',
    ).click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#select2-id_project-container').click()
    cy.contains('li', project_name).click()
    cy.get('#select2-id_testinstance_set-0-testcase-container').click()
    cy.contains('li', `${project_name}: ${testcase_name}`).click()
    cy.get(
      '#testinstance_set-0 > .field-assignees > .related-widget-wrapper > .select2 > .selection > .select2-selection > .select2-selection__rendered',
    ).click()
    cy.contains('li', 'cypress').click()
    cy.get('#select2-id_testinstance_set-0-status-container').click()
    cy.contains('li', 'Passed').click()
    cy.get('.btn-info').click()
    cy.get(':nth-child(1) > .field-name > a').click()
    cy.get('#id_name')
      .clear()
      .type(`Edit test run ${random_string}`)
    cy.get('.select2-selection__choice__remove').click()
    cy.get('[name="_continue"]').click()
    cy.get('#select2-id_testinstance_set-0-status-container').click()
    cy.contains('li', 'Failed').click()
    cy.get('.btn-info').click()
    cy.get(':nth-child(1) > .field-name').should(
      'have.text',
      `Edit test run ${random_string}`,
    )
  })

  it('should be able to search a test run', () => {
    cy.get(
      ':nth-child(6) > .table-overview > tbody > tr > :nth-child(3) > .addlink',
    ).click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#select2-id_project-container').click()
    cy.contains('li', project_name).click()
    cy.get('#select2-id_testinstance_set-0-testcase-container').click()
    cy.contains('li', `${project_name}: ${testcase_name}`).click()
    cy.get(
      '#testinstance_set-0 > .field-assignees > .related-widget-wrapper > .select2 > .selection > .select2-selection > .select2-selection__rendered',
    ).click()
    cy.contains('li', 'cypress').click()
    cy.get('#select2-id_testinstance_set-0-status-container').click()
    cy.contains('li', 'Passed').click()
    cy.get('.btn-info').click()
    cy.get('#searchbar').type(random_string)
    cy.get('#changelist-search > div > [type="submit"]').click()
    cy.get(':nth-child(1) > .field-name').should(
      'have.text',
      `Test new test run ${random_string}`,
    )
  })

  it('should be able to filter test run by project', () => {
    cy.get(
      ':nth-child(6) > .table-overview > tbody > tr > :nth-child(3) > .addlink',
    ).click()
    cy.get('#id_name').type(`Test new test run ${random_string}`)
    cy.get('#select2-id_project-container').click()
    cy.contains('li', project_name).click()
    cy.get('#select2-id_testinstance_set-0-testcase-container').click()
    cy.contains('li', `${project_name}: ${testcase_name}`).click()
    cy.get(
      '#testinstance_set-0 > .field-assignees > .related-widget-wrapper > .select2 > .selection > .select2-selection > .select2-selection__rendered',
    ).click()
    cy.contains('li', 'cypress').click()
    cy.get('#select2-id_testinstance_set-0-status-container').click()
    cy.contains('li', 'Passed').click()
    cy.get('.btn-info').click()
    cy.get(
      '.search-filters > .select2 > .selection > .select2-selection > .select2-selection__arrow',
    ).click()
    cy.get('li').contains(project_name)
  })
})
