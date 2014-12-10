Timer = new Mongo.Collection("timer");

if (Meteor.isClient) {
  timeSpan = 30;
  isRuning = false;
  Session.setDefault("counter", timeSpan);

  Template.uhr.helpers({
    counter: function () {
      return Timer.findOne("123").counter;
      //return Session.get("counter");
    }
  });

  Template.uhr.events({
    'change #time-value': function (event) {
      Timer.update("123", {$set: {counter: +event.target.value}});
      Session.set("counter", event.target.value);
      return false;
    },
    'click .start': function (event) {
      Timer.update("123", {$inc: {counter: -1}});
      Session.set("counter", Session.get("counter") - 1);
      if (!isRuning) {
        // RESET BUZZER
        $(".clock").css({"background-color":"#eee"});
        $(".start").html("Stopp");
        isRuning = setInterval(function(){
          if(Session.get("counter") > 0)  {
            Timer.update("123", {$inc: {counter: -1}});
            //console.log(Timer.find("123").fetch());
            Session.set("counter", Session.get("counter") - 1);
          } else {
            console.log("BUZZER");
            //BUZZER
            $(".clock")
              .animate({"opacity": "toggle"}, "slow")
              .animate({"opacity":"toggle","height": "toggle"}, "fast")
              .css("background-color", "red");
            //BUZZER
            $(".start").html("Start");
            Session.set("counter", this.$("#time-value")[0].value);
            Timer.update("123", {$set: {counter: +this.$("#time-value")[0].value}});
            clearInterval(isRuning);
            isRuning = false;
            document.getElementById('buzzer').play();
          }
        }, 1000);
      } else {
        $(".start").html("Start");

        clearInterval(isRuning);
        isRuning = false;
      }
    },
    'click .reset': function () {
      // RESET BUZZER
      $(".clock").css({"background-color":"#eee"});
      $(".start").html("Start");
      console.log("reset");
      document.getElementById('buzzer').pause();

      if(isRuning){
        clearInterval(isRuning);
        isRuning=false;
      }
      Timer.update("123", {$set: {counter: +$("#time-value")[0].value}});
      Session.set("counter", $("#time-value")[0].value);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Timer.find().count()>0){
      Timer.remove({_id: "123"});
    }
    Timer.insert({_id: "123", counter: 30});
    // TODO set to some default
    // code to run on server at startup
  });
}
