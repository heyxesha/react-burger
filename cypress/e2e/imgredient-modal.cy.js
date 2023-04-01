import { HOST, NORMA_API } from "../support/links";

describe('Burger ingredient modal', () => {
    beforeEach(() => {
        cy.intercept('GET', NORMA_API + '/ingredients', { fixture: 'ingredients.json' });
        cy.visit(HOST);    
    });

    it('should create order', () => {
        cy.get('[data-test=ingredient]:eq(0)').click();

        cy.get('[data-test=modalContainer]').should('exist');
        cy.get('[data-test=ingredientName]').should('not.be.empty');
        cy.get('[data-test=calories]').should('not.be.empty');
        cy.get('[data-test=proteins]').should('not.be.empty');
        cy.get('[data-test=fat]').should('not.be.empty');
        cy.get('[data-test=carbohydrates]').should('not.be.empty');

        cy.get('[data-test=modalCloseButton]').click();
        cy.get('[data-test=modalContainer]').should('not.exist');
    });
});