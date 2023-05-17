import { HOST, NORMA_API } from "../support/links";

const LOGIN = 'sailorpel@mail.ru';
const PASSWORD = '123456';

describe('Burger constructor create order', () => {
    beforeEach(() => {
        cy.intercept('GET', NORMA_API + '/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('POST', NORMA_API + '/login', { fixture: 'login.json' });
        cy.intercept('POST', NORMA_API + '/orders', { fixture: 'order.json' });        
    });

    it('should create order', () => {
        cy.visit(HOST);
        cy.get('[data-test=ingredient]:eq(0)').trigger('dragstart');
        cy.get('[data-test=dndContainer]').trigger('drop');

        cy.get('[data-test=createOrderButton]').should('not.have.attr', 'disabled');
        cy.get('[data-test=createOrderButton]').click();

        cy.get('[name=email]').type(LOGIN);
        cy.get('[name=password]').type(PASSWORD);
        cy.get('[data-test=loginSubmitButton]').click();

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