const express = require("express");
const router = express.Router();
const AllUser = require("../models/users");

// add a new record
router.post("/add", (req, res) => {
  const newUser = new AllUser({
    Name: req.body.fullName,
    Email: req.body.email,
    Phone: req.body.phone,
  });

  newUser.save((err) => {
    if (err) {
      res.json({
        type: "warning",
        message: err.message,
      });
    } else {
      req.session.message = {
        type: "success",
        message: "New User Added Successfully...",
      };
      res.redirect("/");
    }
  });
});

// render the homepage and pass the collection data~
router.get("/", (req, res) => {
  AllUser.find().exec((err, users) => {
    if (err) {
      res.json({
        message: err.message,
      });
    } else {
      res.render("index", {
        title: "HomePage",
        userList: users,
      });
    }
  });
});

// render the Edit page.
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  AllUser.findById(id, (err, user) => {
    if (err) {
      res.redirect("/");
    } else {
      if (user == null) {
        res.redirect("/");
      } else {
        res.render("editUser", {
          title: "Update User",
          user: user,
        });
      }
    }
  });
});

// Modify the document data
router.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  AllUser.findByIdAndUpdate(
    id,
    {
      Name: req.body.fullName,
      Email: req.body.email,
      Phone: req.body.phone,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "warning" });
      } else {
        req.session.message = {
          type: "primary",
          message: "User Updated Successfully",
        };
        res.redirect("/");
      }
    }
  );
});

// Delete a document
router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  AllUser.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.json({ message: err.message, type: "warning" });
    } else {
      req.session.message = {
        type: "danger",
        message: "User Deleted Successfully",
      };
      res.redirect("/");
    }
  });
});

// render the Add user page
router.get("/add", (req, res) => {
  res.render("addUser", {
    title: "Add User",
  });
});

module.exports = router;
