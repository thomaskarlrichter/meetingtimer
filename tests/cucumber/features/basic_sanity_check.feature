Feature: I am on the right page

  As a user Thomas
  He want to see the name of the application
  So he know that he is on the right page
  
  @dev
  Scenario: Sanity Check
    Given I am on the home page
    When I navigate to "/"
    Then I should see the title of "Meetingtimer"