var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var models = require('../models');
var authService = require('../services/auth');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1!',
  database: 'bulletinboard'
});

connection.connect(function(err) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Yay! You are connected to the database!');
  })
  
router.put("/profile/:id/posts/:id", function (req, res, next) {
    let postId = parseInt(req.params.id);
    models.posts
      .update(req.body, { where: { PostId: postId } })
      .then(result => res.redirect('/profile/:id/posts' + postId))
      .catch(err => {
        res.status(400);
        res.send("There was a problem editing the post.");
      });
  });

  router.delete("/profile/:id/posts/:id", function (req, res, next) {
    if (req.user) {
    let postId = parseInt(req.params.id);
    models.posts
      .destroy({
        where: { Postid: postId }
      })
      .then(result => res.redirect('deletePost'));
    } else {
        res.send(err => { 
        res.status(400); 
        res.send("There was a problem deleting the post. Please make sure you are specifying the correct post id."); 
      }
    )};
});

module.exports = router;