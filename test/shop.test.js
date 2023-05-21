"use strict";

require ('chromedriver');
const webdriver = require ('selenium-webdriver');
const {By, Key, until} = require ('selenium-webdriver');
const {assert, expect} = require ('chai');
const HomePage = require ('../pages/home.page');
const RegisterPage = require ('../pages/register.page');
const LoginPage = require ('../pages/login.page');
const SignInPage = require ('../pages/signin.page');
const {describe} = require ('mocha');


describe.only('shop.QA.rs tests', function () {
    let driver;
    let pageHomePage;
    let pageRegister;
    let pageLoginPage;
    let pageSignInPage;

    before (function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        pageHomePage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLoginPage = new LoginPage(driver);
        pageSignInPage = new SignInPage(driver);
    });

    after (async function() {
        await driver.quit();
    });

    beforeEach( function () {
    });

    afterEach( function () {
    });

    it ('Verifies homepage is open', async function () {
        await pageHomePage.goToPage();
        const pageTitle = await pageHomePage.getPageHeaderTitle(); //
        expect (pageTitle).to.contain ('(QA) shop');
        expect (await pageHomePage.isBugListDivDisplayed()).to.be.true;

    });

    it ('Goes to registration page', async function () {
        await pageHomePage.clickOnRegisterLink();
        expect (await pageRegister.getRegisterButtonValue()).to.contain('register');
        expect (await pageRegister.getCurrentUrl()).to.be.eq('http://shop.qa.rs/register');
    });

    it ('Successfully perform registration', async function () {
        await pageRegister.getInputFirstName().sendKeys('Jasna');
        await pageRegister.getInputLastName().sendKeys('Toracki');
        await pageRegister.getInputEmail().sendKeys('jasna@test.ts');

        await pageRegister.fillInputUsername('jasna.toracki');
        await pageRegister.fillInputPassword('nekaLozinka1234');
        await pageRegister.fillInputPasswordConfirm('nekaLozinka1234');

        await pageRegister.getRegisterButton().click();
        expect (await pageHomePage.getSuccessAlertText()).to.contain('Uspeh!');
    });

    it ('Goes to login page', async function () {
        await pageHomePage.goToPage();
        await pageHomePage.clickOnLoginLink();
        expect (await pageLoginPage.getLoginButtonValue()).to.contain('Uloguj se');
        expect (await pageLoginPage.getCurrentUrl()).to.be.eq('http://shop.qa.rs/login');
    });

    it ('Login user', async function () {
        await pageLoginPage.goToPage();
        await pageLoginPage.fillInputUsername('jasna.toracki');
        await pageLoginPage.fillInputPassword('nekaLozinka1234');
        await pageLoginPage.getLoginButton().click();
        expect (await pageHomePage.getSuccessAlertMessage()).to.contain('Welcome back');
    });

    it ('Sign in', async function () {
       await pageSignInPage.goToPage();
       await pageSignInPage.fillInputUsername('jasna.toracki');
       await pageSignInPage.fillInputPassword('nekaLozinka1234');
       await pageSignInPage.getLoginButton().click();
       expect (await pageHomePage.getSuccessAlertMessage()).to.contain('Welcome back');
    });

});