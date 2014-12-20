Timer = new Mongo.Collection("timer");

if (Meteor.isServer) {
  Meteor.publish("timer", function(){
    return Timer.find({});
  });
  Meteor.startup(function () {
    if(Timer.find().count()>0){
      Timer.remove({_id: "123"});
    }
    Timer.insert({_id: "123", counter: 30});
    // TODO set to some default
    // code to run on server at startup
  });
}


if (Meteor.isClient) {
  timeSpan = 30;
  isRuning = false;
  Session.set("myRunning", false);
  //Session.setDefault("counter", timeSpan);

  Template.uhr.helpers({
    counter: function () {
      if(Timer.findOne("123").counter === 0){
        //BUZZER
        $(".clock")
        .animate({"opacity": "toggle"}, "slow")
        .animate({"opacity":"toggle","height": "toggle"}, "fast")
        document.getElementById('buzzer').play();
        //BUZZER
      }
      return Timer.findOne("123").counter;
    },
    isSelf: function () {
      // wenn der timer nicht läuft
      // der der es laufen lässt soll immer gezeigt werden zw. start und stopp
      if (Meteor.user() && Timer.findOne("123").user && Timer.findOne("123").user._id !== Meteor.userId()) return false;
      return true;
    }
  });

  Template.uhr.events({
    'change #time-value': function (event) {
      timeSpan = +event.target.value;
      Timer.update("123", {$set: {counter: timeSpan}});
      return false;
    },
    'click .start': function (event) {
      if(Timer.findOne("123").counter === 0) {
        Timer.update("123", {$inc: {counter: timeSpan}, $set: {user: Meteor.user()}});
      }
      if (!isRuning) {
        // RESET BUZZER
        $(".clock").css({"background-color":"#eee"});
        $(".start").html("Stopp");
        isRuning = setInterval(function(){
          if(Timer.findOne("123").counter > 0)  {
            if(Meteor.user()){
              Session.set("myRunning", true);
              Timer.update("123", {$inc: {counter: -1}, $set: {user: Meteor.user()}});
              //console.log(Timer.find("123").fetch());
              //Session.set("counter", Session.get("counter") - 1);
            } else {
              console.log("user not logged in");
            }
          } else {
            console.log("BUZZER");

            $(".start").html("Start");
            Timer.update("123", {$set: {counter: timeSpan, user: null}});
            clearInterval(isRuning);
            if(Meteor.user()){
              Session.set("myRunning", false);
            }
            isRuning = false;
          }
        }, 1000);
      } else {
        $(".start").html("Start");
        Timer.update("123", {$set: {counter: timeSpan, user: null}});
        clearInterval(isRuning);
        isRuning = false;
      }
    },
    'click .reset': function () {
      // RESET BUZZER
      $(".clock").css({"background-color":"#eee"});
      $(".start").html("Start");
      console.log("reset", timeSpan);
      document.getElementById('buzzer').pause();

      if(isRuning){
        clearInterval(isRuning);
        isRuning=false;
      }
      Timer.update("123", {$set: {counter: timeSpan, user: null}});
      console.log(Timer.findOne("123").counter);
    }
  });
}
