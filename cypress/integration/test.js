/// <reference types="cypress" />

import homePage from "../support/page-objects/homePage";
import searchResultsPage from "../support/page-objects/searchResultsPage";
import assertions from "../support/assertions/assertions";
import constantData from "../support/constantData"

describe("Searching a hotel in Dilijan", () => {
    before(() => {
        homePage.goTo();
        assertions.verifyTheHomePage();
    })

    it("Should search the city, filter with necessary parameters and check the results", () => {
        homePage.selectTheLocation(constantData.theLocationToBeSearched);
        homePage.selectDatesForBooking();
        homePage.addAdultGuest();
        homePage.proceedSearch();
        assertions.verifySearchResultsPage()
        assertions.verifyLocationsOnAllPages();
        searchResultsPage.filterWithFourStars();
        assertions.verifyTheLocations();
        assertions.verifyTheStars();
    })
})