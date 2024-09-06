import locators from '../pageElements/locators';

class InventoryFilters {
  verifyActiveSorting(sortFilter) {
    cy.get(locators.FILTERS.activeSortContainer)
      .should('exist')
      .and('be.visible')
      .and('contain', sortFilter)
  }
  changeSorting(sortFilter) {
    cy.get(locators.FILTERS.sortContainer)
      .should('exist')
      .and('be.visible')
      .select(sortFilter)
      this.verifyActiveSorting
  }
}

export default new InventoryFilters();