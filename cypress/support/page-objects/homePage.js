/// <reference types="cypress" />
import constantData from "../constantData";
import helpers from "../helpers";

class HomePage {
    getHomePageLogo() {
        return cy.get(".bui-header__logo");
    }

    getHomePageTitle() {
        return cy.title();
    }

    getSearchBar() {
        return cy.get("#ss");
    }

    getLocationOption(locationName) {
        return cy.get(`ul.c-autocomplete__list > li[data-label="${locationName}, Armenia"]`);
    }

    getDataPicker() {
        return cy.get(".b-datepicker");
    }

    getDate(date) {
        return cy.get(`[data-date="${date}"]`)
    }

    getGuestsCounter() {
        return cy.get(".xp__guests");
    }

    getAddAdultButton() {
        return cy.get(".sb-group__field-adults .bui-stepper__add-button");
    }

    getSearchButton() {
        return cy.get(".sb-searchbox__button");
    }

    goTo() {
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
        })
        cy.visit("/");
    }

    insertTheLocationToBeSearced(locationName) {
        this.getSearchBar().click().type(locationName).should('have.value', constantData.theLocationToBeSearched);
        cy.wait(1000);
    }

    selectDatesForBooking() {
        cy.wait(500);
        let dates = helpers.generateDatesForBooking();
        dates.forEach(el => {
            this.getDate(el).click()
                .should('have.class', 'bui-calendar__date--selected');
        })
    }

    selectTheLocation(locationName) {
        this.insertTheLocationToBeSearced(locationName);
        this.getLocationOption(locationName).click();
    }

    openGuestCounter() {
        this.getGuestsCounter().click();
        this.getAdultCounter().then(el => {
            let txt = el.text();
            let numberOfAdults = +txt.split(' ')[0];
            cy.wrap(numberOfAdults).as('numberOfAdultsBefore')
        });
    }

    getAdultCounter() {
        return cy.get('.xp__guests [data-adults-count]');
    }

    addAdultGuest() {
        this.openGuestCounter();
        this.getAddAdultButton().click();
        this.getAdultCounter().then(el => {
            let txt = el.text();
            let numberOfAdults = +txt.split(' ')[0];
            cy.get('@numberOfAdultsBefore').then(numberOfAdultsBefore => {
                let expectedNumberOfAdults = numberOfAdultsBefore + 1;
                expect(expectedNumberOfAdults).to.equal(numberOfAdults);
            });
        })
    }

    proceedSearch() {
        this.getSearchButton().click();
    }
}

module.exports = new HomePage();
