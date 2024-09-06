import cy from '../support/pages/general'
import ifilters from '../support/pages/inventoryFilters'

describe('Inventory Filters', () => {
    beforeEach(() => {
        cy.openApp()
        cy.successLogin('user')
    });
    it('06 - Verify that the items are sorted correctly', () => {
        ifilters.verifyActiveSorting('Name (A to Z)')
    });
    it('07 - Change the way that the items are sorted', () => {
        ifilters.verifyActiveSorting('Name (A to Z)')
        ifilters.changeSorting('Name (Z to A)')
    });
});