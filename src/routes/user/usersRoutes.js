const express = require("express")
const db = require("../../config/mysql")
const debug = require("debug")("app:usersRoutes")

const usersRouter = express.Router()

module.exports = () => {

  usersRouter.route("/login").get((req, res) => {
    res.render("user/users/login")
  })

  usersRouter.route("/sign_up").get((req, res) => {
    res.render("user/users/sign_up")
  })

  return usersRouter
}