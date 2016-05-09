Router.route('/', function() {
    this.render('home', {
        data: function() {
            return {
              // Profiles are accessible via {{profiles}} in the home template.
                profiles: ProfilesCollection.find({},{limit: 10})
            };
        }
    });
});

Router.route('/about', function() {
    this.render('about');
});

Router.route('/profiles/manuel', function() {
    this.layout('profileLayout');
    this.render('profileImage', {
        to: 'left'
    });
    this.render('profileDetail');
});
