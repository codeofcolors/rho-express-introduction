var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var date = new Date();

// middleware function, gets executed on each request
app.use(function(req, res, next){
  console.log('Got a request!');
  next();
});

// middleware for parsing the body and turning it into a JS object
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res){
  console.log('req.body=', req.body);
  res.sendStatus(200);
});

app.get('/', function(req, res){
  console.log('Received a request at', new Date());
  // __dirname is the folder this file lives in
  var filename = path.join(__dirname, 'public/views/index.html');
  console.log('filename:', filename);
  res.sendFile(filename);
});

// app.get('/kittens', function(req, res){
//   console.log('Query params:', req.query);
//   if (req.query.age > 2) {
//     res.send('MEOW!');
//   } else {
//     res.send('meow');
//   }
// });


var songs = [];
app.post('/songs', function(req, res){
console.log('req.body:', req.body);
var candidateSong = req.body;
// songs.push(req.body);
console.log('songs', songs);




var duplicate = false;
var empty = false;



songs.forEach(function(song){  //function to not allow the user to add duplicate songs.
  console.log('song in loop', song); //testing

if(candidateSong.artist == song.artist) {
  if(candidateSong.title == song.title) {
  duplicate = true;
  }
}

});

if(duplicate == true) {
  res.sendStatus(400);
}else{

  if(req.body.title == ""){
    if(req.body.artist == ""){
      empty = true;

    }
  }
if(empty ==true) {
  res.sendStatus(400);

}else{

  console.log('pushing', req.body);
  candidateSong.dateAdded = date.toDateString();
  songs.push(req.body);
  res.sendStatus(200);
}

}


// songs.forEach(function(song){  //function to not allow the user to add songs with a blank artist or title field.
//   if(req.body.title == ""){
//     if(req.body.artist == ""){
//       empty = true;
//
//     }
//   }
// if(empty ==true) {
//   res.sendStatus(400);
//
// }




});







app.get('/songs', function(req, res){
  res.send(songs);
});






// middleware for serving static files
app.use(express.static('public'));

app.listen(3000);
