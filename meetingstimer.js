Timer = new Mongo.Collection("timer");

if (Meteor.isServer) {
  Meteor.publish("timer", function(){
    return Timer.find({});
  });
  Meteor.publish('users', function() {
	  return Meteor.users.find({}, {fields: {status: 1, statusDefault: 1, statusConnection: 1, username: 1}});
  });
  Meteor.startup(function () {
    if(Timer.find().count()>0){
      Timer.remove({_id: "123"});
    }
    Timer.insert({_id: "123", counter: 60});
    // TODO set to some default
    UserPresenceMonitor.start();

	  UserPresence.activeLogs();
	  UserPresence.start();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('users');
  //UserPresence.awayTime = 60000;
	//UserPresence.awayOnWindowBlur = false;
	UserPresence.start();
  Template.registerHelper('getUserName', function(userId) {
  	if (userId === Meteor.userId()) {
  		return 'me';
  	};

  	var user = Meteor.users.findOne({_id: userId});
  	return user && user.username;
  });
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });
  timeSpan = 60;
  isRuning = false;
  Session.set("myRunning", false);
  snd = new Audio("wecker.mp3");
  snd.load();
  //Session.setDefault("counter", timeSpan);
  Template.users.helpers({
  	users: function() {
  		return Meteor.users.find({
        status: { $in: ['online', 'away']}
      },
      {
        sort: {username: 1}
      });
  	}
  });

  Template.uhr.helpers({
    counter: function () {
      var pad = function (num, size) {
         var s = "000000000" + num;
         return s.substr(s.length-size);
      };
      var c = Timer.findOne("123").counter;
      if(c === 0){
        //BUZZER
        $(".clock")
        .animate({"opacity": "toggle"}, "slow")
        .animate({"opacity":"toggle","height": "toggle"}, "fast");
        snd.play();
        //BUZZER
      }
      return Math.floor(c / 60)+":"+ pad(c % 60, 2);
    },
    getTimeUser: function () {
      return Timer.findOne("123").user.username;
    },
    isSelf: function () {
      // wenn der timer nicht läuft
      // der der es laufen lässt soll immer gezeigt werden zw. start und stopp
      if (Meteor.user() && Timer.findOne("123").user &&
          Timer.findOne("123").user._id !== Meteor.userId())
          return false;
      return true;
    }
  });

  Template.uhr.events({
    'change #time-minute': function (event) {
      timeSpan = $('#time-minute').val()*60 + parseInt($('#time-second').val());
      console.log(timeSpan);
      Timer.update("123", {$set: {counter: timeSpan}});
      return false;
    },
    'change #time-second': function (event) {
      timeSpan = $('#time-minute').val()*60 + parseInt($('#time-second').val());
      console.log(timeSpan);
      Timer.update("123", {$set: {counter: timeSpan}});
      return false;
    },
    'click .start': function (event) {
      if(Timer.findOne("123").counter === 0) {
        Timer.update("123", {$inc: {counter: timeSpan}, $set: {user: Meteor.user()}});
      }
      if (!isRuning) {
        // RESET BUZZER
        //$(".clock").css({"background-color":"#eee"});
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
