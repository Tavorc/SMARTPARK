'use strict';
var parkingCtrl		= require('./controllers/parkingCtrl.js'),
	userCtrl  		= require('./controllers/userCtrl.js'),
	db  			= require('./dbconf'),
	express  		= require('express'),
	bodyParser  	= require('body-parser'),
	http  			= require('http'),
	_ 	 			= require('lodash'), //NOTE: might not required.
	// parkingsApi 	= new parkingCtrl(),
	port 			= process.env.PORT || 8080,
	app 			= express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//app.use('/', express.static('./public'));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	app.set('json spaces', 4);
	res.set("Content-Type", "application/json");
	next();
});

// let before 	= d3.timeMinute.offset(new Date(time), -15),
// 	after 	= d3.timeMinute.offset(new Date(time), +15);

	// before.setMinutes(before.getMinutes() - 15);
	// after.setMinutes(after.getMinutes() + 15);

/**Parking Module routs **/
app.post('/addNewParking', parkingCtrl.addParking);

app.post('/searchParking', parkingCtrl.searchParking);

app.post('/chooseParking', parkingCtrl.chooseParking);

app.post('/cancelParking', parkingCtrl.cancelParking);

app.post('/deleteParking', parkingCtrl.deleteParking);

app.post('/deleteBooking', parkingCtrl.deleteBooking);

app.post('/historyBooking', parkingCtrl.historyBooking);

app.post('/historyParking', parkingCtrl.historyBooking);

/**User Module routs **/
app.post('/createUser', userCtrl.createUser);

app.post('/updateUser', userCtrl.updateUser);

app.post('/readUser', userCtrl.readUser);

app.post('/deleteUser', userCtrl.deleteUser);

app.get('/getAll', userCtrl.getAll); //NOTE: just for testing DB

// app.get('/sendPush', userCtrl.sendPush);

http.createServer(app).listen(port);
console.log(`server is running on port ${port}...`);
