/// <reference types="cypress" />

class SearchResultsPage {
    getSearchPageTitle() {
        return cy.title();
    }

    getFourStarCheckBox() {
        return cy.get('[data-filters-item="class:class=4"]:first > input');
    }

    getResultsTable() {
        return cy.get("#search_results_table");
    }

    getResults() {
        return cy.get('[data-testid="property-card"]');
    }

    getResultAdressBox() {
        return cy.get('[data-testid="address"]');
    }

    getStarBoxes() {
        return cy.get('[data-testid^="rating-"]');
    }

    getPaginationBtns() {
        return cy.get('[data-testid="pagination"] button')
    }

    getNextPageBtn() {
      return cy.get('[data-testid="pagination"] [aria-label="Next page"]');
    }

    goToNextPage() {
        this.getNextPageBtn().click();
    }

    filterWithFourStars() {
        this.getFourStarCheckBox().scrollIntoView().check();
        cy.wait(2000);
    }

}

module.exports = new SearchResultsPage();
