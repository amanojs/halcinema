const express = require("express")

const adminRouter = express.Router()

const movieList = [
    {
        title: "君の名は",
        description: "afsadfasfd",
        img: "path",
        sdfa: "fas"
    },
    {
        title: "asfd",
        description: "afsadfasfd",
        img: "path",
        sdfa: "fas"
    },
    {
        title: "asdfa",
        description: "afsadfasfd",
        img: "path",
        sdfa: "fas"
    },
    {
        title: "asfaf",
        description: "afsadfasfd",
        img: "path",
        sdfa: "fas"
    },
]

module.exports = () => {
    adminRouter.route("/").get((req, res) => {
        res.render("admin/index")
    })

    adminRouter.route("/login").get((req, res) => {
        res.render("admin/login")
    })

    adminRouter.route("/mail").get((req, res) => {
        res.render("admin/mail")
    })

    adminRouter.route("/pdf").get((req, res) => {
        res.render("admin/pdf")
    })

    adminRouter.route("/production_add").get((req, res) => {
        res.render("admin/production_add")
    })

    adminRouter.route("/production_content/:id").get((req, res) => {
        res.render("admin/production_content")
    })

    adminRouter.route("/production_edit").get((req, res) => {
        res.render("admin/production_edit")
    })

    adminRouter.route("/production_list").get((req, res) => {
        res.render("admin/production_list")
    })

    adminRouter.route("/screen_schedule").get((req, res) => {
        res.render("admin/screen_schedule")
    })

    return adminRouter
}