const {
  getUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");

const userController = {
  list: (req, res) => {
    res.render("users", {
      data: getAllUsers(),
    });
  },
  add: (req, res) => {
    res.render("users_add");
  },
  save: (req, res) => {
    const data = req.body;
    console.log(req.body);
    addUser(data, (err) => handleResponse(err, res));
  },
  edit: (req, res) => {
    const { id } = req.params;
    res.render("users_edit", {
      data: getUser(id),
    });
  },
  update: (req, res) => {
    const { id } = req.params;
    const data = req.body;
    data.id = id;
    updateUser(data, (err) => handleResponse(err, res));
  },
  delete: (req, res) => {
    const { id } = req.params;
    deleteUser(id, (err) => handleResponse(err, res));
  },
};

const handleResponse = (err, res) => {
  if (err) {
    res.render("error", {
      status: 500,
      message: err.message,
      error: err,
      url: req.url,
    });
  } else {
    res.redirect("/users");
  }
};

module.exports = userController;
