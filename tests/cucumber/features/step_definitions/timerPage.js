var assert = require('assert');

module.exports = function () {

  var helper = this;

  this.Given(/^ich habe (\d+) Minuten Redezeit$/, function (zeit, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });
  this.Given(/^im Eingabefeld ist eine (\d+) zu sehen$/, function (Null, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });

  this.Given(/^im Anzeigefeld ist eine (\d+) zu sehen$/, function (Null, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });

  this.When(/^ich habe mich eingeloggt$/, function (callback) {
    helper.world.browser.
          url(helper.world.mirrorUrl).
          call(callback);
  });

  this.When(/^ich den Pfeil im Eingabefeldd um (\d+) nach oben drücke$/, function (eins, callback) {
    // Write code here that turns the phrase above into concrete actions
    helper.world.browser.
      getText('h1', function (error, actualHeading) {
        assert.equal(actualHeading, "Meetingtimer");
        callback();
      });
  });

  this.Then(/^sollte im Anzeigefeld eine (\d+) zu sehen sein$/, function (eins, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });
};
