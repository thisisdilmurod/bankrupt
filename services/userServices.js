// Import the required modules
const fs = require("fs");
const { getDb } = require("../utils");

// Write to the database
const saveDb = (data, callback) => {
  const config = require("../config.json");
  const writeStream = fs.createWriteStream(config.db, {
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

// Get all the users
const getAllUsers = () => {
  const db = getDb();
  const users = Object.keys(db.items).map((key) => {
    return {
      id: key,
      ...db.items[key],
    };
  });
  return users;
};

// Get a user
const getUser = (id) => {
  const users = getAllUsers();
  const user = users.filter((item) => item.id === id)[0];
  return user;
};

// Add a user
const addUser = (user, callback) => {
  const db = getDb();
  let id;
  if (Object.keys(db.items).length === 0) {
    id = 0;
  } else {
    id = Math.max(...Object.keys(db.items));
  }
  db.items[id + 1] = user;
  saveDb(db, callback);
};

// Update a user
const updateUser = (data, callback) => {
  const db = getDb();
  const user = db.items[data.id];
  if (user) {
    const id = data.id;
    delete data.id;
    db.items[id] = data;

    saveDb(db, callback);
  } else {
    callback(new Error("User not found!"));
  }
};

// Delete a user
const deleteUser = (id, callback) => {
  const db = getDb();
  delete db.items[id];
  saveDb(db, callback);
};

module.exports = {
  getUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
