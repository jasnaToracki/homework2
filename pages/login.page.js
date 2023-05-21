"use strict";

const {By} = require("selenium-webdriver");

module.exports = class LoginPage {
    #driver;

    constructor (webdriver) {
        this.#driver = webdriver;
    }

    goToPage () {
        this.#driver.get ('http://shop.qa.rs/login');
    }

    getLoginButton () {
        return this.#driver.findElement(By.name('login'));
    }

    getLoginButtonValue () {
        return this.getLoginButton().getAttribute('value');
    }

    getCurrentUrl () {
        return this.#driver.getCurrentUrl();
    }

    fillInputUsername (username) {
        this.#driver.findElement(By.name('username')).sendKeys(username);
    }

    fillInputPassword (password) {
        this.#driver.findElement(By.name('password')).sendKeys(password);
    }

}
