// app/routes.js
var Pilot = require('./models/pilots')

    module.exports = function(app) {
     app.get('/api/pilots', function(req, res) {
            Pilot.find(function(err, pilots) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
             console.log(pilots);
                res.json(pilots); // return all nerds in JSON format
            });

        });
      app.post('/api/pilots', function(req, res) {
        console.log(req.body);
        var newOne = new Pilot(req.body);
        newOne.save(function(err){
                if(err)
                {    console.log(err);
                    res.send(false);  
                }
        })
        res.send(true);

        });
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
