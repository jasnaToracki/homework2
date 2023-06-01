"use strict";

require ('chromedriver');
const webdriver = require ('selenium-webdriver');
const {By, Key, until, promise} = require ('selenium-webdriver');
const {assert, expect} = require ('chai');
const HomePage = require ('../pages/home.page');
const RegisterPage = require ('../pages/register.page');
const LoginPage = require ('../pages/login.page');
const CartPage = require ('../pages/cart.page');
const {describe} = require ('mocha');
const CheckoutPage = require ('../pages/checkout.page');
const AccountPage = require ('../pages/account.page');


describe.only('shop.QA.rs tests', function () {
    let driver;
    let pageHomePage;
    let pageRegister;
    let pageLoginPage;
    let pageCartPage;
    let pageCheckoutPage;
    let pageAccountPage;

    const packageToAdd = 'starter';
    const packageQuantity = '2';


    before (function() {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        pageHomePage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLoginPage = new LoginPage(driver);
        pageCartPage = new CartPage (driver);
        pageCheckoutPage = new CheckoutPage(driver);
        pageAccountPage = new AccountPage(driver);
    });

    after (async function() {
        await driver.quit();
    });

    beforeEach( function () {
    });

    afterEach( function () {
    });

    it('Verifies homepage is open', async function () {
        await pageHomePage.goToPage();
        const pageTitle = await pageHomePage.getPageHeaderTitle();
        expect (pageTitle).to.contain ('(QA) Shop');
        expect (await pageHomePage.isBugListDivDisplayed()).to.be.true;

    });

    it ('Goes to registration page', async function () {
        await pageHomePage.clickOnRegisterLink();
        expect (await pageRegister.getRegisterButtonValue()).to.contain('Register');
        expect (await pageRegister.getCurrentUrl()).to.be.eq('http://shop.qa.rs/register');
    });

    it ('Successfully perform registration', async function () {
        await pageRegister.getInputFirstName().sendKeys('Jasna');
        await pageRegister.getInputLastName().sendKeys('Toracki');
        await pageRegister.getInputEmail().sendKeys('test@test.ts');

        const randomNumber = pageRegister.random(10000, 100000000);

        await pageRegister.fillInputUsername(`jasna.toracki.${randomNumber}`);
        await pageRegister.fillInputPassword('password123456');
        await pageRegister.fillInputPasswordConfirm('password123456');

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
        //await pageLoginPage.goToPage();
        await pageLoginPage.fillInputUsername('franc');
        await pageLoginPage.fillInputPassword('kafka123');
        await pageLoginPage.clickLoginButton();
        expect (await pageHomePage.getSuccessAlertMessage()).to.contain('Welcome back');
        assert.isTrue (await pageHomePage.isLogoutLinkDisplayed());
    });

    it ('Goes to account page and fills in information', async function () {
        await pageAccountPage.goToPage();

        expect (await pageAccountPage.getPageTitle()).to.be.eq('My Account')

        await pageAccountPage.fillInputAddress1('Street 1');
        await pageAccountPage.fillInputCity('Belgrade');
        await pageAccountPage.fillInputZipCode('11000');
        await pageAccountPage.fillInputCountry('Serbia');

        await pageAccountPage.clickOnButtonSave();

        await pageAccountPage.goToPage();
        expect (await pageAccountPage.getInputAddress1().getAttribute('value')).to.eq('Street 1');
        expect (await pageAccountPage.getInputCity().getAttribute('value')).to.eq('Belgrade');
        expect (await pageAccountPage.getInputZipCode().getAttribute('value')).to.eq('11000');
        expect (await pageAccountPage.getInputCountry().getAttribute('value')).to.eq('Serbia');
    });

    it ('Empties the shopping cart', async function () {
        await pageCartPage.actionEmptyCart();
    });

    it ('Adds item(s) to carts', async function () {
        const packageDiv = await pageHomePage.getPackageDiv(packageToAdd);
        const quantity = await pageHomePage.getQuantityDropdown(packageDiv);
        const options = await pageHomePage.getQuantityOptions(quantity);

        await Promise.all(options.map(async function (option) {
            const text = await option.getText();

            if (text === packageQuantity) {
                await option.click();

            const selectedValue = await quantity.getAttribute('value');
            expect (selectedValue).to.contain(packageQuantity);

            await pageHomePage.getOrderButton(packageDiv).click();
            expect (await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/order');
                }}));
    });

    it ('Opens shopping cart', async function () {
        await pageHomePage.clickOnViewShoppingCartLink();

        expect (await pageCartPage.getCurrentUrl()).to.be.eq('http://shop.qa.rs/cart');
        expect (await pageCartPage.getPageHeaderTitle()).to.contain('Order');
    });

    it ('Verifies items are in cart', async function () {
        const orderRow = await pageCartPage.getOrderRow(packageToAdd.toUpperCase());
        const itemQuantity = await pageCartPage.getItemQuantity(orderRow);

        expect (await itemQuantity.getText()).to.eq(packageQuantity);
    });

    it ('Verifies total item price is correct', async function () {
        const orderRow = await pageCartPage.getOrderRow(packageToAdd.toUpperCase());
        const itemQuantity = await pageCartPage.getItemQuantity(orderRow);
        const itemPrice = await pageCartPage.getItemPrice(orderRow);
        const itemPriceTotal = await pageCartPage.getItemPriceTotal(orderRow);

        const quantity = Number(await itemQuantity.getText());

        const price = Number ((await itemPrice.getText()).substring(1));
        const total = Number ((await itemPriceTotal.getText()).substring(1));

        const price2 = Number ((await itemPrice.getText()).replace('$', ''));
        const total2 = Number ((await itemPriceTotal.getText()).replace('$', ''));

        const price3 = Number ((await itemPrice.getText()).replace(/\D/g, ''));
        const total3 = Number ((await itemPriceTotal.getText()).replace(/\D/g, ''));

        const calculatedItemPriceTotal = quantity * price;
        const calculatedItemPriceTotal2 = quantity * price2;
        const calculatedItemPriceTotal3 = quantity * price3;

        expect (calculatedItemPriceTotal).to.be.eq(total);
        expect (calculatedItemPriceTotal2).to.be.eq(total2);
        expect (calculatedItemPriceTotal3).to.be.eq(total3);
    });

    it ('Performs checkout', async function () {
        await pageCartPage.clickOnCheckoutButton();
        expect (await pageCheckoutPage.getPageTitle()).to.contain('You have successfully placed your order.');

    });

   it ('Logout user', async function () {
        await pageHomePage.clickLogoutLink();

        expect (await pageHomePage.isLoginLinkDisplayed()).to.be.true;
    });

});