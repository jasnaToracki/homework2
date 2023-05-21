"use strict";

const {By} = require ('selenium-webdriver');

module.exports = class SignInPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage () {
        this.#driver.get ('http://shop.qa.rs/login');
    }
    fillInputUsername (username) {
        this.#driver.findElement(By.name('username')).sendKeys(username);
    }

    fillInputPassword (password) {
        this.#driver.findElement(By.name('password')).sendKeys(password);
    }

    getLoginButton () {
        return this.#driver.findElement(By.name('login'));
    }
}