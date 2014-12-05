Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', { name: 'uhr'} );
Router.route('/impressum', function() {
  this.render("impressum");
});
//{ name: 'impressum'});
