"use strict";

const {By} = require ('selenium-webdriver');
const BasePage = require ('./base.page');

module.exports = class RegisterPage extends BasePage {

    getRegisterButton () {
        return this.driver().findElement(By.name('register'));
    }

    getRegisterButtonValue () {
        return this.getRegisterButton().getAttribute('value');
    }

    getInputFirstName () {
        return this.driver().findElement(By.name('ime'));
    }

    getInputLastName () {
        return this.driver().findElement(By.name('prezime'));
    }

    getInputEmail () {
        return this.driver().findElement(By.name('email'))
    }

    fillInputUsername (username) {
        this.driver().findElement(By.name('korisnicko')).sendKeys(username);
    }

    fillInputPassword (password) {
        this.driver().findElement(By.name('lozinka')).sendKeys(password);
    }

    fillInputPasswordConfirm (password) {
        this.driver().findElement(By.name('lozinkaOpet')).sendKeys(password);
    }
}