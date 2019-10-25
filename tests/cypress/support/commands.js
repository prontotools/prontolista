// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  const baseUrl = Cypress.config().baseUrl
  const username = Cypress.env('superuser_username')
  const password = Cypress.env('superuser_password')

  cy.visit(baseUrl)
  cy.get('#id_username').type(username)
  cy.get('#id_password').type(password)
  cy.get('#login-form').submit()
})

export const generate_random_string = string_length => {
  let random_string = ''
  let random_ascii
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor(Math.random() * 25 + 97)
    random_string += String.fromCharCode(random_ascii)
  }
  return random_string
}
