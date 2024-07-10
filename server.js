'use strict';

require('dotenv').config();
var app = require('express')();
var mongoose = require('mongoose');
var path = process.cwd();
var validUrl = require('valid-url');
var autoIncrement = require('mongoose-auto-increment');

/*==============================
=            Server            =
==============================*/

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Started service at port', port);
});

/*=====  End of Server  ======*/


/*==========================
=            DB            =
==========================*/

// Instantiates DB connection
mongoose.connect(process.env.MONGODB_URL);
var db = mongoose.connection;

// Initialize auto-increment plugin
autoIncrement.initialize(db);

// Check DB connection
db.on('error', console.error.bind(console, 'DB Error:'));
db.once('open', () => {
  console.log('Connected to MongoDB')
});

/*----------  Short URL (Shurl) Schema  ----------*/

var shurlSchema = mongoose.Schema({
  original_url: String
});

// Adds auto-increment to model's _id
shurlSchema.plugin(autoIncrement.plugin, {
  model: 'Shurl',
  startAt: 1
});

var Shurl = mongoose.model('Shurl', shurlSchema);

/*=====  End of DB  ======*/

/*==============================
=            Routes            =
==============================*/

app.route('/').get((req, res) => {
  res.sendFile(path + '/index.html');
});

app.route(/^\/(new|invalid)\/(.*)/).get((req, res) => {
  let acceptInvalid = req.params[0] === 'invalid';
  let paramUrl = req.params[1];

  if (acceptInvalid || validUrl.isUri(paramUrl)){
    let shurled = new Shurl({
      original_url: paramUrl
    });

    shurled.save((err, saved) => {
      if (err) res.send('Failed to save!');
      res.send({
        short_url: saved._id,
        original_url: saved.original_url
      });
    });
  } else {
    res.send({});
  }
});

app.route(/^\/(\d+)/).get((req, res) => {
  let id = req.params[0] || 0;

  Shurl.findById(id, (err, found) => {
    if (err || !found) res.status(404).send(`There's no such a URL with ID ${id} in our database!`);
    else res.redirect(found.original_url);
  });
});

/*=====  End of Routes  ======*/
