describe('My First Test', function() {
    it('CS TEST', function() {
      cy.visit('http://cstest.enovum.cl')
      cy.get('input[id="username"]').type('adm001')
      cy.get('input[id="password"]').type('adm001')
      cy.get('.btn-primary').click()
    })
  })