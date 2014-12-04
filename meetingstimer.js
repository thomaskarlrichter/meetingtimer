if (Meteor.isClient) {
  timeSpan = 30;
  isRuning = false;
  Session.setDefault("counter", timeSpan);

  Template.uhr.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.uhr.events({
    'change #time-value': function (event) {
      Session.set("counter", event.target.value);
      return false;
    },
    'click .start': function (event) {
      Session.set("counter", Session.get("counter") - 1);
      if (!isRuning) {
        $(".start").html("Stopp");
        isRuning = setInterval(function(){
          if(Session.get("counter") > 0)  {
            Session.set("counter", Session.get("counter") - 1);
          } else {
            console.log("BUZZER");
            $(".start").html("Start");          
            Session.set("counter", this.$("#time-value")[0].value);
            clearInterval(isRuning);
            isRuning = false;
          }
        }, 1000);
      } else {
        $(".start").html("Start");

        clearInterval(isRuning);
        isRuning = false;
      }
    },
    'click .reset': function () {
      $(".start").html("Start");
      console.log("reset");
      if(isRuning){
        clearInterval(isRuning);
        isRuning=false;
      }
      Session.set("counter", $("#time-value")[0].value);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
