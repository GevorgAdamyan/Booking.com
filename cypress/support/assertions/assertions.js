/// <reference types="cypress" />

import homePage from "../page-objects/homePage";
import searchResultsPage from "../page-objects/searchResultsPage";
import constantData from "../constantData";

class Assertions {
    verifyTheHomePage() {
        homePage.getHomePageLogo().should("be.visible");
        homePage.getHomePageTitle().should("include", constantData.homePageTitle)
    }

    verifySearchResultsPage() {
        searchResultsPage.getSearchPageTitle().should('equal', constantData.searchResultsPageTitle);
        searchResultsPage.getResultsTable().should('be.visible');
    }

    verifyTheLocations() {
        searchResultsPage.getResultAdressBox().each(el => {
            let txt = el.text();
            expect(txt).to.be.oneOf([constantData.theLocationToBeSearched, constantData.strangeLocation])
        });
    }

    verifyLocationsOnAllPages() {
        searchResultsPage.getPaginationBtns().then(el => {
            this.verifyTheLocations();
            let numberOfPagesToBeTurned = el.length - 3;
            for(let i = 0; i < numberOfPagesToBeTurned; i++) {
                searchResultsPage.goToNextPage();
                this.verifyTheLocations();
            }
        })
    }

    verifyTheStars() {
        searchResultsPage.getStarBoxes().each(el => {
            let stars = el.find("span");
            expect(stars).to.have.lengthOf(constantData.theNumberOfStars);
        });
    }
}

module.exports = new Assertions();
