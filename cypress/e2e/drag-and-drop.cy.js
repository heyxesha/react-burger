import { HOST, NORMA_API } from "../support/links";

describe('Burger constructor dnd', () => {
    beforeEach(() => {
        cy.visit( HOST);    
        cy.intercept('GET', NORMA_API + '/ingredients', { fixture: 'ingredients.json' });
    });

    it('should pass dnd', () => {
        cy.get('[data-test=ingredient]:eq(0)').trigger('dragstart');
        cy.get('[data-test=dndContainer]').trigger('drop');   

        cy.get('[data-test=topBun]').should('exist');
        cy.get('[data-test=bottomBun]').should('exist');

        cy.get('[data-test=ingredient]:eq(3)').trigger('dragstart');
        cy.get('[data-test=dndContainer]').trigger('drop');
        cy.get('[data-test=inner-ingredient]').should('exist');

        /* После заполнения пустого представления перетаскивание внутренних компонентов просто на dndContainer не сработает,
           потому что обязательно нужен элемент, относительно которого тянем новый. */
        cy.get('[data-test=ingredient]:eq(4)').trigger('dragstart');
        cy.get('[data-test=inner-ingredient]').trigger('drop');
        cy.get('[data-test=inner-ingredient]').should('have.length', 2);
        cy.get('[data-test=orderSum]').not('have.text', 0);
    });
});