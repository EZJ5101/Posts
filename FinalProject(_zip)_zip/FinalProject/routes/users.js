var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');

/* GET users listing. */
router.get("/admin", function(req, res, next) {
  if (req.user && req.user.Admin) {
    models.users
      .findAll({})
      .then(users => res.render("users", { users: users }));
  } else {
    res.redirect("unauthorized");
  }
});

router.get("/admin/editUser/:id", function(req, res, next) {
  let userId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user.Admin) {
        models.users
          .findOne({ where: { UserId: userId }, raw: true })
          .then(user => res.render("editUser", { user: user }));
      } else {
        res.send("unauthorized");
      }
    });
  }
});

router.put("/admin/editUser/:id", function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.users
    .update(req.body, { where: { UserId: userId } })
    .then(result => res.redirect('/admin/editUser' + userId))
    .catch(err => {
      res.status(400);
      res.send("There was a problem updating the user.  Please check the actor information.");
    });
});

router.get("/unauthorized", function(req, res, next) {
  res.render("unauthorized");
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.redirect('profile');
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username
          });
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }
});

router.get('/profile', function (req, res, next) {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
          res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Username: user.Username,
            Posts: user.Posts
          });
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('/users/login');
  }
});



router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

router.delete("/admin/deleteUser/:id", function (req, res, next) {
  if (req.user && req.user.Admin) {
  let userId = parseInt(req.params.id);
  models.users
    .destroy({
      where: { UserId: userId }
    })
    .then(result => res.redirect('deleteUser'));
  } else {
      res.send(err => { 
      res.status(400); 
      res.send("There was a problem deleting the user. Please make sure you are specifying the correct id."); 
    }
  )};
});

module.exports = router;
