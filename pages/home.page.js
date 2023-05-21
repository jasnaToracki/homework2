"use strict";

const {By} = require("selenium-webdriver");

module.exports = class HomePage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage () {
        this.#driver.get ('http://shop.qa.rs/');
    }

    getPageHeaderTitle () {
         return this.#driver.findElement(By.tagName('h1')).getText();
    }

    isBugListDivDisplayed () {
        return this.#driver.findElement(
            By.xpath(
                '[//div[@class="row" and contains(., "ORDER YOUR BUGS TODAY")]'
            )
        ).isDisplayed();
    }

    async clickOnRegisterLink () {
        const registerLink = await this.#driver.findElement(By.linkText('Register'));
        await registerLink.click();
    }

    getSuccessAlertText ()
        {
        return this.#driver.findElement(By.className('alert alert-success')).getText('');
    }

    async clickOnLoginLink () {
        const loginLink = await this.#driver.findElement(By.linkText('Login'));
        await loginLink.click();
    }

    getSuccessAlertMessage () {
        return this.#driver.findElement(By.tagName('h2')).getText();
    }

    async clickOnLogoutLink () {
        const logoutLink = await this.#driver.findElement(By.linkText('Logout'));
        await logoutLink.click();
    }
}