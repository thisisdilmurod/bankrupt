// Import the required modules
const fs = require("fs");
const { getAdmins } = require("../utils");
const hash = require("pbkdf2-password")();

// Write to the database
const saveDb = (data, callback) => {
  const config = require("../config.json");
  const writeStream = fs.createWriteStream(config.admins, {
    flags: "w",
    encoding: "utf8",
  });
  writeStream.write(JSON.stringify(data, null, 4));
  writeStream.end();

  writeStream.on("error", function (err) {
    callback(err);
  });
  writeStream.on("finish", function () {
    callback();
  });
};

// Authenticate the user
const authenticateUser = (name, pass, fn) => {
  if (!module.parent) console.log("Authenticating %s:%s", name, pass);
  var admins = getAdmins();
  var user = admins[name];
  if (!user) return fn(new Error("Cannot find user"));
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user);
    fn(new Error("Invalid password"));
  });
};

// Login the user
const loginUser = (req, res) => {
  authenticateUser(req.body.username, req.body.password, function (err, user) {
    if (user) {
      req.session.regenerate(function () {
        req.session.user = user;
        req.session.success = "Authenticated as " + user.name;
        res.redirect("/users/");
      });
    } else {
      req.session.error = "Authentication failed!";
      res.redirect("/auth/login");
    }
  });
};

// Create the user
const createUser = (req, res) => {
  var admins = getAdmins();

  var user = admins[req.body.username];
  if (!user) {
    hash({ password: req.body.password }, function (err, pass, salt, hash) {
      if (err) throw err;
      admins[req.body.username] = {
        name: req.body.username,
        salt,
        hash,
      };
      saveDb(admins, (err) => {
        if (err) {
          req.session.error = err.message;
          res.redirect("/auth/login");
        } else {
          loginUser(req, res);
        }
      });
    });
  } else {
    req.session.error = "User already exists!";
    res.redirect("/auth/login");
  }
};

module.exports = {
  loginUser,
  createUser,
};
