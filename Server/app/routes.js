// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/pilot');
var Test = require('./models/pilot');
var personalInfo = require('./models/pilot');
var Kevin = new Nerd({name:'Kevin'});
// var Frank = new personalInfo({
//     userId:'001',
//     name:'Frank',
//     pass:'1234',
//     role:'Pilot',
//     level:{
//         current_level:'F0',
//         target_level:'F1'
//         }
//     });




    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        // app.all('*', function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        //     // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        //     // res.header("X-Powered-By",' 3.2.1')
        // });
        app.get('/api/nerds', function(req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            Kevin.save(function(err,silence)
            {
              if (err)
                    res.send(err);
            });
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                            console.log(nerds);
                console.log(nerds);
                res.json(nerds); // return all nerds in JSON format
            });

            });

            app.post('/api/post', function(req, res) {
            console.log(req.body);
            res.header("Access-Control-Allow-Origin","*");
            var reg = new personalInfo(req.body);
            reg.save(function(err,silence)
            {
              if (err)
                    res.send(err);
            });
            // use mongoose to get all nerds in the database
            personalInfo.find(function(err,personalInfos) {
                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                            console.log(personalInfos);
                console.log(personalInfos);
                res.json(personalInfos); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
