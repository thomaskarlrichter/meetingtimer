Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return Meteor.subscribe('timer');
  }
});
Router.route('/', { name: 'uhr'} );
Router.route('/impressum', function() {
  this.render("impressum");
});
Router.route('/sound', function() {
  // NodeJS request object
  var request = this.request;
  var response = this.response;
  if(Meteor.isServer){

  var fs = Npm.require("fs");
  fs.readFile('/Users/thomasrichter/meetingstimer/goodday.wav', function(error, content){
    if(error){
      console.log(error);
      response.writeHead(500);
      response.end(error);
    } else {
      console.log(process.cwd());
      // NodeJS  response object
      response.writeHead(200)
      response.end(content);
    }

  });
}


},{
   where: 'server'
});
//}
