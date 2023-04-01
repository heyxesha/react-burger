import { HOST, NORMA_API } from "../support/links";

describe('Burger constructor create order', () => {
    beforeEach(() => {
        cy.intercept('GET', NORMA_API + '/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('POST', NORMA_API + '/login', { fixture: 'login.json' });
        cy.intercept('POST', NORMA_API + '/orders', { fixture: 'order.json' });
        
        cy.visit(HOST + '/login');
        cy.get('[name=email]').type('sailorpel@mail.ru');
        cy.get('[name=password]').type('123456');
        cy.get('[data-test=loginSubmitButton]').click(); 
        
        cy.get('[data-test=ingredient]:eq(0)').trigger('dragstart');
        cy.get('[data-test=dndContainer]').trigger('drop');        
    });

    it('should create order', () => {
        cy.get('[data-test=createOrderButton]').should('not.have.attr', 'disabled');
        cy.get('[data-test=createOrderButton]').click();

        cy.get('[data-test=modalContainer]').should('exist');
        cy.get('[data-test=orderId]').should('not.be.empty');

        cy.get('[data-test=modalCloseButton]').click();

        cy.get('[data-test=modalContainer]').should('not.exist');
        cy.get('[data-test=topBun]').should('not.exist');
        cy.get('[data-test=bottomBun]').should('not.exist');
        cy.get('[data-test=orderSum]').should('have.text', 0);
    });
});