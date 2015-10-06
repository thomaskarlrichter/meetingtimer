(function () {

  'use strict';

  module.exports = function () {


    var url = require('url');

    this.Given(/^I am on the home page$/, function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback();
      //return this.mirror.call('reset'); 
    });
    this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
      // Write code here that turns the phrase above into concrete actions
      this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
        url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
        call(callback);
    });
    this.Then(/^I should see the title of "([^"]*)"$/, function (expectedText, callback) {
       this.browser.
         getText('h1').should.become(expectedText).
         and.notify(callback);
    });



  };

})();